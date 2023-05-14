precision mediump float;

attribute vec2 VERTEX_POSITION;
varying vec2 FRAGMENT_TEXTURE_COORDINATES;

void main() {
    FRAGMENT_TEXTURE_COORDINATES = VERTEX_POSITION;
    gl_Position = vec4(VERTEX_POSITION, 0.0, 1.0);
}