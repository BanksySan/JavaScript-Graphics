precision mediump float;

#define  PI 3.141592

uniform vec2 CANVAS_SIZE;

void main() {
    vec2 uv = gl_FragCoord.xy / CANVAS_SIZE;
    float waveY = sin(uv.x * PI * 4.0 ) / 3.0 + 0.5;
    float d = distance(uv, vec2(uv.x, waveY)) * 5.0;

    gl_FragColor = mix(vec4(uv, 0.0, 1.0), vec4(0.0, 0.0, 0.0, 1.0), d);
}