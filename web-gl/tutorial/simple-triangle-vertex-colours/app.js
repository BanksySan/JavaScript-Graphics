import { createProgram } from '../../../helpers/webglHelpers.js';

const vertexShaderText = [
    'precision mediump float;',
    'attribute vec2 vertPosition;',
    'attribute vec3 vertColor;',
    'varying vec3 fragColor;',
    'void main() {',
    '    fragColor = vertColor;',
    '    gl_Position = vec4(vertPosition, 0.0, 1.0);',
    '}',
].join('\n');

const fragmentShaderText = [
    'precision mediump float;',
    'varying vec3 fragColor;',
    'void main()',
    '{',
    '    gl_FragColor = vec4(fragColor, 1.0);',
    '}',
].join('\n');

(function InitDemo() {
    const canvas = document.getElementById('game-surface');
    const gl = canvas.getContext('webgl');
    const program = createProgram(gl, vertexShaderText, fragmentShaderText);

    console.log('Creating buffer');

    const vertexTopCoordinates = [0.0, 0.5];
    const vertexLeftCoordinates = [-0.5, -0.5];
    const vertexRightCoordinates = [0.5, -0.5];

    const vertexTopColor = [1.0, 0.0, 0.0];
    const vertexLeftColor = [0.0, 1.0, 0.0];
    const vertexRightColor = [0.0, 0.0, 1.0];

    /**
     * The <code>triangleVertices</code> needs to be a 32 bit array for WebGL.  JS arrays are 64 bit, thus the need to use the <code>Float32Array</code> constructor.
     * @type {Float32Array}
     */
    const triangleVertices = new Float32Array([
        ...vertexTopCoordinates,
        ...vertexTopColor,
        ...vertexLeftCoordinates,
        ...vertexLeftColor,
        ...vertexRightCoordinates,
        ...vertexRightColor,
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
    const vertColorAttributeLocation = gl.getAttribLocation(
        program,
        'vertColor'
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
        5 * Float32Array.BYTES_PER_ELEMENT,
        0
    );

    gl.vertexAttribPointer(
        vertColorAttributeLocation,
        3,
        gl.FLOAT,
        false,
        5 * Float32Array.BYTES_PER_ELEMENT,
        2 * Float32Array.BYTES_PER_ELEMENT
    );

    gl.enableVertexAttribArray(positionAttributeLocation);
    gl.enableVertexAttribArray(vertColorAttributeLocation);

    gl.useProgram(program);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
})();
