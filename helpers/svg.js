import { lerp } from './vector.js';

const NS = 'http://www.w3.org/2000/svg';

function createAxis(id, p1, p2, tickInterval, strokeWidth, strokeColour) {
    const axisGroup = document.createElementNS(NS, 'g');
    axisGroup.id = id;
    axisGroup.classList.add('axis');

    const axis = document.createElementNS(NS, 'line');

    axis.setAttribute('x1', p1.x.toString());
    axis.setAttribute('y1', p1.y.toString());
    axis.setAttribute('x2', p2.x.toString());
    axis.setAttribute('y2', p2.y.toString());
    axis.setAttribute('stroke', strokeColour);
    axis.setAttribute('stroke-width', strokeWidth);

    axisGroup.appendChild(axis);

    const tickGroup = document.createElementNS(NS, 'g');
    tickGroup.id = `${id}-tick-group`;
    tickGroup.classList.add('ticks');

    const step = 1 / tickInterval;

    for (let t = 0; t < 1; t += step) {
        const tickPoint = lerp(p1, p2, t);
        const tick = createDot(null, strokeWidth * 1.1, 'black', tickPoint);
        tickGroup.appendChild(tick);
    }

    axisGroup.appendChild(tickGroup);
    return axisGroup;
}

function createDot(id, radius, colour, centre) {
    const dot = document.createElementNS(NS, 'circle');
    dot.setAttribute('cx', centre.x.toString());
    dot.setAttribute('cy', centre.y.toString());
    dot.setAttribute('r', radius.toString());
    dot.setAttribute('fill', colour);
    if (id) dot.id = id;
    return dot;
}

function convertToSvgSpace(point, svg) {
    if (!(svg instanceof SVGElement)) {
        throw new Error(
            `Expected svg to be an SVGElement, Actual:  '${
                svg?.constructor.name ?? 'null/undefined'
            }'`
        );
    }

    const contextMatrix = svg.getScreenCTM();
    const inverseContextMatrix = contextMatrix.inverse();
    return DOMPoint.fromPoint(point).matrixTransform(inverseContextMatrix);
}

function drawXYAxisWithRings(x, y, width, height) {
    const group = document.createElementNS(NS, 'g');
    group.classList.add('axes');

    group.appendChild(
        createAxis(
            'x-axis',
            new DOMPoint(x, 0),
            new DOMPoint(x + width, 0),
            1,
            0.01,
            'blue'
        )
    );
    group.appendChild(
        createAxis(
            'y-axis',
            new DOMPoint(0, y),
            new DOMPoint(0, y + height),
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

        group.appendChild(circle);
    }

    return group;
}

export { NS, createAxis, createDot, convertToSvgSpace, drawXYAxisWithRings };
