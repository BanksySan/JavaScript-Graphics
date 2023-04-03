const canvas = document.getElementById('mandelbrotCanvas')
const ctx = canvas.getContext('2d')
const width = canvas.width
const height = canvas.height

let zoom = 4
let offsetX = -2
let offsetY = -2

let isMouseDown = false
let mouseStartX = 0
let mouseStartY = 0

function drawMandelbrot() {
    const maxIterations = 1000

    for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {
            let real = (x / width) * zoom + offsetX
            let imaginary = (y / height) * zoom + offsetY

            let realTemp = 0
            let imaginaryTemp = 0

            let iterations = 0

            while (iterations < maxIterations) {
                let realSquared = realTemp * realTemp
                let imaginarySquared = imaginaryTemp * imaginaryTemp

                if (realSquared + imaginarySquared > 4) {
                    break
                }

                let temp = realSquared - imaginarySquared + real
                imaginaryTemp = 2 * realTemp * imaginaryTemp + imaginary
                realTemp = temp

                iterations++
            }

            let color =
                iterations === maxIterations
                    ? 0
                    : (iterations * 255) / maxIterations
            ctx.fillStyle = `rgb(${color},${color},${color})`
            ctx.fillRect(x, y, 1, 1)
        }
    }
}

function drawZoomBox(x1, y1, x2, y2) {
    ctx.beginPath()
    ctx.rect(x1, y1, x2 - x1, y2 - y1)
    ctx.strokeStyle = 'red'
    ctx.lineWidth = 1
    ctx.stroke()
}

canvas.addEventListener('mousedown', (event) => {
    isMouseDown = true
    mouseStartX = event.clientX - canvas.getBoundingClientRect().left
    mouseStartY = event.clientY - canvas.getBoundingClientRect().top
})

canvas.addEventListener('mousemove', (event) => {
    if (!isMouseDown) return

    isMouseDown
    const mouseX = event.clientX - canvas.getBoundingClientRect().left
    const mouseY = event.clientY - canvas.getBoundingClientRect().top

    drawMandelbrot()
    drawZoomBox(mouseStartX, mouseStartY, mouseX, mouseY)
})

canvas.addEventListener('mouseup', () => {
    if (!isMouseDown) return
    isMouseDown = false

    const mouseEndX = event.clientX - canvas.getBoundingClientRect().left
    const mouseEndY = event.clientY - canvas.getBoundingClientRect().top

    const xMin = Math.min(mouseStartX, mouseEndX)
    const xMax = Math.max(mouseStartX, mouseEndX)
    const yMin = Math.min(mouseStartY, mouseEndY)
    const yMax = Math.max(mouseStartY, mouseEndY)

    const newWidth = xMax - xMin
    const newHeight = yMax - yMin

    if (newWidth > 0 && newHeight > 0) {
        const newZoom = Math.min(
            (zoom * width) / newWidth,
            (zoom * height) / newHeight
        )

        offsetX += (xMin * zoom) / width
        offsetY += (yMin * zoom) / height
        zoom = newZoom

        drawMandelbrot()
    }
})

drawMandelbrot()
