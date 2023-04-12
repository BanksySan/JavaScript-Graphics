const NS = 'http://www.w3.org/2000/svg';

function createAxis(id, p1, p2, tickInterval, strokeWidth, strokeColour) {
    const axesGroup = document.createElementNS(NS, 'g');
    axesGroup.id = id;
    axesGroup.classList.add('axis');

    const axis = document.createElementNS(NS, 'line');

    axis.setAttribute('x1', p1.x.toString());
    axis.setAttribute('y1', p1.y.toString());
    axis.setAttribute('x2', p2.x.toString());
    axis.setAttribute('y2', p2.y.toString());
    axis.setAttribute('stroke', strokeColour);
    axis.setAttribute('stroke-width', strokeWidth);

    axesGroup.appendChild(axis);

    return axesGroup;
}

function createDot(id, radius, colour, centre) {
    const dot = document.createElementNS(NS, 'circle');
    dot.setAttribute('cx', centre.x.toString());
    dot.setAttribute('cy', centre.y.toString());
    dot.setAttribute('r', radius.toString());
    dot.setAttribute('fill', colour);
    return dot;
}

export { NS, createAxis, createDot };
