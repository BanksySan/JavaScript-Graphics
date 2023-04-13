import { NS, drawXYAxisWithRings } from '../../../helpers/svg.js';
import { Complex } from '../../../helpers/Complex.js';
import { mandelbrot } from '../../fractals.js';

const PIXEL_SIZE = 0.0025;
const SVG = document.getElementById('mandelbrot-fractal');
const VIEW_BOX = {
    x: SVG.viewBox.baseVal.x,
    y: SVG.viewBox.baseVal.y,
    width: SVG.viewBox.baseVal.width,
    height: SVG.viewBox.baseVal.height,
};

console.dir(VIEW_BOX);

let maxIterations = 100;
let maxMagnitude = 100;

SVG.appendChild(
    drawXYAxisWithRings(VIEW_BOX.x, VIEW_BOX.y, VIEW_BOX.width, VIEW_BOX.height)
);

const END_X_COORD = VIEW_BOX.x + VIEW_BOX.width;
const END_Y_COORD = VIEW_BOX.y + VIEW_BOX.height;

const PIXEL_SIZE_STRING = PIXEL_SIZE.toString();
for (let i = VIEW_BOX.x; i < END_X_COORD; i += PIXEL_SIZE) {
    for (let j = VIEW_BOX.y; j < END_Y_COORD; j += PIXEL_SIZE) {
        const results = mandelbrot(new Complex(i, j), maxIterations);
        if (results[results.length - 1].magnitude() < maxMagnitude) {
            const pixel = document.createElementNS(NS, 'rect');
            pixel.setAttribute('x', i.toString());
            pixel.setAttribute('y', j.toString());
            pixel.setAttribute('width', PIXEL_SIZE_STRING);
            pixel.setAttribute('height', PIXEL_SIZE_STRING);
            pixel.setAttribute('fill', 'black');
            SVG.appendChild(pixel);
        }
    }
}
