import {
    fetchShaderTexts,
    createProgram,
} from '../../../helpers/webglHelpers.js';

console.log('Starting:  WebGL:  Checkerboard Mesh');
const shaderTextPromise = fetchShaderTexts(
    'checkerboard.vert.glsl',
    'checkerboard.frag.glsl'
);
const CANVAS = document.getElementById('webgl-checkerboard');
const gl = CANVAS.getContext('webgl2');
gl.enable(gl.CULL_FACE);
gl.cullFace(gl.BACK);
gl.frontFace(gl.CCW); // Default value.  i think this is thanks to the right hand rule of dot products (thumb = x, pointing finger = y, middle finger = z
gl.clearColor(1.0, 0.0, 1.0, 1.0);
gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
const shaderTexts = await shaderTextPromise;

const program = createProgram(
    gl,
    shaderTexts.vertexShaderText,
    shaderTexts.fragmentShaderText
);

gl.useProgram(program);

/**
 * Number of cells in each dimension.
 * @type {{width: number, height: number}}
 */
const CELL_COUNT = {
    width: 8,
    height: 6,
};

/**
 * The size of each cell in each dimension.
 * @type {{x: number, y: number}}
 */
const CELL_SIZE = {
    x: 2 / CELL_COUNT.width,
    y: 2 / CELL_COUNT.height,
};

/**
 * Vertex coordinate data for mesh generation.
 * @type {Array<number>}
 */
const triangleData = [];

let rowAlternate = false;
for (let i = -1.0; i < 1.0; i += CELL_SIZE.x) {
    let cellAlternate = rowAlternate;

    for (let j = -1.0; j < 1.0; j += CELL_SIZE.y) {
        cellAlternate = !cellAlternate;
        if (cellAlternate) {
            continue;
        }
        const v1 = [i, j];
        const v2 = [i, j + CELL_SIZE.y];
        const v3 = [i + CELL_SIZE.x, j + CELL_SIZE.y];
        const v4 = [i + CELL_SIZE.x, j];

        triangleData.push(...v1);
        triangleData.push(...v3);
        triangleData.push(...v2);
        triangleData.push(...v3);
        triangleData.push(...v1);
        triangleData.push(...v4);
    }

    rowAlternate = !rowAlternate;
}

const vertexBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(triangleData), gl.STATIC_DRAW);

const vertexAttributeLocation = gl.getAttribLocation(
    program,
    'VERTEX_POSITION'
);
gl.vertexAttribPointer(
    vertexAttributeLocation,
    2,
    gl.FLOAT,
    false,
    2 * Float32Array.BYTES_PER_ELEMENT,
    0
);
gl.enableVertexAttribArray(vertexAttributeLocation);
console.log('vertexBuffer.length', triangleData.length);
gl.drawArrays(gl.TRIANGLES, 0, triangleData.length);
