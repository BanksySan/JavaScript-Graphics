import {
    createProgram,
    fetchShaderTexts,
    initialiseMesh,
} from '../../helpers/webglHelpers.js';

const SHADER_TEXTS_PROMISE = fetchShaderTexts(
    './hello-world.vert.glsl',
    './hello-world.frag.glsl'
);
const CANVAS = document.getElementById('webgl-hello-world');
const gl = CANVAS.getContext('webgl2');
const SHADER_TEXTS = await SHADER_TEXTS_PROMISE;
const program = createProgram(
    gl,
    SHADER_TEXTS.vertexShaderText,
    SHADER_TEXTS.fragmentShaderText
);

gl.useProgram(program);

initialiseMesh(program, gl, 'VERTEX_POSITION');

gl.uniform2f(
    gl.getUniformLocation(program, 'CANVAS_SIZE'),
    CANVAS.width,
    CANVAS.height
);
gl.drawArrays(gl.TRIANGLES, 0, 6);
