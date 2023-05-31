precision mediump float;

uniform vec2 CANVAS_SIZE;

varying vec3 vertexColor;

void main() {
    gl_FragColor = vec4(vertexColor, 1.0);
}