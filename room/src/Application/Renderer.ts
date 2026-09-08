import * as THREE from 'three';
import { CSS3DRenderer } from 'three/examples/jsm/renderers/CSS3DRenderer.js';
import Application from './Application';
import Sizes from './Utils/Sizes';
import Camera from './Camera/Camera';
import UIEventBus from './UI/EventBus';
// @ts-ignore
import screenVert from './Shaders/screen/vertex.glsl';
// @ts-ignore
import screenFrag from './Shaders/screen/fragment.glsl';
import Time from './Utils/Time';
import { isWebGLAvailable } from './Utils/WebGL';

export default class Renderer {
    application: Application;
    sizes: Sizes;
    scene: THREE.Scene;
    cssScene: THREE.Scene;
    time: Time;
    overlay: THREE.Mesh;
    overlayScene: THREE.Scene;
    camera: Camera;
    overlayInstance: THREE.WebGLRenderer | null;
    instance: THREE.WebGLRenderer;
    cssInstance: CSS3DRenderer;
    raiseExposure: boolean;
    contextLost: boolean = false;
    uniforms: {
        [uniform: string]: THREE.IUniform<any>;
    };

    constructor() {
        this.application = new Application();
        this.time = this.application.time;
        this.sizes = this.application.sizes;
        this.scene = this.application.scene;
        this.cssScene = this.application.cssScene;
        this.overlayScene = this.application.overlayScene;
        this.camera = this.application.camera;

        this.setInstance();
    }

    setInstance() {
        if (!isWebGLAvailable()) {
            throw new Error(
                'WebGL is not available in this browser/session.'
            );
        }

        try {
            this.instance = new THREE.WebGLRenderer({
                antialias: true,
                alpha: true,
                powerPreference: 'high-performance',
            });
        } catch (e) {
            // Most common cause: the browser has hit its per-process limit on
            // live WebGL contexts (too many 3D tabs open), or hardware
            // acceleration is disabled.
            throw new Error(
                'Error creating WebGL context. ' +
                    'The browser refused a new WebGL context ' +
                    '(too many 3D tabs open, or hardware acceleration is off).'
            );
        }
        // Settings
        // this.instance.physicallyCorrectLights = true;
        this.instance.outputEncoding = THREE.sRGBEncoding;
        // this.instance.toneMapping = THREE.ACESFilmicToneMapping;
        // this.instance.toneMappingExposure = 0.9;
        this.instance.setSize(this.sizes.width, this.sizes.height);
        this.instance.setPixelRatio(Math.min(this.sizes.pixelRatio, 2));
        this.instance.setClearColor(0x000000, 0.0);

        // Style
        this.instance.domElement.style.position = 'absolute';
        this.instance.domElement.style.zIndex = '1';
        this.instance.domElement.style.top = '0px';

        document.querySelector('#webgl')?.appendChild(this.instance.domElement);

        this.handleContextLoss();

        // The grain/scanline overlay needs its own canvas so it can blend over
        // the CSS3D layer, but it costs a second WebGL context. It is purely
        // cosmetic, so if the browser will not hand out another context we
        // simply run without it instead of taking the whole site down.
        try {
            this.overlayInstance = new THREE.WebGLRenderer({
                alpha: true,
                antialias: false,
                powerPreference: 'low-power',
            });
            this.overlayInstance.setSize(this.sizes.width, this.sizes.height);
            this.overlayInstance.domElement.style.position = 'absolute';
            this.overlayInstance.domElement.style.top = '0px';
            this.overlayInstance.domElement.style.mixBlendMode = 'soft-light';
            this.overlayInstance.domElement.style.opacity = '0.12';
            this.overlayInstance.domElement.style.pointerEvents = 'none';

            document
                .querySelector('#overlay')
                ?.appendChild(this.overlayInstance.domElement);
        } catch (e) {
            this.overlayInstance = null;
            console.warn(
                'Overlay renderer disabled: could not create a second WebGL context.'
            );
        }

        this.cssInstance = new CSS3DRenderer();
        this.cssInstance.setSize(this.sizes.width, this.sizes.height);
        this.cssInstance.domElement.style.position = 'absolute';
        this.cssInstance.domElement.style.top = '0px';

        document
            .querySelector('#css')
            ?.appendChild(this.cssInstance.domElement);

        this.uniforms = {
            u_time: { value: 1 },
        };

        this.overlay = new THREE.Mesh(
            new THREE.PlaneGeometry(10000, 10000),
            new THREE.ShaderMaterial({
                vertexShader: screenVert,
                fragmentShader: screenFrag,
                uniforms: this.uniforms,
                depthTest: false,
                depthWrite: false,
            })
        );

        this.overlayScene.add(this.overlay);
    }

    resize() {
        this.instance.setSize(this.sizes.width, this.sizes.height);
        this.instance.setPixelRatio(Math.min(this.sizes.pixelRatio, 2));

        this.cssInstance.setSize(this.sizes.width, this.sizes.height);

        if (this.overlayInstance) {
            this.overlayInstance.setSize(this.sizes.width, this.sizes.height);
            this.overlayInstance.setPixelRatio(
                Math.min(this.sizes.pixelRatio, 2)
            );
        }
    }

    /**
     * A lost GPU context (driver reset, tab backgrounded for a long time,
     * another tab claiming contexts) otherwise leaves a permanently black
     * screen with no error. Prevent the default so the browser will restore it.
     */
    handleContextLoss() {
        const canvas = this.instance.domElement;

        canvas.addEventListener(
            'webglcontextlost',
            (event) => {
                event.preventDefault();
                this.contextLost = true;
                console.warn('WebGL context lost - pausing rendering.');
            },
            false
        );

        canvas.addEventListener(
            'webglcontextrestored',
            () => {
                this.contextLost = false;
                console.warn('WebGL context restored - resuming rendering.');
            },
            false
        );
    }

    update() {
        if (this.contextLost) return;

        this.application.camera.instance.updateProjectionMatrix();
        if (this.uniforms) {
            this.uniforms.u_time.value = Math.sin(this.time.current * 0.01);
        }

        this.instance.render(this.scene, this.camera.instance);
        this.cssInstance.render(this.cssScene, this.camera.instance);
        if (this.overlayInstance) {
            this.overlayInstance.render(
                this.overlayScene,
                this.camera.instance
            );
        }
        this.overlay.position.copy(this.camera.instance.position);
    }
}
