export function createProgram(gl, vertexShaderText, fragmentShaderText) {
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
        let error = new Error('Failed to compile.  Exiting.');
        error.compileStatus = compileStatus;
        throw error;
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

    return program;
}

/**
 * Fetch the fragment and vertex shader text from external files.
 * @param vertexShaderPath
 * @param fragmentShaderPath
 * @returns {Promise<{vertexShaderText: string, fragmentShaderText: string}>}
 */
export async function fetchShaderTexts(vertexShaderPath, fragmentShaderPath) {
    const vertexShaderText = await (await fetch(vertexShaderPath)).text();
    const fragmentShaderText = await (await fetch(fragmentShaderPath)).text();
    return {
        vertexShaderText,
        fragmentShaderText,
    };
}
