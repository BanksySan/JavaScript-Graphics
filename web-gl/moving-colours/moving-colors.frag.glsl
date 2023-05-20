precision mediump float;

#define  PI 3.141592

uniform vec2 CANVAS_SIZE;
uniform float NOW;
uniform float SPEED;

float hue2rgb(float hue, float saturation, float luminosity){
    if(luminosity < 0.0) luminosity += 1.0;
    if(luminosity > 1.0) luminosity -= 1.0;
    if(luminosity < 1.0/6.0) return hue + (saturation - hue) * 6.0 * luminosity;
    if(luminosity < 1.0/2.0) return saturation;
    if(luminosity < 2.0/3.0) return hue + (saturation - hue) * (2.0/3.0 - luminosity) * 6.0;
    return hue;
}

vec3 hsl2rgb(vec3 color) {
    float hue = color.x;
    float saturation = color.y;
    float luminosity = color.z;

    float r, g, b;

    if (saturation == 0.0) {
        r = g = b = luminosity; // achromatic
    } else {
        float q = luminosity < 0.5 ? luminosity * (1.0 + saturation) : luminosity + saturation - luminosity * saturation;
        float p = 2.0 * luminosity - q;
        r = hue2rgb(p, q, hue + 1.0/3.0);
        g = hue2rgb(p, q, hue);
        b = hue2rgb(p, q, hue - 1.0/3.0);
    }
    return vec3(r, g, b);
}

void main() {
    vec2 uv = gl_FragCoord.xy / CANVAS_SIZE;

    float positionX = uv.x + NOW * SPEED;
    float positionY = uv.y + NOW * SPEED;
    vec3 color = hsl2rgb(vec3(fract(positionX + positionY), 1.0, 0.5)) ;
    gl_FragColor = vec4(color, 1.0);
}
