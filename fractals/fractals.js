import { Complex } from '../helpers/Complex.js';

/***
 * <code>f(z) = z^2 + c</code>
 * @param z Complex result of the iteration.
 * @param c Complex constant, set to the coordinates on the complex plain of the point we are interested in.
 ***/
function f(z, c) {
    (function assertArgs(z, c) {
        if (!(z instanceof Complex))
            throw new Error(
                `Expected z to be Complex but was ${z?.constructor.name}`
            );
        if (!(c instanceof Complex))
            throw new Error(
                `Expected c to be Complex but was ${z?.constructor.name}`
            );
    })(z, c);

    return z.multiply(z).add(c);
}

/***
 * Call <code>f(z,c)</code> for multiple iterations, returning an array of all the results.
 * @param c
 * @param maxIterations
 * @returns {Complex[]}
 */
function mandelbrot(c, maxIterations) {
    const results = new Array(maxIterations);

    results[0] = f(Complex.zero(), c);

    for (let i = 1; i < maxIterations; i++) {
        const prev = results[i - 1];
        results[i] = f(prev, c);
    }

    return results;
}

export { mandelbrot, f };
