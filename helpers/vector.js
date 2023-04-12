export function magnitude(points) {
    let rollingSum = 0;

    for (let i = 0; i < points.length; i++) {
        rollingSum += points[i] * points[i];
    }

    return Math.sqrt(rollingSum);
}
