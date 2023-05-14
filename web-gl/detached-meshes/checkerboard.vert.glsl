// detached-meshes VERTEX
precision mediump float;
attribute vec2 VERTEX_POSITION;

void main() {
    gl_Position = vec4(VERTEX_POSITION.xy, 0.0, 1.0);
}