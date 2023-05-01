precision mediump float;
attribute vec3 vertPosition;
attribute vec2 vertTexCoordinate;
varying vec2 fragTexCoordinate;
uniform mat4 worldMatrix;
uniform mat4 viewMatrix;
uniform mat4 projectionMatrix;

void main() {
    fragTexCoordinate = vertTexCoordinate;
    gl_Position = projectionMatrix * viewMatrix * worldMatrix * vec4(vertPosition, 1.0);
}