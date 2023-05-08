import {
    NS,
    convertToSvgSpace,
    createAxis,
    drawXYAxisWithRings,
} from '../../../../helpers/svg.js';
import { Complex } from '../../../../helpers/Complex.js';
import { mandelbrot } from '../../../fractals.js';

const SVG = document.getElementById('mandelbrot-iterations');
let maxIterations = 100;
const pixelWidth = 0.01;

SVG.appendChild(drawXYAxisWithRings(-2, -2, 4, 4));

let mouseDown = false;
(function addEventListeners() {
    SVG.addEventListener('mousedown', (e) => {
        mouseDown = true;
        handleMouseClick(e.clientX, e.clientY);
    });

    SVG.addEventListener('mouseup', () => {
        mouseDown = false;
    });

    SVG.addEventListener('mousemove', (e) => {
        if (mouseDown) {
            handleMouseClick(e.clientX, e.clientY);
        }
    });
})();
const pixelGroup = document.createElementNS(NS, 'g');
pixelGroup.id = 'pixels';
SVG.appendChild(pixelGroup);
let path = document.createElementNS(NS, 'polyline');
path.setAttribute('stroke', 'black');
path.setAttribute('stroke-width', pixelWidth.toString());
path.setAttribute('fill', 'none');
SVG.appendChild(path);

function handleMouseClick(x, y) {
    const clickPoint = new DOMPoint(x, y, 0);
    const svgPoint = convertToSvgSpace(clickPoint, SVG);

    const results = mandelbrot(
        new Complex(svgPoint.x, svgPoint.y),
        maxIterations
    );

    let points = `${results[0].real},${results[0].imaginary}`;
    let withinSet = false;
    for (let i = 1; i < results.length; i++) {
        const result = results[i];
        points += ` ${result.real},${result.imaginary}`;
        if (result.magnitude() > 4) {
            withinSet = true;
        }

        if (result.real > 1000 || result.imaginary > 1000) {
            break;
        }
    }

    if (withinSet) {
        const pixel = document.createElementNS(NS, 'rect');
        pixel.setAttribute('x', svgPoint.x.toString());
        pixel.setAttribute('y', svgPoint.y.toString());
        pixel.setAttribute('width', pixelWidth.toString());
        pixel.setAttribute('height', pixelWidth.toString());
        pixel.setAttribute('fill', 'blue');
        pixelGroup.appendChild(pixel);
    }

    path.setAttribute('points', points);
}
