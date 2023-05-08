import { createProgram, fetchShaderTexts } from '../../helpers/webglHelpers.js';

console.log('Running "Receiving Output"');

const CANVAS = document.getElementById('webgl-receiving-output');
const gl = CANVAS.getContext('webgl');

const { vertexShaderText, fragmentShaderText } = await fetchShaderTexts(
    './receiving-output.vert.glsl',
    'receiving-output.frag.glsl'
);

const program = createProgram(gl, vertexShaderText, fragmentShaderText);

gl.useProgram(program);

(() => {
    const vertexBuffer = gl.createBuffer();
    const vertices = new Float32Array([
        ...[-1.0, 1.0],
        ...[1.0, 1.0],
        ...[1.0, -1.0],
        ...[-1.0, 1.0],
        ...[1.0, -1.0],
        ...[-1.0, -1.0],
    ]);

    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    const vertexPositionAttributeLocation = gl.getAttribLocation(
        program,
        'vertexPosition'
    );

    gl.vertexAttribPointer(
        vertexPositionAttributeLocation,
        2,
        gl.FLOAT,
        false,
        2 * Float32Array.BYTES_PER_ELEMENT,
        0
    );

    gl.enableVertexAttribArray(vertexPositionAttributeLocation);
})();

gl.drawArrays(gl.TRIANGLES, 0, 6);

const pixels = new Uint8Array(
    gl.drawingBufferWidth * gl.drawingBufferHeight * 4
);

gl.readPixels(
    0,
    0,
    gl.drawingBufferWidth,
    gl.drawingBufferHeight,
    gl.RGBA,
    gl.UNSIGNED_BYTE,
    pixels
);

console.log('pixels', pixels);
