import { describe, it, expect } from 'vitest';
import { Complex } from './Complex.js';

describe('Calling zero()', () => {
    const zero = Complex.zero();
    it('should return 0 real part', () => {
        expect(zero.real).toBe(0);
    });

    it('should return 0 imaginary part', () => {
        expect(zero.imaginary).toBe(0);
    });
});

describe('Creating a new number', () => {
    const expectedReal = Math.random();
    const expectedImaginary = Math.random();

    const actual = new Complex(expectedReal, expectedImaginary);

    it(`should return the expected real part (${expectedReal})`, () => {
        expect(actual.real).toBe(expectedReal);
    });

    it(`should return the expected imaginary part (${expectedImaginary})`, () => {
        expect(actual.imaginary).toBe(expectedImaginary);
    });
});

it('Should correctly calculate the magnitude', () => {
    const dummyReal = Math.random();
    const dummyImaginary = Math.random();
    const expected = Math.sqrt(
        dummyReal * dummyReal + dummyImaginary * dummyImaginary
    );

    const actual = new Complex(dummyReal, dummyImaginary).magnitude();

    console.dir({ dummyReal, dummyImaginary, actual, expected });

    expect(actual).toBe(expected);
});

describe('Equality', () => {
    it('should return true when equal', () => {
        const complex1 = new Complex(Math.random(), Math.random());
        const complex2 = new Complex(complex1.real, complex1.imaginary);

        const actual = complex1.equals(complex2);

        expect(actual).toBe(true);
    });

    it('should return false when real part differs', () => {
        const complex1 = new Complex(Math.random(), Math.random());
        const complex2 = new Complex(complex1.real + 1, complex1.imaginary);

        const actual = complex1.equals(complex2);

        expect(actual).toBe(false);
    });

    it('should return true when equal', () => {
        const complex1 = new Complex(Math.random(), Math.random());
        const complex2 = new Complex(complex1.real, complex1.imaginary + 1);

        const actual = complex1.equals(complex2);

        expect(actual).toBe(false);
    });
});

describe('Arithmetic', () => {
    const complex1 = new Complex(6, 3);
    const complex2 = new Complex(7, -5);

    describe('Add', () => {
        const expectedReal = complex1.real + complex2.real;
        const expectedImaginary = complex1.imaginary + complex2.imaginary;

        const actual = complex1.add(complex2);

        it(`Real part should be ${expectedReal}`, () => {
            expect(actual.real).toBe(expectedReal);
        });

        it(`Imaginary part should be ${expectedImaginary}`, () => {
            expect(actual.imaginary).toBe(expectedImaginary);
        });
    });

    describe('Subtract', () => {
        const expectedReal = complex1.real - complex2.real;
        const expectedImaginary = complex1.imaginary - complex2.imaginary;

        const actual = complex1.subtract(complex2);

        it(`Real part should be ${expectedReal}`, () => {
            expect(actual.real).toBe(expectedReal);
        });

        it(`Imaginary part should be ${expectedImaginary}`, () => {
            expect(actual.imaginary).toBe(expectedImaginary);
        });
    });

    describe('Multiply', () => {
        const expectedReal = complex1.real + complex2.real;
        const expectedImaginary = complex1.imaginary + complex2.imaginary;

        const actual = complex1.add(complex2);

        it(`Real part should be ${expectedReal}`, () => {
            expect(actual.real).toBe(expectedReal);
        });

        it(`Imaginary part should be ${expectedImaginary}`, () => {
            expect(actual.imaginary).toBe(expectedImaginary);
        });
    });

    describe('Divide', () => {
        const expectedReal = 27 / 74;
        const expectedImaginary = 51 / 74;

        const actual = complex1.divide(complex2);
        it(`should have correct real`, () => {
            expect(actual.real).toBe(expectedReal);
        });

        it(`should have correct imaginary`, () => {
            expect(actual.imaginary).toBe(expectedImaginary);
        });
    });

    describe('toTheta() should return correct angle.', () => {});
});

describe('toString()', () => {
    it('for positive imaginary part', () => {
        const dummyReal = 1;
        const dummyImaginary = 1;

        const expected = `${dummyReal} + ${dummyImaginary}i`;

        const actual = new Complex(dummyReal, dummyImaginary).toString();

        expect(actual).toBe(expected);
    });

    it('for zero imaginary part', () => {
        const dummyReal = 1;
        const dummyImaginary = 0;

        const expected = `${dummyReal} + ${dummyImaginary}i`;

        const actual = new Complex(dummyReal, dummyImaginary).toString();

        expect(actual).toBe(expected);
    });

    it('for negative imaginary part', () => {
        const dummyReal = 1;
        const dummyImaginary = -1;

        const expected = `${dummyReal} - ${Math.abs(dummyImaginary)}i`;

        const actual = new Complex(dummyReal, dummyImaginary).toString();

        expect(actual).toBe(expected);
    });
});
