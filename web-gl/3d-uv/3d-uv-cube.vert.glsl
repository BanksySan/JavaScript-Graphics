precision mediump float;

attribute vec3 VERTEX_POSITION;
uniform float NOW;
uniform float SPEED;

#define PI 3.141592
#define TWO_PI 6.283184

void main() {
    float angle = TWO_PI * (NOW / 1000.0) * SPEED;
    mat3 rotationZ = mat3(
        cos(angle), -sin(angle), 0.0,
        sin(angle), cos(angle), 0.0,
        0.0, 0.0, 1.0
    );

    mat3 rotationY = mat3(
        cos(angle), 0, sin(angle),
        0, 1, 0,
        -sin(angle), 0, cos(angle)
    ) / 2.0;

    vec3 position = VERTEX_POSITION * rotationY * rotationZ;

    gl_Position = vec4(position, 1.0);
}