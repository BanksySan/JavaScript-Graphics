const CANVAS = document.getElementById('canvas')
const WIDTH = CANVAS.width
const HEIGHT = CANVAS.height
const X_RESOLUTION = 100
const Y_RESOLUTION = 100
const X_UNIT = WIDTH / X_RESOLUTION
const Y_UNIT = HEIGHT / Y_RESOLUTION
const CTX = CANVAS.getContext('2d')
const MAX_ITERATIONS = 5

;(function dumpConstants() {
    console.group('Debug')
    console.group('Constants')
    console.dir({
        WIDTH,
        HEIGHT,
        X_RESOLUTION,
        Y_RESOLUTION,
        X_UNIT,
        Y_UNIT,
        MAX_ITERATIONS,
    })
    console.groupEnd()
    console.groupEnd()
})()

function mandelbrotCalculation(z, c) {
    if (!(z instanceof Complex)) {
        throw new Error(`z must be a complex number`)
    }

    if (!(c instanceof Complex)) {
        throw new Error(`c must be a complex number`)
    }

    function f(z, c) {
        if (!(z instanceof Complex)) {
            throw new Error(`z must be a complex number`)
        }

        if (!(c instanceof Complex)) {
            throw new Error(`c must be a complex number`)
        }

        return z.multiply(z).add(c)
    }

    let iteration = 0
    let result = f(z, c)
    do {
        iteration++
        result = f(result, c)
    } while (iteration < MAX_ITERATIONS)
}

const hsl = (hue, saturation, luminosity) =>
    `hsl(${hue}, ${saturation}, ${luminosity})`
const rgb = (red, green, blue) => `rgb(${red}, ${green}, ${blue})`

let black = false
let logs = []
for (let i = 0; i < WIDTH; i += X_UNIT) {
    black = i % (2 * X_UNIT) === 0
    for (let j = 0; j < HEIGHT; j += Y_UNIT) {
        black = !black
        if (black) {
            CTX.fillStyle = rgb(0, 0, 0)
        } else {
            CTX.fillStyle = rgb(255, 255, 255)
        }

        CTX.fillRect(i, j, X_UNIT, Y_UNIT)
        logs.push({ i, j, black })
    }
}

console.table(logs)
