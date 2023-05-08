import { createProgram } from '../../../helpers/webglHelpers.js';
const { mat4 } = glMatrix;

const vertexShaderText = [
    'precision mediump float;',
    'attribute vec3 vertPosition;',
    'attribute vec3 vertColor;',
    'varying vec3 fragColor;',
    'uniform mat4 worldMatrix;',
    'uniform mat4 viewMatrix;',
    'uniform mat4 projectionMatrix;',
    'void main() {',
    '    fragColor = vertColor;',
    '    gl_Position = projectionMatrix * viewMatrix * worldMatrix * vec4(vertPosition, 1.0);',
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

    const vertexTopCoordinates = [0.0, 0.5, 0.0];
    const vertexLeftCoordinates = [-0.5, -0.5, 0.0];
    const vertexRightCoordinates = [0.5, -0.5, 0.0];

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
        3,
        gl.FLOAT,
        false,
        6 * Float32Array.BYTES_PER_ELEMENT,
        0
    );

    gl.vertexAttribPointer(
        vertColorAttributeLocation,
        3,
        gl.FLOAT,
        false,
        6 * Float32Array.BYTES_PER_ELEMENT,
        3 * Float32Array.BYTES_PER_ELEMENT
    );

    gl.enableVertexAttribArray(positionAttributeLocation);
    gl.enableVertexAttribArray(vertColorAttributeLocation);

    const worldMatrixUniformLocation = gl.getUniformLocation(
        program,
        'worldMatrix'
    );
    const viewMatrixUniformLocation = gl.getUniformLocation(
        program,
        'viewMatrix'
    );
    const projectionMatrixUniformLocation = gl.getUniformLocation(
        program,
        'projectionMatrix'
    );

    gl.useProgram(program);

    const worldMatrix = new Float32Array(16);
    const viewMatrix = new Float32Array(16);
    const projectionMatrix = new Float32Array(16);

    mat4.identity(worldMatrix);
    mat4.lookAt(viewMatrix, [0, 0, -2], [0, 0, 0], [0, 1, 0]);
    const aspectRatio = canvas.clientWidth / canvas.clientHeight;
    mat4.perspective(
        projectionMatrix,
        Math.PI * 0.25,
        aspectRatio,
        0.1,
        1000.0
    );

    gl.uniformMatrix4fv(worldMatrixUniformLocation, false, worldMatrix);
    gl.uniformMatrix4fv(viewMatrixUniformLocation, false, viewMatrix);
    gl.uniformMatrix4fv(
        projectionMatrixUniformLocation,
        false,
        projectionMatrix
    );

    /**
     * Declare outside the loop because memory allocation for new variables takes time.
     * @type {number}
     */
    let angle;

    const identityMatrix = new Float32Array([
        1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0,
        0.0, 1.0,
    ]);

    const loop = () => {
        /**
         * One rotation per 6 seconds.
         */
        angle = (performance.now() / 1000 / 6) * Math.PI;
        mat4.rotate(worldMatrix, identityMatrix, angle, [0, 1, 0]);
        gl.uniformMatrix4fv(worldMatrixUniformLocation, false, worldMatrix);
        gl.clearColor(0.75, 0.85, 0.8, 1.0);
        gl.clear(gl.DEPTH_BUFFER_BIT | gl.COLOR_BUFFER_BIT);
        gl.drawArrays(gl.TRIANGLES, 0, 3);

        requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);
})();
