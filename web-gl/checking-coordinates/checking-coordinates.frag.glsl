// Fragmant Shader:  Coordinate System

precision mediump float;

uniform vec2 CANVAS_SIZE;

void main()
{
    vec2 uv = gl_FragCoord.xy / CANVAS_SIZE;
    vec3 color = vec3(uv.xy, 0.0);

    if (
       (uv.x > 0.00 && uv.x < 0.125) ||
       (uv.x > 0.25 && uv.x < 0.375) ||
       (uv.y > 0.50 && uv.y < 0.625) ||
       (uv.y > 0.75 && uv.y < 0.875)
    ) {
        color = vec3(0.0, 0.0, 0.0);
    }

    gl_FragColor = vec4(color, 1.0);

//    vec2 coords = gl_FragCoord.xy / CANVAS_SIZE;
//
//    gl_FragColor = vec4(coords.x, coords.y, 0.0, 1.0);
}
