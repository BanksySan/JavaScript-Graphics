console.log('Starting Mandelbrot tutorial');
import { createProgram, fetchShaderTexts } from '../../webglHelpers.js';

const CANVAS = document.getElementById('mandelbrot-webgl-tutorial');
const gl = CANVAS.getContext('webgl');
// Set CPU-side variables for the shader variables.
let viewportDimensions = [CANVAS.clientWidth, CANVAS.clientHeight];
const minI = -2.0;
const maxI = 2.0;
const minR = -2.0;
const maxR = 2.0;

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

window.addEventListener('resize', (args) => resizeGlCanvas(args.target));

(function loop() {
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
