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

var InitDemo = function () {
    const canvas = document.getElementById('game-surface');
    const gl = canvas.getContext('webgl');
    if (!gl) {
        console.error("This browser doesn't support WebGL");
    }

    gl.clearColor(0.75, 0.85, 0.8, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    console.log('Creating Shaders');

    const vertexShader = gl.createShader(gl.VERTEX_SHADER);
    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);

    console.log('Setting source');

    gl.shaderSource(vertexShader, vertexShaderText);
    gl.shaderSource(fragmentShader, fragmentShaderText);

    gl.compileShader(vertexShader);
    gl.compileShader(fragmentShader);

    const compileStatus = {
        vertexStatus:
            gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS) ||
            gl.getShaderInfoLog(vertexShader),
        fragmentStatus:
            gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS) ||
            gl.getShaderInfoLog(fragmentShader),
    };

    if (
        compileStatus.vertexStatus !== true ||
        compileStatus.fragmentStatus !== true
    ) {
        console.error('Failed to compile.  Exiting.');
        return;
    }

    console.log('Create program');
    const program = gl.createProgram();

    console.log('Attach shaders');
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    const linkingStatus =
        gl.getProgramParameter(program, gl.LINK_STATUS) ||
        gl.getProgramInfoLog(program);
    console.log('Link status', linkingStatus);
    if (linkingStatus !== true) {
        console.error('Linking failed.  Exiting.');
        return;
    }

    // The validating the program is expensive.  You don't do it in production code.
    gl.validateProgram(program);
    const validationStatus =
        gl.getProgramParameter(program, gl.VALIDATE_STATUS) ||
        gl.getProgramInfoLog(program);
    console.log('Validation status', validationStatus);
    if (validationStatus !== true) {
        console.error('Validation failed.  Exiting.');
        return;
    }

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
};
