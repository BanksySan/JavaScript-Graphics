console.log('3D UV');
import { createProgram, fetchShaderTexts } from '../../helpers/webglHelpers.js';

const { CANVAS, gl, program } = await (async function init() {
    const SHADER_TEXTS_PROMISE = fetchShaderTexts(
        './3d-uv-cube.vert.glsl',
        './3d-uv-cube.frag.glsl'
    );
    const CANVAS = document.getElementById('webgl-3d-uv-cube');
    const gl = CANVAS.getContext('webgl2');
    const { vertexShaderText, fragmentShaderText } = await SHADER_TEXTS_PROMISE;
    const program = createProgram(gl, vertexShaderText, fragmentShaderText);
    return { CANVAS, gl, program };
})();
gl.enable(gl.DEPTH_TEST);
gl.enable(gl.CULL_FACE);
gl.cullFace(gl.BACK);
gl.frontFace(gl.CCW);
gl.useProgram(program);

const halfWidth = 0.75;

const VERTICES = new Float32Array([
    ...[-halfWidth, -halfWidth, -halfWidth], // 0
    ...[+halfWidth, -halfWidth, -halfWidth], // 1
    ...[+halfWidth, +halfWidth, -halfWidth], // 2
    ...[-halfWidth, +halfWidth, -halfWidth], // 3
    ...[-halfWidth, -halfWidth, +halfWidth], // 4
    ...[+halfWidth, -halfWidth, +halfWidth], // 5
    ...[+halfWidth, +halfWidth, +halfWidth], // 6
    ...[-halfWidth, +halfWidth, +halfWidth], // 7
]);

const FRONT = [...[0, 2, 3], ...[2, 0, 1]];
const BACK = [...[7, 6, 5], ...[7, 5, 4]];
const LEFT = [...[7, 0, 3], ...[0, 7, 4]];
const RIGHT = [...[1, 6, 2], ...[1, 5, 6]];
const TOP = [...[2, 7, 3], ...[2, 6, 7]];
const BOTTOM = [...[0, 5, 1], ...[0, 4, 5]];

const VERTEX_INDICES = new Uint16Array([
    ...FRONT,
    ...BACK,
    ...LEFT,
    ...RIGHT,
    ...TOP,
    ...BOTTOM,
]);

const vertexBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
gl.bufferData(gl.ARRAY_BUFFER, VERTICES, gl.STATIC_DRAW);

const vertexIndexBuffer = gl.createBuffer();
gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, vertexIndexBuffer);
gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, VERTEX_INDICES, gl.STATIC_DRAW);

const vertexLocation = gl.getUniformLocation(program, 'VERTEX_POSITION');

gl.vertexAttribPointer(
    vertexLocation,
    3,
    gl.FLOAT,
    false,
    3 * Float32Array.BYTES_PER_ELEMENT,
    0
);

gl.enableVertexAttribArray(vertexLocation);

gl.uniform2f(
    gl.getUniformLocation(program, 'CANVAS_SIZE'),
    CANVAS.clientWidth,
    CANVAS.clientHeight
);

gl.drawElements(gl.TRIANGLES, VERTEX_INDICES.length, gl.UNSIGNED_SHORT, 0);
