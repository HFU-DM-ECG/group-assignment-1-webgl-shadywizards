import * as THREE from 'https://unpkg.com/three@0.120.1/build/three.module.js'
import {GLTFLoader} from 'https://unpkg.com/three@0.120.1/examples/jsm/loaders/GLTFLoader.js'
import {OrbitControls} from 'https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/controls/OrbitControls.js';
import {RGBELoader} from 'https://unpkg.com/three@0.120.1/examples/jsm/loaders/RGBELoader.js'

//Referenzieren des Canvas-Elements
const canvasED = document.querySelector('.webgl');

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

//Basiskomponenten erzeugen
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, sizes.width/sizes.height, 0.1, 25);
const renderer = new THREE.WebGL1Renderer({
	canvas: canvasED
});

renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 0.6;
renderer.outputEncoding = THREE.sRGBEncoding;

//HDRI for Scene
new RGBELoader()
	.load("../Assets/mud_road_puresky_4k.hdr", function (texture){
		texture.mapping = THREE.EquirectangularReflectionMapping;
		scene.background = texture;
		scene.environmentn = texture;
	});

//Temporary Light
const light = new THREE.AmbientLight(0xffffff, 2);
light.position.set(2, 2, 5);
scene.add(light);

//Kamera-Settings
camera.position.set(3.5,0.5,5);
scene.add(camera);

//Renderer-Settings
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.outputEncoding = THREE.sRGBEncoding;

//GLTF-Loader for Can
const loader = new GLTFLoader();
loader.load('Assets/Can.gltf', function (glb){
	console.log(glb);
	const root = glb.scene;
	root.scale.set(0.008,0.008,0.008);
	root.position.x = can1.x;
	root.position.y = can1.z;
	root.position.z = can1.y;
	scene.add(root);

}, function(xhr){
	console.log((xhr.loaded/xhr.total * 100) + "% loaded")
}, function(error){
	console.log("An error occured")
});

//Sphere
const geometry = new THREE.SphereGeometry( 1, 32, 32 );
const material = new THREE.MeshBasicMaterial( { color: 0x123456 } );
const sphere = new THREE.Mesh( geometry, material );
sphere.position.x = sun.x;
sphere.position.y = sun.z;
sphere.position.z = sun.y;
scene.add(sphere);

//Orbitcontrols
const controls = new OrbitControls( camera, renderer.domElement );
controls.autoRotate = true;
controls.enablePan = false;
controls.minDistance = 2;
controls.maxDistance = 10;
controls.maxPolarAngle = Math.PI;
controls.update()

//Szene rendern lassen
function animate(){
	requestAnimationFrame(animate);
	controls.update();
	renderer.render(scene, camera);
};

animate();