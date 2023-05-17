import { fetchShaderTexts, initialiseMesh, createProgram } from '../../helpers/webglHelpers.js';

const SHADER_TEXT_PROMISE = fetchShaderTexts('./harmonic-wave.vert.glsl', './harmonic-wave.frag.glsl');
const CANVAS = document.getElementById('webgl-harmonic-wave');
const gl = CANVAS.getContext('webgl2');
const SHADER_TEXTS = await SHADER_TEXT_PROMISE;
const program = createProgram(gl, SHADER_TEXTS.vertexShaderText, SHADER_TEXTS.fragmentShaderText);

gl.useProgram(program);

initialiseMesh(program, gl, 'VERTEX_POSITION');
gl.uniform2f(gl.getUniformLocation(program, 'CANVAS_SIZE'), CANVAS.width, CANVAS.height);

gl.drawArrays(gl.TRIANGLES, 0, 6);