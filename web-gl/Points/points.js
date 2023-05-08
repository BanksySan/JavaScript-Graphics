function createShader(gl, type, source) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    return shader;
}

function createProgram(gl, vertexShader, fragmentShader) {
    const program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    return program;
}

function main() {
    const canvas = document.querySelector('#canvas');
    console.log('Aspect Ratio', canvas.clientWidth / canvas.clientHeight);
    const gl = canvas.getContext('webgl');

    const vertexShaderSource = `
    attribute vec4 a_position;
    attribute float a_pointSize;
    varying float v_pointSize;
    void main() {
      gl_Position = a_position;
      gl_PointSize = a_pointSize;
    }
  `;

    const fragmentShaderSource = `
    precision mediump float;
    void main() {
      gl_FragColor = vec4(1, 0, 0, 1); // Red color
    }
  `;

    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = createShader(
        gl,
        gl.FRAGMENT_SHADER,
        fragmentShaderSource
    );
    const program = createProgram(gl, vertexShader, fragmentShader);

    gl.useProgram(program);

    const positionAttributeLocation = gl.getAttribLocation(
        program,
        'a_position'
    );
    const pointSizeAttributeLocation = gl.getAttribLocation(
        program,
        'a_pointSize'
    );

    const position1 = [0.0, 0.0];
    const position2 = [0.0, -0.5];
    const position3 = [0.5, 0.5];
    const positions = [...position1, ...position2, ...position3];

    const pointSizes = [
        10.0, // Point 1 size
        20.0, // Point 2 size
        30.0, // Point 3 size
    ];

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

    const pointSizeBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, pointSizeBuffer);
    gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array(pointSizes),
        gl.STATIC_DRAW
    );

    gl.enableVertexAttribArray(positionAttributeLocation);
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0);

    gl.enableVertexAttribArray(pointSizeAttributeLocation);
    gl.bindBuffer(gl.ARRAY_BUFFER, pointSizeBuffer);
    gl.vertexAttribPointer(
        pointSizeAttributeLocation,
        1,
        gl.FLOAT,
        false,
        0,
        0
    );

    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.drawArrays(gl.POINTS, 0, positions.length / 2);
}

main();
