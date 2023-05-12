// Fragmant Shader:  Coordinate System

precision mediump float;

uniform vec2 CANVAS_SIZE;

void main()
{
    vec2 uv = gl_FragCoord.xy / CANVAS_SIZE;
    vec3 color = vec3(uv.xy, 0.0);

    float stepResultA = step(0.0, uv.x) * step(uv.x, 0.125);
    float stepResultB = step(0.25, uv.x) * step(uv.x, 0.375);
    float stepResultC = step(0.50, uv.x) * step(uv.x, 0.625);
    float stepResultD = step(0.75, uv.x) * step(uv.x, 0.825);

    if (stepResultA + stepResultB + stepResultC + stepResultD != 0.0) {
        color = vec3(0.0, 0.0, 0.0);
    }

    gl_FragColor = vec4(color, 1.0);

//    vec2 coords = gl_FragCoord.xy / CANVAS_SIZE;
//
//    gl_FragColor = vec4(coords.x, coords.y, 0.0, 1.0);
}
