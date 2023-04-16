export class Complex {
    constructor(real, imaginary) {
        this.real = real;
        this.imaginary = imaginary;
    }

    /***
     * Generate a new <code>Complex(0,0)</code>
     * @returns {Complex}
     */
    static zero = () => new Complex(0, 0);

    add(other) {
        return new Complex(
            this.real + other.real,
            this.imaginary + other.imaginary
        );
    }

    subtract(other) {
        return new Complex(
            this.real - other.real,
            this.imaginary - other.imaginary
        );
    }

    /***
     * Multiple this Complex with another.<br/>
     * <code>(a + bi)(c + di) = (ac - bd) + (ad + bc)i</code>
     * @param other
     * @returns {Complex}
     */
    multiply(other) {
        return new Complex(
            this.real * other.real - this.imaginary * other.imaginary,
            this.real * other.imaginary + this.imaginary * other.real
        );
    }

    /***
     * <code>(a + bi) / (c + di) = [(ac + bd) / (c^2 + d^2)] + [(bc - ad) / (c^2 + d^2)]i<code>
     * @param other
     */
    divide(other) {
        const otherMagnitudeSquared =
            other.real * other.real + other.imaginary * other.imaginary;
        const r =
            (this.real * other.real + this.imaginary * other.imaginary) /
            otherMagnitudeSquared;
        const i =
            (this.imaginary * other.real - this.real * other.imaginary) /
            otherMagnitudeSquared;

        return new Complex(r, i);
    }

    magnitude() {
        return Math.sqrt(
            this.real * this.real + this.imaginary * this.imaginary
        );
    }

    /***
     * Returns a string in the form <code>a ± bi</code>.
     * @returns {string}
     */
    toString() {
        const operator = this.imaginary < 0 ? '-' : '+';
        return `${this.real} ${operator} ${Math.abs(this.imaginary)}i`;
    }

    /***
     * Both <i>real</i> and <i>imaginary</i> parts are equal.
     * @param other
     * @returns {boolean}
     */
    equals(other) {
        return this.real === other.real && this.imaginary === other.imaginary;
    }
}
