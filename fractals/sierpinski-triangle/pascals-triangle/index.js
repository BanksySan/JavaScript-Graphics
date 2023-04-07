const SVG = document.getElementById('pascal');
const NS = 'http://www.w3.org/2000/svg';

function buildTriangle(n) {
    const triangle = new Array(n);

    for (let i = 0; i < n + 1; i++) {
        const nextLine = new Array(i + 1);
        nextLine[0] = BigInt(1);
        for (let j = 1; j < nextLine.length - 1; j++) {
            const prevLine = triangle[i - 1];
            nextLine[j] = BigInt(prevLine[j - 1]) + BigInt(prevLine[j]);
        }
        nextLine[nextLine.length - 1] = BigInt(1);
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
            point.setAttribute(
                'fill',
                triangles[i][j] % BigInt(2) === BigInt(0) ? 'black' : 'white'
            );
            lineGroup.appendChild(point);
        }

        SVG.appendChild(lineGroup);
    }
}

generatePoints(SVG, buildTriangle(500));
