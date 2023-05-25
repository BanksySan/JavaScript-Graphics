precision mediump float;

attribute vec3 VERTEX_POSITION;

void main() {
    gl_Position = vec4(VERTEX_POSITION, 1.0);
}