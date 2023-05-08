import { createProgram } from '../../../helpers/webglHelpers.js';
const { mat4, mul } = glMatrix;

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
    gl.enable(gl.DEPTH_TEST);
    gl.enable(gl.CULL_FACE);
    gl.cullFace(gl.BACK);
    gl.frontFace(gl.CCW);
    const program = createProgram(gl, vertexShaderText, fragmentShaderText);

    console.log('Creating buffer');

    const boxTopVertices = [
        ...[-1.0, 1.0, -1.0, 0.5, 0.5, 0.5],
        ...[-1.0, 1.0, 1.0, 0.5, 0.5, 0.5],
        ...[1.0, 1.0, 1.0, 0.5, 0.5, 0.5],
        ...[1.0, 1.0, -1.0, 0.5, 0.5, 0.5],
    ];
    const boxLeftVertices = [
        ...[-1.0, 1.0, 1.0, 0.75, 0.25, 0.5],
        ...[-1.0, -1.0, 1.0, 0.75, 0.25, 0.5],
        ...[-1.0, -1.0, -1.0, 0.75, 0.25, 0.5],
        ...[-1.0, 1.0, -1.0, 0.75, 0.25, 0.5],
    ];
    const boxRightVertices = [
        ...[1.0, 1.0, 1.0, 0.25, 0.25, 0.75],
        ...[1.0, -1.0, 1.0, 0.25, 0.25, 0.75],
        ...[1.0, -1.0, -1.0, 0.25, 0.25, 0.75],
        ...[1.0, 1.0, -1.0, 0.25, 0.25, 0.75],
    ];
    const boxFrontVertices = [
        ...[1.0, 1.0, 1.0, 1.0, 0.0, 0.15],
        ...[1.0, -1.0, 1.0, 1.0, 0.0, 0.15],
        ...[-1.0, -1.0, 1.0, 1.0, 0.0, 0.15],
        ...[-1.0, 1.0, 1.0, 1.0, 0.0, 0.15],
    ];
    const boxBackVertices = [
        ...[1.0, 1.0, -1.0, 0.0, 1.0, 0.15],
        ...[1.0, -1.0, -1.0, 0.0, 1.0, 0.15],
        ...[-1.0, -1.0, -1.0, 0.0, 1.0, 0.15],
        ...[-1.0, 1.0, -1.0, 0.0, 1.0, 0.15],
    ];
    const boxBottomVertices = [
        ...[-1.0, -1.0, -1.0, 0.5, 0.5, 1.0],
        ...[-1.0, -1.0, 1.0, 0.5, 0.5, 1.0],
        ...[1.0, -1.0, 1.0, 0.5, 0.5, 1.0],
        ...[1.0, -1.0, -1.0, 0.5, 0.5, 1.0],
    ];
    const boxVertices = [
        ...boxTopVertices,
        ...boxLeftVertices,
        ...boxRightVertices,
        ...boxFrontVertices,
        ...boxBackVertices,
        ...boxBottomVertices,
    ];

    const boxTopIndices = [0, 1, 2, 0, 2, 3];
    const boxLeftIndices = [5, 4, 6, 6, 4, 7];
    const boxRightIndices = [8, 9, 10, 8, 10, 11];
    const boxFrontIndices = [13, 12, 14, 15, 14, 12];
    const boxBackIndices = [16, 17, 18, 16, 18, 19];
    const boxBottomIndices = [21, 20, 22, 22, 20, 23];
    const boxIndices = [
        ...boxTopIndices,
        ...boxLeftIndices,
        ...boxRightIndices,
        ...boxFrontIndices,
        ...boxBackIndices,
        ...boxBottomIndices,
    ];

    const boxVertexBufferObject = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, boxVertexBufferObject);
    gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array(boxVertices), // <== Float 32
        gl.STATIC_DRAW
    );

    const boxIndexBufferObject = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, boxIndexBufferObject);
    gl.bufferData(
        gl.ELEMENT_ARRAY_BUFFER,
        new Uint16Array(boxIndices), // <== UInt 16!
        gl.STATIC_DRAW
    );

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
    mat4.lookAt(viewMatrix, [0, 2, -6], [0, 0, 0], [0, 1, 0]);
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

    const xRotationMatrix = new Float32Array(16);
    const yRotationMatrix = new Float32Array(16);

    const loop = () => {
        /**
         * One rotation per 6 seconds.
         */
        angle = (performance.now() / 1000 / 6) * Math.PI;

        mat4.rotate(yRotationMatrix, identityMatrix, angle, [0, 1, 0]);
        mat4.rotate(xRotationMatrix, identityMatrix, angle / 4, [1, 0, 0]);
        mat4.mul(worldMatrix, xRotationMatrix, yRotationMatrix);

        gl.uniformMatrix4fv(worldMatrixUniformLocation, false, worldMatrix);
        gl.clearColor(0.75, 0.85, 0.8, 1.0);
        gl.clear(gl.DEPTH_BUFFER_BIT | gl.COLOR_BUFFER_BIT);
        gl.drawElements(gl.TRIANGLES, boxIndices.length, gl.UNSIGNED_SHORT, 0);

        requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);
})();
