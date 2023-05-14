/**
 * Accept the shaders and WebGL context and perform the steps required to create a <code>WebGLProgram</code>
 *
 * @param webGlContext {WebGLRenderingContext | WebGL2RenderingContext}
 * @param vertexShaderText {string}
 * @param fragmentShaderText {string}
 * @param verify {boolean}
 * @throws Error containing further details of error.
 * @returns {WebGLProgram} Compiled WebGL program.
 */
export function createProgram(
    webGlContext,
    vertexShaderText,
    fragmentShaderText,
    verify = true
) {
    if (!webGlContext) {
        console.error("This browser doesn't support WebGL");
    }

    webGlContext.clearColor(0.0, 0.0, 0.0, 0.0);
    webGlContext.clear(
        webGlContext.COLOR_BUFFER_BIT | webGlContext.DEPTH_BUFFER_BIT
    );

    const vertexShader = webGlContext.createShader(webGlContext.VERTEX_SHADER);
    const fragmentShader = webGlContext.createShader(
        webGlContext.FRAGMENT_SHADER
    );

    webGlContext.shaderSource(vertexShader, vertexShaderText);
    webGlContext.shaderSource(fragmentShader, fragmentShaderText);

    webGlContext.compileShader(vertexShader);
    webGlContext.compileShader(fragmentShader);

    const compileStatus = {
        vertexStatus:
            webGlContext.getShaderParameter(
                vertexShader,
                webGlContext.COMPILE_STATUS
            ) || webGlContext.getShaderInfoLog(vertexShader),
        fragmentStatus:
            webGlContext.getShaderParameter(
                fragmentShader,
                webGlContext.COMPILE_STATUS
            ) || webGlContext.getShaderInfoLog(fragmentShader),
    };

    if (
        compileStatus.vertexStatus !== true ||
        compileStatus.fragmentStatus !== true
    ) {
        throw new Error(
            `Failed to compile. ${JSON.stringify(compileStatus, null, 2)}`
        );
    }

    const program = webGlContext.createProgram();

    webGlContext.attachShader(program, vertexShader);
    webGlContext.attachShader(program, fragmentShader);
    webGlContext.linkProgram(program);

    const linkingStatus =
        webGlContext.getProgramParameter(program, webGlContext.LINK_STATUS) ||
        webGlContext.getProgramInfoLog(program);

    if (linkingStatus !== true) {
        throw new Error(`Linking filed:\n${linkingStatus}`);
    }

    if (verify) {
        webGlContext.validateProgram(program);
        const validationStatus =
            webGlContext.getProgramParameter(
                program,
                webGlContext.VALIDATE_STATUS
            ) || webGlContext.getProgramInfoLog(program);

        if (validationStatus === true) {
            console.log(`Verification passed`);
        } else {
            throw new Error(`Validation failed.\n${validationStatus}`);
        }
    }
    return program;
}

/**
 * Fetch the fragment and vertex shader text from external files.
 * @param vertexShaderPath
 * @param fragmentShaderPath
 * @returns {Promise<{vertexShaderText: string | null, fragmentShaderText: string | null}>}
 */
export async function fetchShaderTexts(vertexShaderPath, fragmentShaderPath) {
    const results = {
        vertexShaderText: null,
        fragmentShaderText: null,
    };

    let errors = [];
    await Promise.all([
        fetch(vertexShaderPath)
            .catch((e) => {
                errors.push(e);
            })
            .then(async (response) => {
                if (response.status === 200) {
                    results.vertexShaderText = await response.text();
                } else {
                    errors.push(
                        `Non-200 response for ${vertexShaderPath}.  ${response.status}:  ${response.statusText}`
                    );
                }
            }),

        fetch(fragmentShaderPath)
            .catch((e) => errors.push(e))
            .then(async (response) => {
                if (response.status === 200) {
                    results.fragmentShaderText = await response.text();
                } else {
                    errors.push(
                        `Non-200 response for ${fragmentShaderPath}.  ${response.status}:  ${response.statusText}`
                    );
                }
            }),
    ]);

    if (errors.length !== 0) {
        throw new Error(
            `Failed to fetch shader(s):\n${JSON.stringify(errors, replacer, 2)}`
        );
    }
    return results;
}

function replacer(key, value) {
    if (value?.constructor.name === 'Error') {
        return {
            name: value.name,
            message: value.message,
            stack: value.stack,
            cause: value.cause,
        };
    }
    return value;
}

/**
 * Add a flat mesh that fills the screen.
 * @param program {WebGLProgram}
 * @param webGlContext {WebGLRenderingContext | WebGL2RenderingContext}
 * @param vertexPositionAttributeName {string | null}
 */
export function initialiseMesh(
    program,
    webGlContext,
    vertexPositionAttributeName = 'vertexPosition'
) {
    const vertexBuffer = webGlContext.createBuffer();
    const vertices = new Float32Array([
        ...[-1.0, 1.0],
        ...[1.0, 1.0],
        ...[1.0, -1.0],
        ...[-1.0, 1.0],
        ...[1.0, -1.0],
        ...[-1.0, -1.0],
    ]);

    webGlContext.bindBuffer(webGlContext.ARRAY_BUFFER, vertexBuffer);
    webGlContext.bufferData(
        webGlContext.ARRAY_BUFFER,
        vertices,
        webGlContext.STATIC_DRAW
    );

    const vertexPositionAttributeLocation = webGlContext.getAttribLocation(
        program,
        vertexPositionAttributeName
    );

    webGlContext.vertexAttribPointer(
        vertexPositionAttributeLocation,
        2,
        webGlContext.FLOAT,
        false,
        2 * Float32Array.BYTES_PER_ELEMENT,
        0
    );

    webGlContext.enableVertexAttribArray(vertexPositionAttributeLocation);
}
