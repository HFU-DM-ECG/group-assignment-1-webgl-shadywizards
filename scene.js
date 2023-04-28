import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/controls/OrbitControls.js';
import * as THREE from 'https://unpkg.com/three@0.120.1/build/three.module.js';
import { GLTFLoader } from 'https://unpkg.com/three@0.120.1/examples/jsm/loaders/GLTFLoader.js';
import { RGBELoader } from 'https://unpkg.com/three@0.120.1/examples/jsm/loaders/RGBELoader.js';


//Referenzieren des Canvas-Elements
const canvasED = document.querySelector('.webgl');

//important variables
let time = 0;

//Boiler-Plate Code
const sizes = {
	width: window.innerWidth,
	height: window.innerHeight
}

const sun = {
	x: 0,
	y: 0,
	z: 0
}

const can1 = {
	x: 3,
	y: 3,
	z: -1
}

//shaders
//sun
const sunVertexShader = await fetch('./shaders/sun_shader.vert').then(response => response.text());
const sunFragmentShader = await fetch('./shaders/sun_shader.frag').then(response => response.text());
const glowVertexShader = await fetch('./shaders/glow_shader.vert').then(response => response.text());
const glowFragmentShader = await fetch('./shaders/glow_shader.frag').then(response => response.text());

//Basiskomponenten erzeugen
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 25);
const renderer = new THREE.WebGL1Renderer({
	canvas: canvasED
});

renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 0.6;
renderer.outputEncoding = THREE.sRGBEncoding;

//HDRI for Scene
new RGBELoader()
	.load("../Assets/mud_road_puresky_4k.hdr", function (texture) {
		texture.mapping = THREE.EquirectangularReflectionMapping;
		scene.background = texture;
		scene.environmentn = texture;
	});

//Temporary Light
const light = new THREE.AmbientLight(0xffffff, 2);
light.position.set(2, 2, 5);
scene.add(light);

//Kamera-Settings
camera.position.set(3.5, 0.5, 5);
scene.add(camera);

//Renderer-Settings
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.outputEncoding = THREE.sRGBEncoding;

//GLTF-Loader for Can
const loader = new GLTFLoader();
loader.load('Assets/Can.gltf', function (glb) {
	console.log(glb);
	const root = glb.scene;
	root.scale.set(0.008, 0.008, 0.008);
	root.position.x = can1.x;
	root.position.y = can1.z;
	root.position.z = can1.y;
	scene.add(root);

}, function (xhr) {
	console.log((xhr.loaded / xhr.total * 100) + "% loaded")
}, function (error) {
	console.log("An error occured")
});

//Sphere
const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);
const sphereMaterial = new THREE.ShaderMaterial({
	vertexShader: sunVertexShader,
	fragmentShader: sunFragmentShader,
	uniforms: {
		time: { value: 0 }
	}
});
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
sphere.position.x = sun.x;
sphere.position.y = sun.z;
sphere.position.z = sun.y;
scene.add(sphere);

//Sphere-glow
const glowGeometry = new THREE.SphereGeometry(1.2, 32, 32);
const glowMaterial = new THREE.ShaderMaterial({
	vertexShader: glowVertexShader,
	fragmentShader: glowFragmentShader,
	side: THREE.BackSide,
	uniforms: {
		time: { value: 0 }
	}
});
const glowSphere = new THREE.Mesh(glowGeometry, glowMaterial);
glowSphere.position.x = sun.x;
glowSphere.position.y = sun.z;
glowSphere.position.z = sun.y;
scene.add(glowSphere);

//Orbitcontrols
const controls = new OrbitControls(camera, renderer.domElement);
controls.autoRotate = true;
controls.enablePan = false;
controls.minDistance = 2;
controls.maxDistance = 10;
controls.maxPolarAngle = Math.PI;
controls.update()

//Szene rendern lassen
function animate() {
	time += 1;
	sphereMaterial.uniforms.time.value = time;
	requestAnimationFrame(animate);
	controls.update();
	renderer.render(scene, camera);

};

animate();