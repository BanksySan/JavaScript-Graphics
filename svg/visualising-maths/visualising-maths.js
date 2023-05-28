console.log('SVG: Visualising Maths');
import { createAxis, NS } from '../../helpers/svg.js';

const SVG = document.getElementById('svg-visualising-maths');
const VIEW_BOX = {
    x: SVG.viewBox.baseVal.x,
    y: SVG.viewBox.baseVal.y,
    width: SVG.viewBox.baseVal.width,
    height: SVG.viewBox.baseVal.height,
};

console.log('VIEW_BOX', VIEW_BOX);

(function createBackground(majorStrokeWidth, minorStrokeWidth, minorInterval) {
    const backgroundGroup = document.createElementNS(NS, 'g');
    backgroundGroup.id = 'background';
    const xAxisGroup = document.createElementNS(NS, 'g');
    xAxisGroup.id = 'x-axis';
    xAxisGroup.appendChild(
        createAxis(
            SVG.id,
            new DOMPoint(VIEW_BOX.x, 0),
            new DOMPoint(VIEW_BOX.x + VIEW_BOX.width, 0),
            1,
            majorStrokeWidth,
            'blue'
        )
    );
    for (let i = VIEW_BOX.x; i < VIEW_BOX.width; i += minorInterval) {
        xAxisGroup.appendChild(
            createAxis(
                SVG.id,
                new DOMPoint(VIEW_BOX.x, i),
                new DOMPoint(VIEW_BOX.x + VIEW_BOX.width, i),
                1,
                minorStrokeWidth,
                'blue'
            )
        );
    }

    const yAxisGroup = document.createElementNS(NS, 'g');
    yAxisGroup.id = 'y-axis';
    yAxisGroup.appendChild(
        createAxis(
            SVG.id,
            new DOMPoint(0, VIEW_BOX.y),
            new DOMPoint(0, VIEW_BOX.y + VIEW_BOX.height),
            1,
            majorStrokeWidth,
            'green'
        )
    );
    for (
        let i = VIEW_BOX.y;
        i < VIEW_BOX.y + VIEW_BOX.width;
        i += minorInterval
    ) {
        yAxisGroup.appendChild(
            createAxis(
                SVG.id,
                new DOMPoint(i, VIEW_BOX.y),
                new DOMPoint(i, VIEW_BOX.y + VIEW_BOX.height),
                1,
                minorStrokeWidth,
                'green'
            )
        );
    }

    backgroundGroup.appendChild(xAxisGroup);
    backgroundGroup.appendChild(yAxisGroup);
    SVG.appendChild(backgroundGroup);
})('0.05px', '0.025px', 1);

const points = (function generateSeedPoints(numberToGenerate, radius, domain) {
    const elements = new Array(numberToGenerate);
    for (let i = 0; i < numberToGenerate; i++) {
        const element = document.createElementNS(NS, 'circle');
        element.id = `point-${i}`;
        element.setAttribute('cx', Math.random() * domain.width + domain.x);
        element.setAttribute('cy', Math.random() * domain.height + domain.y);
        element.setAttribute('r', radius);
        element.setAttribute('r', radius);
        //element.setAttribute('color', `hsl(${i * 360 / numberToGenerate}`, '100%', '50%')`);
        elements[i] = element;
    }
    return elements;
})(10, '0.25px', VIEW_BOX);

console.log('points', points);
for (let i = 0; i < points.length; i++) {
    SVG.appendChild(points[i]);
}
