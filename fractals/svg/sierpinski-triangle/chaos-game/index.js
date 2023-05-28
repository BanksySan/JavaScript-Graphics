const NS = 'http://www.w3.org/2000/svg';
const SVG = document.getElementById('sierpinski');

const VIEW_BOX = {
    x: -1.5,
    y: -1.5,
    width: 3,
    height: 2,
};

let MAX_ITERATIONS = 1000000;
let count = 0;

SVG.setAttribute(
    'viewBox',
    `${VIEW_BOX.x} ${VIEW_BOX.y} ${VIEW_BOX.width} ${VIEW_BOX.height}`
);
const xAxis = document.createElementNS(NS, 'line');
const yAxis = document.createElementNS(NS, 'line');

xAxis.setAttribute('x1', VIEW_BOX.x.toString());
xAxis.setAttribute('x2', (VIEW_BOX.x + VIEW_BOX.width).toString());
xAxis.setAttribute('y1', '0');
xAxis.setAttribute('y2', '0');
xAxis.setAttribute('stroke', 'blue');
xAxis.setAttribute('stroke-width', '0.005');
xAxis.id = 'x-axis';

yAxis.setAttribute('x1', '0');
yAxis.setAttribute('x2', '0');
yAxis.setAttribute('y1', VIEW_BOX.y.toString());
yAxis.setAttribute('y2', (VIEW_BOX.y + VIEW_BOX.height).toString());
yAxis.setAttribute('stroke', 'green');
yAxis.setAttribute('stroke-width', '0.005');
yAxis.id = 'y-axis';

const axesGroup = document.createElementNS(NS, 'g');
axesGroup.id = 'axes';
SVG.appendChild(axesGroup);

axesGroup.appendChild(xAxis);
axesGroup.appendChild(yAxis);

SVG.addEventListener('mousedown', function (event) {
    const contextMatrix = SVG.getScreenCTM();
    const inverseContextMatrix = contextMatrix.inverse();
    const clickPoint = new DOMPoint(
        event.clientX,
        event.clientY
    ).matrixTransform(inverseContextMatrix);
    console.log(clickPoint);

    const dot = document.createElementNS(NS, 'circle');
    dot.setAttribute('cx', clickPoint.x.toString());
    dot.setAttribute('cy', clickPoint.y.toString());
    dot.setAttribute('r', '0.01');
    dot.setAttribute('fill', 'red');
    SVG.appendChild(dot);
    placeDot(clickPoint);
});

const marginPercentage = 0.55;
const vertices = [
    new DOMPoint(VIEW_BOX.x * marginPercentage, 0),
    new DOMPoint((VIEW_BOX.x + VIEW_BOX.width) * marginPercentage, 0),
    new DOMPoint(0, -(Math.sqrt(3) * 0.5 * VIEW_BOX.width * marginPercentage)),
];

for (let i = 0; i < vertices.length; i++) {
    const point = document.createElementNS(NS, 'circle');
    const vertex = vertices[i];
    point.setAttribute('cx', vertex.x.toString());
    point.setAttribute('cy', vertex.y.toString());
    point.setAttribute('r', '0.01');
    point.setAttribute('fill', 'magenta');
    point.id = 'initial-vertex-' + i;
    SVG.appendChild(point);
}

function placeDot(seedPoint) {
    function midPoint(p1, p2) {
        return new DOMPoint((p1.x + p2.x) / 2, (p1.y + p2.y) / 2);
    }

    function randomIndex() {
        const randomNumber = Math.random();
        if (randomNumber < 1 / 3) {
            return 0;
        } else if (randomNumber < 2 / 3) {
            return 1;
        }
        return 2;
    }

    const number = randomIndex();
    const randomVertex = vertices[number];
    console.log(number);
    const newPoint = midPoint(randomVertex, seedPoint);

    const dot = document.createElementNS(NS, 'circle');
    dot.setAttribute('cx', newPoint.x.toString());
    dot.setAttribute('cy', newPoint.y.toString());
    dot.setAttribute('r', '0.0025');
    dot.setAttribute('fill', 'black');
    SVG.appendChild(dot);
    if (count !== MAX_ITERATIONS) {
        count++;
        requestAnimationFrame(() => placeDot(newPoint));
    } else {
        count = 0;
    }
}
