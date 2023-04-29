varying vec3 pos;
uniform float time;

vec3 brightnessToColor(float b) {
    b *= 0.25;
    return (vec3(b, b*b, b*b*b*b) / 0.25) * 0.8;
}

void main() {
    float radial = 1. - pos.z;
    radial *= radial;

    float brightness = 1. + radial*0.83;


    gl_FragColor.rgb = brightnessToColor(brightness)*radial;

    gl_FragColor.a = radial;
}