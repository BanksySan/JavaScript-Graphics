function magnitude(p1, p2) {
    const dx = p2.x - p1.x;
    const dy = p2.y - p1.y;
    const dz = p2.z - p1.z;
    return Math.sqrt(dx * dx + dy * dy + dz * dz);
}

/***
 * Lerp formula:  <code>P(t) = A + t(B - A)</code>
 * @param p1 First Point
 * @param p2 Second Point
 * @param t Percentage through vector
 * @returns DOMPoint
 */
function lerp(p1, p2, t) {
    const lerpScalar = (a, b, t) => a + t * (b - a);
    const x = lerpScalar(p1.x, p2.x, t);
    const y = lerpScalar(p1.y, p2.y, t);
    const z = lerpScalar(p1.z, p2.z, t);

    return new DOMPoint(x, y, z);
}

function unit(p1, p2) {
    const m = magnitude(p1, p2);
    return new DOMPoint(
        (p2.x - p1.x) / m,
        (p2.y - p1.y) / m,
        (p2.z - p1.z) / m
    );
}

function add(p1, p2) {
    return new DOMPoint(p1.x + p2.x, p1.y + p2.y, p1.z + p2.z);
}

function subtract(p1, p2) {
    return new DOMPoint(p1.x - p2.x, p1.y - p2.y, p1.z - p2.z);
}

export { magnitude, lerp };
