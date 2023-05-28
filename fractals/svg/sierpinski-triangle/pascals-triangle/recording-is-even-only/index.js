const SVG = document.getElementById('pascal');
const NS = 'http://www.w3.org/2000/svg';
const ODD = false;

function buildTriangle(n) {
    const triangle = new Array(n);

    for (let i = 0; i < n + 1; i++) {
        const nextLine = new Array(i + 1);
        nextLine[0] = ODD;
        for (let j = 1; j < nextLine.length - 1; j++) {
            const prevLine = triangle[i - 1];
            nextLine[j] = prevLine[j - 1] === prevLine[j];
        }
        nextLine[nextLine.length - 1] = ODD;
        triangle[i] = nextLine;
    }

    return triangle;
}

function generatePoints(svg, triangles) {
    const top = svg.viewBox.baseVal.y;
    const pixelSize = svg.viewBox.baseVal.height / triangles.length;
    for (let i = 0; i < triangles.length; i++) {
        const lineGroup = document.createElementNS(NS, 'g');
        lineGroup.id = `line-${i}`;
        const row = triangles[i];
        const yCoord = top + pixelSize * i;
        const startingXCoord = -(row.length * pixelSize) / 2;
        for (let j = 0; j < row.length; j++) {
            const point = document.createElementNS(NS, 'rect');
            point.setAttribute('y', yCoord.toString());
            point.setAttribute(
                'x',
                (startingXCoord + j * pixelSize).toString()
            );
            point.setAttribute('width', pixelSize.toString());
            point.setAttribute('height', pixelSize.toString());
            point.setAttribute('x-value', triangles[i][j].toString());
            point.setAttribute('fill', triangles[i][j] ? 'black' : 'white');
            lineGroup.appendChild(point);
        }

        SVG.appendChild(lineGroup);
    }
}

generatePoints(SVG, buildTriangle(5000));
