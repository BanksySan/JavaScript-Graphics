import {
    fetchShaderTexts,
    createProgram,
    initialiseMesh,
} from '../../../helpers/webglHelpers.js';

console.log('Starting:  WebGL:  Checkerboard Fragment Shader');
const shaderTextPromise = fetchShaderTexts(
    'checkerboard.vert.glsl',
    'checkerboard.frag.glsl'
);
const CANVAS = document.getElementById('webgl-checkerboard');
const gl = CANVAS.getContext('webgl2');

const shaderTexts = await shaderTextPromise;

const program = createProgram(
    gl,
    shaderTexts.vertexShaderText,
    shaderTexts.fragmentShaderText
);

initialiseMesh(program, gl, 'vertexPosition');
gl.useProgram(program);

const canvasSizeLocation = gl.getUniformLocation(program, 'CANVAS_SIZE');
gl.uniform2f(canvasSizeLocation, CANVAS.width, CANVAS.height);

const cellCountLocation = gl.getUniformLocation(program, 'CELL_COUNT');
gl.uniform2f(cellCountLocation, 1.5, 2.25);

const color1Location = gl.getUniformLocation(program, 'COLOR_1');
gl.uniform4f(color1Location, 0.0, 0.0, 0.0, 1.0);

const color2Location = gl.getUniformLocation(program, 'COLOR_2');
gl.uniform4f(color2Location, 1.0, 1.0, 1.0, 1.0);

gl.drawArrays(gl.TRIANGLES, 0, 6);
