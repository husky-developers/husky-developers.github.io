import { OrbitControls } from "https://unpkg.com/three@0.127.0/examples/jsm/controls/OrbitControls.js";
import * as THREE from "https://unpkg.com/three@0.127.0/build/three.module.js";
import { GLTFLoader } from "https://cdn.jsdelivr.net/npm/three@0.127.0/examples/jsm/loaders/GLTFLoader.js";

const clicker_canvas = document.getElementById("clicker-canvas");
const clicker_container = document.getElementById("clicker-container");
const scene = new THREE.Scene();
const gltfLoader = new GLTFLoader();
var clicker_remote;
gltfLoader.load("assets/iClickerRemoteJoin.glb", function (glb) {
  console.log(glb);
  clicker_remote = glb.scene;
  scene.add(clicker_remote);
});

scene.background = new THREE.Color(0x000011);

// Object
// const geometry = new THREE.BoxGeometry(1, 1, 1);
// const material = new THREE.MeshStandardMaterial({ color: 0x0f0f0f });
// const mesh = new THREE.Mesh(geometry, material);
// scene.add(mesh);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
directionalLight.position.set(20, 20, 10);
scene.add(directionalLight);

const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight2.position.set(-10, -10, -20);
scene.add(directionalLight2);

// Sizes
const sizes = {
  width: clicker_container.offsetWidth,
  height: clicker_container.offsetHeight,
};

// Renderer gets updated each time window is resized
window.addEventListener("resize", () => {
  sizes.width = clicker_container.offsetWidth;
  sizes.height = clicker_container.offsetHeight;

  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

// Camera
const camera = new THREE.PerspectiveCamera(
  50,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.set(6,15,15);
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, clicker_canvas);
controls.enableZoom = false;
controls.enablePan = false;


const renderer = new THREE.WebGLRenderer({
  canvas: clicker_canvas,
  alpha: true, // this makes background blank
});

renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.shadowMap.enabled = true;

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
//   laundry_machine.rotation.x += 0.01;
//   laundry_machine.rotation.y += 0.01;
}

animate();
