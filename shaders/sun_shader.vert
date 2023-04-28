varying vec3 gridPos;
uniform float time;


void main() {
    gridPos = position.xyz;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}