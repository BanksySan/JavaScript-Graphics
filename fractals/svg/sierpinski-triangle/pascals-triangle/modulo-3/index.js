const SVG = document.getElementById('pascal');
const NS = 'http://www.w3.org/2000/svg';
const MAX_MODULO = 8;
const groups = createGroups(MAX_MODULO);

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

function calculateColour(value, maxModulo) {
    let colour = (BigInt(360) / BigInt(maxModulo - 1)) * value;
    return `hsl(${colour}, 100%, 50%)`;
}

function createGroups(maxModulo) {
    const groups = new Array(maxModulo);
    for (let i = 0; i < groups.length; i++) {
        const g = document.createElementNS(NS, 'g');
        g.id = `modulo-${i}`;
        groups[i] = g;
    }
    return groups;
}

function generatePoints(svg, triangles) {
    console.log(groups.length);
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
            let value = BigInt(triangles[i][j]);

            let modulo = value % BigInt(MAX_MODULO);
            point.setAttribute('x-value', value.toString());
            point.setAttribute('x-modulo', modulo.toString());
            point.setAttribute('fill', calculateColour(modulo, MAX_MODULO));
            groups[modulo].appendChild(point);
        }
    }
    for (let i = 0; i < groups.length; i++) SVG.appendChild(groups[i]);
}

generatePoints(SVG, buildTriangle(1000));
