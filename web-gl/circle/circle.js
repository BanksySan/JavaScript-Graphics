import {
    fetchShaderTexts,
    createProgram,
    initialiseMesh,
} from '../../helpers/webglHelpers.js';

const fetchShadersPromise = fetchShaderTexts(
    './circle.vert.glsl',
    './circle.frag.glsl'
);
const CANVAS = document.getElementById('circle-webgl');
const gl = CANVAS.getContext('webgl');
const { vertexShaderText, fragmentShaderText } = await fetchShadersPromise;

const program = createProgram(gl, vertexShaderText, fragmentShaderText);
initialiseMesh(program, gl);
gl.useProgram(program);

const canvasSizeLocation = gl.getUniformLocation(program, 'CANVAS_SIZE');
gl.uniform2f(canvasSizeLocation, CANVAS.clientWidth, CANVAS.clientHeight);

gl.drawArrays(gl.TRIANGLES, 0, 6);
