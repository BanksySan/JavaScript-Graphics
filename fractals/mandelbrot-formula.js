function mandelbrot(z, c, maxIterations) {
    if (!(z instanceof Complex))
        throw new Error(
            `Expected z to be Complex but was ${z?.constructor.name}`
        )
    if (!(c instanceof Complex))
        throw new Error(
            `Expected c to be Complex but was ${z?.constructor.name}`
        )

    function f(z, c) {
        return z.multiply(z).add(c)
    }

    const results = new Array(maxIterations)

    results[0] = f(z, c)

    for (let i = 1; i < maxIterations; i++) {
        results[i] = f(results[i - 1], c)
    }

    return results
}
