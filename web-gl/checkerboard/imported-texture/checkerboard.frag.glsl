precision mediump float;

uniform sampler2D TEXTURE;
varying vec2 FRAGMENT_TEXTURE_COORDINATES;

void main() {
    vec2 normalisedCoordinates = (FRAGMENT_TEXTURE_COORDINATES * vec2(2.0, -2.0)) + vec2(0.5, 0.5);
    gl_FragColor = texture2D(TEXTURE, normalisedCoordinates);
}