// Circle:  Fragment

precision mediump float;
uniform vec2 CANVAS_SIZE;


void main() {
    vec2 uv = gl_FragCoord.xy / CANVAS_SIZE;
    uv.xy -= 0.5;
    vec2 centre = vec2(0,0);
    float d = distance(uv.xy, centre);
    if (d < 0.5 && d > 0.25) {
        gl_FragColor = vec4(0.0, .0, .0, .0);
    } else {
        gl_FragColor = vec4(uv.x, uv.y, 0.0, 1.0);
    }
}