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
const SPEED = 0.25;
const HALF_WIDTH = 0.6;

const COLORS = {
    red: [255 / 255, 0 / 255, 0 / 255],
    orange: [255 / 255, 128 / 255, 0 / 255],
    yellow: [255 / 255, 255 / 255, 0 / 255],
    green: [0 / 255, 255 / 255, 0 / 255],
    cyan: [0 / 255, 255 / 255, 255 / 255],
    blue: [0 / 255, 0 / 255, 255 / 255],
    indigo: [128 / 255, 0 / 255, 255 / 255],
    magenta: [255 / 255, 0 / 255, 255 / 255],
};

const VERTEX_DATA = new Float32Array([
    ...[-HALF_WIDTH, -HALF_WIDTH, -HALF_WIDTH, ...COLORS.red],
    ...[+HALF_WIDTH, -HALF_WIDTH, -HALF_WIDTH, ...COLORS.orange],
    ...[+HALF_WIDTH, +HALF_WIDTH, -HALF_WIDTH, ...COLORS.yellow],
    ...[-HALF_WIDTH, +HALF_WIDTH, -HALF_WIDTH, ...COLORS.green],
    ...[-HALF_WIDTH, -HALF_WIDTH, +HALF_WIDTH, ...COLORS.cyan],
    ...[+HALF_WIDTH, -HALF_WIDTH, +HALF_WIDTH, ...COLORS.blue],
    ...[+HALF_WIDTH, +HALF_WIDTH, +HALF_WIDTH, ...COLORS.indigo],
    ...[-HALF_WIDTH, +HALF_WIDTH, +HALF_WIDTH, ...COLORS.magenta],
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

gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
gl.bufferData(gl.ARRAY_BUFFER, VERTEX_DATA, gl.STATIC_DRAW);

gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, gl.createBuffer());
gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, VERTEX_INDICES, gl.STATIC_DRAW);

const vertexLocation = gl.getAttribLocation(program, 'VERTEX_POSITION');
const vertexColorLocation = gl.getAttribLocation(program, 'VERTEX_COLOR');

console.log('Attribute Locations:', { vertexLocation, vertexColorLocation });

gl.vertexAttribPointer(
    vertexLocation,
    3,
    gl.FLOAT,
    false,
    6 * Float32Array.BYTES_PER_ELEMENT,
    0
);

gl.vertexAttribPointer(
    vertexColorLocation,
    3,
    gl.FLOAT,
    false,
    3 * Float32Array.BYTES_PER_ELEMENT,
    3 * Float32Array.BYTES_PER_ELEMENT
);

gl.enableVertexAttribArray(vertexLocation);
gl.enableVertexAttribArray(vertexColorLocation);

gl.uniform2f(
    gl.getUniformLocation(program, 'CANVAS_SIZE'),
    CANVAS.clientWidth,
    CANVAS.clientHeight
);

const timeLocation = gl.getUniformLocation(program, 'NOW');
const speedLocation = gl.getUniformLocation(program, 'SPEED');

(function loop() {
    gl.uniform1f(speedLocation, SPEED);
    gl.uniform1f(timeLocation, performance.now());
    gl.drawElements(gl.TRIANGLES, VERTEX_INDICES.length, gl.UNSIGNED_SHORT, 0);
    requestAnimationFrame(loop);
})();
