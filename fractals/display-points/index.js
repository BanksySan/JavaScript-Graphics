const NS = 'http://www.w3.org/2000/svg'
const SVG = document.getElementById('mandelbrot-display')
const X_AXIS_COLOR = 'blue'
const Y_AXIS_COLOR = 'green'
const MAX_ITERATIONS = 5
const TICK_SPACING = 0.1
const VIEW_BOX = {
    x: SVG.viewBox.baseVal.x,
    y: SVG.viewBox.baseVal.y,
    width: SVG.viewBox.baseVal.width,
    height: SVG.viewBox.baseVal.height,
}

function drawLayout() {
    function drawAxis(id, x1, y1, x2, y2, stroke, strokeWidth) {
        const axis = document.createElementNS(NS, 'line')

        axis.setAttribute('x1', x1.toString())
        axis.setAttribute('y1', y1.toString())
        axis.setAttribute('x2', x2.toString())
        axis.setAttribute('y2', y2.toString())
        axis.setAttribute('stroke', stroke)
        axis.setAttribute('stroke-width', strokeWidth)

        SVG.appendChild(axis)
    }

    drawAxis(
        'x-axis',
        VIEW_BOX.x,
        0,
        VIEW_BOX.width + VIEW_BOX.x,
        0,
        X_AXIS_COLOR,
        0.01
    )
    drawAxis('y-axis', 0, VIEW_BOX.y, 0, VIEW_BOX.height, Y_AXIS_COLOR, 0.01)

    for (
        let i = VIEW_BOX.x;
        i < VIEW_BOX.width + VIEW_BOX.x;
        i += TICK_SPACING
    ) {
        const tick = document.createElementNS(NS, 'line')
        tick.setAttribute('x1', i.toString())
        tick.setAttribute('y1', '-0.05')
        tick.setAttribute('x2', i.toString())
        tick.setAttribute('y2', '0.05')
        tick.setAttribute('stroke', X_AXIS_COLOR)
        tick.setAttribute('stroke-width', '0.005')
        tick.id = `x-tick-${i}`
        SVG.appendChild(tick)
    }

    for (
        let i = VIEW_BOX.y;
        i < VIEW_BOX.height + VIEW_BOX.y;
        i += TICK_SPACING
    ) {
        const tick = document.createElementNS(NS, 'line')
        tick.setAttribute('x1', '-0.05')
        tick.setAttribute('y1', i.toString())
        tick.setAttribute('x2', '0.05')
        tick.setAttribute('y2', i.toString())
        tick.setAttribute('stroke', Y_AXIS_COLOR)
        tick.setAttribute('stroke-width', '0.005')
        tick.id = `y-tick-${i}`
        SVG.appendChild(tick)
    }
}

function addEventListeners() {
    let isMouseDown = false

    SVG.addEventListener('mousedown', function () {
        isMouseDown = true
    })
    SVG.addEventListener('mouseup', function () {
        isMouseDown = false
    })

    SVG.addEventListener('mousemove', (event) => {
        if (!isMouseDown) return
        drawIterations(event.clientX, event.clientY)
    })
}

addEventListeners()
drawLayout()

const cursorDot = document.createElementNS(NS, 'circle')
cursorDot.setAttribute('r', '0.1')
cursorDot.setAttribute('fill', 'red')
SVG.appendChild(cursorDot)

function drawIterations(clickX, clickY) {
    const svgPoint = SVG.createSVGPoint()
    svgPoint.x = clickX
    svgPoint.y = clickY

    const domainPoint = svgPoint.matrixTransform(SVG.getScreenCTM().inverse())
    console.log(JSON.stringify({ x: domainPoint.x, y: domainPoint.y }))
    cursorDot.setAttribute('cx', domainPoint.x.toString())
    cursorDot.setAttribute('cy', domainPoint.y.toString())
}
