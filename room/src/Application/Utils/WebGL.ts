/**
 * Shared WebGL capability probe.
 *
 * Creating a probe context is not free: every live WebGL context counts
 * against the browser's per-process limit (~16 in Chrome). Once that limit is
 * hit, `new THREE.WebGLRenderer()` fails with "Error creating WebGL context".
 * So we probe exactly once, immediately release the probe context via the
 * WEBGL_lose_context extension, and cache the answer.
 */

let cached: boolean | null = null;

export function isWebGLAvailable(): boolean {
    if (cached !== null) return cached;

    try {
        const canvas = document.createElement('canvas');
        const gl = (canvas.getContext('webgl2') ||
            canvas.getContext('webgl') ||
            canvas.getContext('experimental-webgl')) as WebGLRenderingContext | null;

        cached = !!gl;

        // Release the probe context straight away so it does not occupy one of
        // the browser's limited context slots.
        if (gl) {
            const lose = gl.getExtension('WEBGL_lose_context');
            if (lose) lose.loseContext();
        }
    } catch (e) {
        cached = false;
    }

    return cached;
}

/**
 * Full-page fallback shown when a WebGL context cannot be created at all.
 * Matches the BIOS-style look of the loading screen.
 */
export function showWebGLFallback(detail?: string) {
    const existing = document.getElementById('webgl-fallback');
    if (existing) return;

    const el = document.createElement('div');
    el.id = 'webgl-fallback';
    el.setAttribute(
        'style',
        [
            'position:fixed',
            'inset:0',
            'z-index:9999',
            'background:#000',
            'color:#fff',
            "font-family:'Press Start 2P', monospace",
            'font-size:13px',
            'line-height:1.9',
            'display:flex',
            'align-items:center',
            'justify-content:center',
            'padding:24px',
            'box-sizing:border-box',
            'text-align:left',
        ].join(';')
    );

    const box = document.createElement('div');
    box.setAttribute(
        'style',
        'max-width:640px;border:2px solid #fff;padding:24px 28px;background:#000;'
    );
    box.innerHTML = [
        '<p><b style="color:red">CRITICAL ERROR:</b> Could not create a WebGL context</p>',
        '<br/>',
        '<p>This site needs WebGL to render the 3D room.</p>',
        '<br/>',
        '<p>Things to try:</p>',
        '<p>&nbsp;&nbsp;1. Close some other tabs and reload &mdash; browsers</p>',
        '<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;cap how many 3D contexts can be open at once.</p>',
        '<p>&nbsp;&nbsp;2. Turn on hardware acceleration:</p>',
        '<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Chrome &gt; Settings &gt; System.</p>',
        '<p>&nbsp;&nbsp;3. Update your graphics drivers or try another browser.</p>',
    ].join('');

    if (detail) {
        const d = document.createElement('p');
        d.setAttribute('style', 'margin-top:20px;color:#888;font-size:10px;');
        d.textContent = detail;
        box.appendChild(d);
    }

    el.appendChild(box);
    document.body.appendChild(el);
}
