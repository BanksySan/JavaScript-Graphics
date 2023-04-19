import {
    NS,
    convertToSvgSpace,
    createAxis,
    drawXYAxisWithRings,
} from '../../../helpers/svg.js';
import { Complex } from '../../../helpers/Complex.js';
import { mandelbrot } from '../../fractals.js';

const SVG = document.getElementById('mandelbrot-iterations');
let maxIterations = 100;

console.log('START');

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

let path = document.createElementNS(NS, 'polyline');
path.setAttribute('stroke', 'black');
path.setAttribute('stroke-width', '0.005');
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

    for (let i = 1; i < results.length; i++) {
        points += ` ${results[i].real},${results[i].imaginary}`;
        if (results[i].real > 1000 || results[i].imaginary > 1000) break;
    }

    path.setAttribute('points', points);
}
