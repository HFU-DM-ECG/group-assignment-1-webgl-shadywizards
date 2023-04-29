varying vec3 gridPos;
varying vec3 vNormal;
uniform float time;

//missing: 
//- declare eyeVector (at 54:00)


void main() {
    vNormal = normal;
    gridPos = position.xyz;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}