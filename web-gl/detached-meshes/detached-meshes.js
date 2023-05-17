import { createProgram, fetchShaderTexts } from '../../helpers/webglHelpers.js';

console.log('WebGL - Detached Meshes');
const CANVAS = document.getElementById('webgl-detached-meshes');
const gl = CANVAS.getContext('webgl');
gl.enable(gl.CULL_FACE);
gl.cullFace(gl.BACK);
gl.frontFace(gl.CCW); // Default value.  i think this is thanks to the right hand rule of dot products (thumb = x, pointing finger = y, middle finger = z
gl.clearColor(1.0, 0.0, 1.0, 1.0);
gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

const shaderTexts = await fetchShaderTexts(
    './detached-meshes.vert.glsl',
    './detached-meshes.frag.glsl'
);
const program = createProgram(
    gl,
    shaderTexts.vertexShaderText,
    shaderTexts.fragmentShaderText
);

gl.useProgram(program);

const triangleVertexData = new Float32Array([
    ...[...[0.0, 0.0], ...[1.0, 1.0], ...[0.0, 1.0]],
    ...[...[0.0, 0.0], ...[-1.0, -1.0], ...[0.0, -1.0]],
    ...[...[-0.8, 0.8], ...[-0.8, 0.0], ...[-0.2, 0.8]],
    ...[...[0.8, -0.0], ...[0.2, -0.8], ...[0.8, -0.8]],
]);
const vertexBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
gl.bufferData(gl.ARRAY_BUFFER, triangleVertexData, gl.STATIC_DRAW);

const vertexAttributeLocation = gl.getAttribLocation(
    program,
    'VERTEX_POSITION'
);

gl.vertexAttribPointer(
    vertexAttributeLocation,
    2,
    gl.FLOAT,
    false,
    2 * Float32Array.BYTES_PER_ELEMENT,
    0
);
gl.enableVertexAttribArray(vertexAttributeLocation);

const canvasSizeLocation = gl.getUniformLocation(program, 'CANVAS_SIZE');
console.assert(canvasSizeLocation !== 0);
gl.uniform2f(canvasSizeLocation, CANVAS.width, CANVAS.height);

gl.drawArrays(gl.TRIANGLES, 0, triangleVertexData.length);
