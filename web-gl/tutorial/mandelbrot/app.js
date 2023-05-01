console.log('Starting Mandelbrot tutorial');
import { createProgram, fetchShaderTexts } from '../../webglHelpers.js';
let enableFpsLogging = false;
const CANVAS = document.getElementById('mandelbrot-webgl-tutorial');
const gl = CANVAS.getContext('webgl');

// Set CPU-side variables for the shader variables.
let viewportDimensions = [CANVAS.clientWidth, CANVAS.clientHeight];
let minI = -2.0;
let maxI = 2.0;
let minR = -2.0;
let maxR = 2.0;

resizeGlCanvas(window);
const shaderTexts = await fetchShaderTexts(
    './tutorial.mandelbrot.vert',
    './tutorial.mandelbrot.frag'
);

const program = createProgram(
    gl,
    shaderTexts.vertexShaderText,
    shaderTexts.fragmentShaderText
);

gl.useProgram(program);

const uniforms = {
    viewportDimensions: gl.getUniformLocation(program, 'viewportDimensions'),
    minI: gl.getUniformLocation(program, 'minI'),
    maxI: gl.getUniformLocation(program, 'maxI'),
    minR: gl.getUniformLocation(program, 'minR'),
    maxR: gl.getUniformLocation(program, 'maxR'),
};

// Create buffers
const vertexBuffer = gl.createBuffer();
const vertices = new Float32Array([
    ...[-1, 1],
    ...[-1, -1],
    ...[1, -1],
    ...[-1, 1],
    ...[1, 1],
    ...[1, -1],
]);

gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

const vertexPositionAttributeLocation = gl.getAttribLocation(program, 'vPos');
gl.vertexAttribPointer(
    vertexPositionAttributeLocation,
    2,
    gl.FLOAT,
    false,
    2 * Float32Array.BYTES_PER_ELEMENT,
    0
);

gl.enableVertexAttribArray(vertexPositionAttributeLocation);

function resizeGlCanvas(window) {
    const { innerHeight, innerWidth } = window;
    CANVAS.width = innerWidth * 0.95;
    CANVAS.height = innerHeight * 0.8;
    viewportDimensions = [CANVAS.clientWidth, CANVAS.clientHeight];
    gl.viewport(0, 0, CANVAS.width, CANVAS.height);
}

let dragging = false;

function onMouseMove(args) {
    if (dragging) {
        const iRange = maxI - minI;
        const rRange = maxR - minR;

        const iDelta = (args.movementY / CANVAS.clientHeight) * iRange;
        const rDelta = (args.movementX / CANVAS.clientWidth) * rRange;

        minI += iDelta;
        maxI += iDelta;
        minR -= rDelta;
        maxR -= rDelta;
    }
}

window.addEventListener('resize', (args) => resizeGlCanvas(args.target));
window.addEventListener('mousedown', (args) => {
    dragging = true;
});
window.addEventListener('mouseup', (args) => {
    dragging = false;
});
window.addEventListener('mousemove', (args) => {
    onMouseMove(args);
});
window.addEventListener('wheel', (args) => {
    const imaginaryRange = maxI - minI;
    const newRange =
        args.deltaY < 0 ? imaginaryRange * 0.95 : imaginaryRange * 1.05;
    const halfDelta = (newRange - imaginaryRange) * 0.5;
    minI += halfDelta;
    maxI -= halfDelta;

    minR += halfDelta;
    maxR -= halfDelta;
});

let thisFrameTime = performance.now();
let prevFrameTime;
let dt;
let frames = new Array(64).fill(0);

let frameNumber = 0;

(function loop() {
    prevFrameTime = thisFrameTime;
    thisFrameTime = performance.now();
    dt = thisFrameTime - prevFrameTime;
    if (enableFpsLogging) {
        if (frameNumber === frames.length) {
            const average = frames.reduce((accumulator, current) => {
                return accumulator + current;
            });
            console.log('FPS', average / (1000 * frames.length));
            frameNumber = 0;
        }
        frames[frameNumber] = dt;
        frameNumber++;
    }
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.DEPTH_BUFFER_BIT | gl.COLOR_BUFFER_BIT);

    gl.uniform2fv(uniforms.viewportDimensions, viewportDimensions);
    gl.uniform1f(uniforms.minI, minI);
    gl.uniform1f(uniforms.maxI, maxI);
    gl.uniform1f(uniforms.minR, minR);
    gl.uniform1f(uniforms.maxR, maxR);
    gl.drawArrays(gl.TRIANGLES, 0, 6);
    requestAnimationFrame(loop);
})();
