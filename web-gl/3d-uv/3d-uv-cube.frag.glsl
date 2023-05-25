precision mediump float;

uniform vec2 CANVAS_SIZE;
void main() {
    vec2 uv = gl_FragCoord.xy / CANVAS_SIZE;
    gl_FragColor = vec4(uv, 0.0, 1.0);
}