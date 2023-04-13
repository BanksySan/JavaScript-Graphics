export class Complex {
    constructor(real, imaginary) {
        this.real = real;
        this.imaginary = imaginary;
    }

    static zero = () => new Complex(0, 0);

    add(c) {
        return new Complex(this.real + c.real, this.imaginary + c.imaginary);
    }

    subtract(c) {
        return new Complex(this.real - c.real, this.imaginary - c.imaginary);
    }

    multiply(c) {
        return new Complex(
            this.real * c.real - this.imaginary * c.imaginary,
            this.real * c.imaginary + this.imaginary * c.real
        );
    }

    magnitude() {
        return Math.sqrt(
            this.real * this.real + this.imaginary * this.imaginary
        );
    }

    toString() {
        return `${this.real} + ${this.imaginary}i`;
    }
}
