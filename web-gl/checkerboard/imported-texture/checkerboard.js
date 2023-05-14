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

initialiseMesh(program, gl, 'VERTEX_POSITION');
gl.useProgram(program);

const textureImageElement = document.getElementById('checkerboard-texture');
const texture = gl.createTexture();

gl.bindTexture(gl.TEXTURE_2D, texture);

gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);

gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);

gl.texImage2D(
    gl.TEXTURE_2D,
    0,
    gl.RGBA,
    gl.RGBA,
    gl.UNSIGNED_BYTE,
    textureImageElement
);

const canvasSizeLocation = gl.getUniformLocation(program, 'CANVAS_SIZE');
gl.uniform2f(canvasSizeLocation, CANVAS.width, CANVAS.height);

gl.drawArrays(gl.TRIANGLES, 0, 6);
