console.log('Starting WebGL Mandelbrot');
import {
    createProgram,
    fetchShaderTexts,
    initialiseMesh,
} from '../../helpers/webglHelpers.js';

const shaderTexts = await fetchShaderTexts(
    './checking-coordinates-step-function.vert.glsl',
    './checking-coordinates-step-function.frag.glsl'
);

const CANVAS = document.getElementById('coordinate-system-step-function-webgl');
const gl = CANVAS.getContext('webgl');
gl.enable(gl.CULL_FACE);
gl.cullFace(gl.BACK);
gl.frontFace(gl.CW);

const program = createProgram(
    gl,
    shaderTexts.vertexShaderText,
    shaderTexts.fragmentShaderText
);

initialiseMesh(program, gl);

gl.useProgram(program);

console.log('Client dimensions', {
    canvas: { width: CANVAS.clientWidth, height: CANVAS.clientHeight },
    gl: { width: gl.clientWidth, height: gl.clientHeight },
});

const uniformCanvasSizeLocation = gl.getUniformLocation(program, 'CANVAS_SIZE');
gl.uniform2f(
    uniformCanvasSizeLocation,
    CANVAS.clientWidth,
    CANVAS.clientHeight
);

gl.drawArrays(gl.TRIANGLES, 0, 6);
