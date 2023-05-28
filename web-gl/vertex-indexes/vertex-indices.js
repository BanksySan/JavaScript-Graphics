import { createProgram, fetchShaderTexts } from '../../helpers/webglHelpers.js';

const SHADER_TEXTS_PROMISE = fetchShaderTexts(
    './vertex-indices.vert.glsl',
    './vertex-indices.frag.glsl'
);
const CANVAS = document.getElementById('webgl-vertex-indices');
const gl = CANVAS.getContext('webgl2');
const SHADER_TEXTS = await SHADER_TEXTS_PROMISE;
const program = createProgram(
    gl,
    SHADER_TEXTS.vertexShaderText,
    SHADER_TEXTS.fragmentShaderText
);

gl.useProgram(program);

const radius = 0.9;
const xOffset = radius * Math.cos(Math.PI / 3);
const yOffset = radius * Math.sin(Math.PI / 3);
const VERTICES = new Float32Array([
    ...[0.0, 0.0],
    ...[radius, 0.0],
    ...[xOffset, -yOffset],
    ...[-xOffset, -yOffset],
    ...[-radius, 0.0],
    ...[-xOffset, yOffset],
    ...[xOffset, yOffset],
]);

const VERTEX_INDICES = new Uint16Array([
    ...[0, 2, 1],
    ...[0, 3, 2],
    ...[0, 4, 3],
    ...[0, 5, 4],
    ...[0, 6, 5],
    ...[0, 1, 6],
]);

const vertexBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
gl.bufferData(gl.ARRAY_BUFFER, VERTICES, gl.STATIC_DRAW);

const vertexIndexBuffer = gl.createBuffer();
gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, vertexIndexBuffer);
gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, VERTEX_INDICES, gl.STATIC_DRAW);

const vertexLocation = gl.getAttribLocation(program, 'VERTEX_POSITION');

gl.vertexAttribPointer(
    vertexLocation,
    2,
    gl.FLOAT,
    false,
    2 * Float32Array.BYTES_PER_ELEMENT,
    0
);

gl.enableVertexAttribArray(vertexLocation);

gl.uniform2f(
    gl.getUniformLocation(program, 'CANVAS_SIZE'),
    CANVAS.width,
    CANVAS.height
);
//gl.drawArrays(gl.TRIANGLES, 0, 6);
gl.drawElements(gl.TRIANGLES, VERTEX_INDICES.length, gl.UNSIGNED_SHORT, 0);
