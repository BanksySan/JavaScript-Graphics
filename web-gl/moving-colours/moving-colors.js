import {
    fetchShaderTexts,
    initialiseMesh,
    createProgram,
} from '../../helpers/webglHelpers.js';

const SHADER_TEXT_PROMISE = fetchShaderTexts(
    './moving-colors.vert.glsl',
    './moving-colors.frag.glsl'
);
const CANVAS = document.getElementById('webgl-moving-colors');
const gl = CANVAS.getContext('webgl2');
const SHADER_TEXTS = await SHADER_TEXT_PROMISE;
const program = createProgram(
    gl,
    SHADER_TEXTS.vertexShaderText,
    SHADER_TEXTS.fragmentShaderText
);

gl.useProgram(program);

initialiseMesh(program, gl, 'VERTEX_POSITION');
const canvasSizeLocation = gl.getUniformLocation(program, 'CANVAS_SIZE');
const nowLocation = gl.getUniformLocation(program, 'NOW');

const speedLocation = gl.getUniformLocation(program, 'SPEED');
window.djb = {
    speed: 0.0005,
};

gl.clearColor(0.75, 0.85, 0.8, 1.0);

(function loop() {
    const now = performance.now();
    gl.uniform1f(nowLocation, now);
    gl.uniform1f(speedLocation, window.djb.speed);
    gl.uniform2f(canvasSizeLocation, CANVAS.width, CANVAS.height);

    gl.clear(gl.DEPTH_BUFFER_BIT | gl.COLOR_BUFFER_BIT);

    gl.drawArrays(gl.TRIANGLES, 0, 6);
    requestAnimationFrame(loop);
})();
