import { NS, convertToSvgSpace, createAxis } from '../../helpers/svg.js';
import { Complex } from '../../helpers/Complex.js';

const SVG = document.getElementById('mandelbrot-iterations');
let maxIterations = 100;

let mouseDown = false;
let path = null;
console.log('START');

(function drawLayout() {
    SVG.appendChild(
        createAxis(
            'x-axis',
            new DOMPoint(-2, 0),
            new DOMPoint(2, 0),
            1,
            0.01,
            'blue'
        )
    );
    SVG.appendChild(
        createAxis(
            'y-axis',
            new DOMPoint(0, -2),
            new DOMPoint(0, 2),
            1,
            0.01,
            'green'
        )
    );

    for (let i = 0; i < 4; i += 0.25) {
        const isInteger = i % 1 === 0;

        const circle = document.createElementNS(NS, 'circle');
        circle.setAttribute('r', i.toString());
        circle.setAttribute('stroke-width', isInteger ? '0.005' : '0.001');
        circle.setAttribute('stroke', isInteger ? 'black' : 'grey');
        circle.setAttribute('fill', 'none');
        circle.setAttribute('cx', '0');
        circle.setAttribute('cy', '0');

        SVG.appendChild(circle);
    }
})();

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

function handleMouseClick(x, y) {
    const clickPoint = new DOMPoint(x, y, 0);
    const svgPoint = convertToSvgSpace(clickPoint, SVG);
    if (!path) {
        path = document.createElementNS(NS, 'polyline');
        path.setAttribute('stroke', 'black');
        path.setAttribute('stroke-width', '0.005');
        path.setAttribute('fill', 'none');
        SVG.appendChild(path);
    }

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

/***
 * <code>f(z) = z^2 + c</code>
 * @param z Complex result of the iteration.
 * @param c Complex constant, set to the coordinates on the complex plain of the point we are interested in.
 */
function f(z, c) {
    (function assertArgs(z, c) {
        if (!(z instanceof Complex))
            throw new Error(
                `Expected z to be Complex but was ${z?.constructor.name}`
            );
        if (!(c instanceof Complex))
            throw new Error(
                `Expected c to be Complex but was ${z?.constructor.name}`
            );
    })(z, c);

    return z.multiply(z).add(c);
}

function mandelbrot(c, maxIterations) {
    const results = new Array(maxIterations);

    results[0] = f(Complex.zero(), c);

    for (let i = 1; i < maxIterations; i++) {
        const prev = results[i - 1];
        results[i] = f(prev, c);
    }

    return results;
}
