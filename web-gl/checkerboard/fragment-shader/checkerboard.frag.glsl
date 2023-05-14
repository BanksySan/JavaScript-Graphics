precision mediump float;

uniform vec2 CANVAS_SIZE;
uniform vec2 CELL_COUNT;
uniform vec4 COLOR_1;
uniform vec4 COLOR_2;

void main() {
    vec2 boardCoordinates = floor(gl_FragCoord.xy * CELL_COUNT.xy / CANVAS_SIZE);

    float xMod = mod(boardCoordinates.x, 2.0);
    float yMod = mod(boardCoordinates.y, 2.0);
    float state = mod(xMod + yMod, 2.0);

    gl_FragColor = mix(COLOR_1, COLOR_2, state);
}