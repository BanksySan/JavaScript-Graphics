import { createProgram } from '../../webglHelpers.js';

const vertexShaderText = [
    'precision mediump float;',

    'attribute vec2 vertPosition;',

    'void main() {',
    '    gl_Position = vec4(vertPosition, 0.0, 1.0);',
    '}',
].join('\n');

const fragmentShaderText = [
    'precision mediump float;',

    'void main()',
    '{',
    '    gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);',
    '}',
].join('\n');

(function InitDemo() {
    const canvas = document.getElementById('game-surface');
    const gl = canvas.getContext('webgl');
    if (!gl) {
        console.error("This browser doesn't support WebGL");
    }

    gl.clearColor(0.75, 0.85, 0.8, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    const program = createProgram(gl, vertexShaderText, fragmentShaderText);

    console.log('Creating buffer');

    /**
     * The <code>triangleVertices</code> needs to be a 32 bit array for WebGL.  JS arrays are 64 bit, thus the need to use the <code>Float32Array</code> constructor.
     * @type {Float32Array}
     */
    const triangleVertices = new Float32Array([
        0.0, 0.5, -0.5, -0.5, 0.5, -0.5,
    ]);
    const triangleVertexBufferObject = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, triangleVertexBufferObject);
    gl.bufferData(gl.ARRAY_BUFFER, triangleVertices, gl.STATIC_DRAW);

    /**
     * The string <code>vertPosition</code> is defined in the vertex shader as an <code>attribute</code>.
     * @type {GLint}
     */
    const positionAttributeLocation = gl.getAttribLocation(
        program,
        'vertPosition'
    );

    /**
     * The <code>normalized</code> parameter here is listed in the video as <code>gl.FALSE</code>.
     * This is an error, we should use <code>false</code>.
     */
    gl.vertexAttribPointer(
        positionAttributeLocation,
        2,
        gl.FLOAT,
        false,
        2 * Float32Array.BYTES_PER_ELEMENT,
        0
    );
    gl.enableVertexAttribArray(positionAttributeLocation);

    gl.useProgram(program);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
})();
