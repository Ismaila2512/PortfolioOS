import './style.css';

import Application from './Application/Application';
import { isWebGLAvailable, showWebGLFallback } from './Application/Utils/WebGL';

// The Application constructor builds a WebGLRenderer immediately. If that
// throws, the whole bundle throws at module scope and webpack-dev-server shows
// its red "Uncaught runtime errors" overlay instead of anything useful. Probe
// first, and fail into a readable screen rather than a stack trace.
if (!isWebGLAvailable()) {
    showWebGLFallback('WebGL is unavailable in this browser.');
} else {
    try {
        const app: Application = new Application();
    } catch (error) {
        console.error(error);
        showWebGLFallback(
            error instanceof Error ? error.message : String(error)
        );
    }
}
