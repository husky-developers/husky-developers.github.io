import { OrbitControls } from "https://unpkg.com/three@0.127.0/examples/jsm/controls/OrbitControls.js";
import * as THREE from "https://unpkg.com/three@0.127.0/build/three.module.js";
import { GLTFLoader } from "https://cdn.jsdelivr.net/npm/three@0.127.0/examples/jsm/loaders/GLTFLoader.js";

const board_canvas = document.getElementById("board-canvas");
const board_container = document.getElementById("board-container");
const scene = new THREE.Scene();
const gltfLoader = new GLTFLoader();
var dartboard;
gltfLoader.load("assets/dartboard.glb", function (glb) {
  console.log(glb);
  dartboard = glb.scene;
  dartboard.scale.set(.8, .8, .8);
  scene.add(dartboard);
});

// Object
// const geometry = new THREE.BoxGeometry(1, 1, 1);
// const material = new THREE.MeshStandardMaterial({ color: 0x0f0f0f });
// const mesh = new THREE.Mesh(geometry, material);
// scene.add(mesh);

scene.background = new THREE.Color(0x000011);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
directionalLight.position.set(20, 20, 10);
scene.add(directionalLight);

const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight2.position.set(-10, -10, -20);
scene.add(directionalLight2);

// Sizes
const sizes = {
  width: board_container.offsetWidth,
  height: board_container.offsetHeight,
};

// Renderer gets updated each time window is resized
window.addEventListener("resize", () => {
  sizes.width = board_container.offsetWidth;
  sizes.height = board_container.offsetHeight;

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
camera.position.set(-3.8564046680268658, 
    2.6125951174978357, 
    -2.07424438975907634
);
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, board_canvas);
controls.enableZoom = false;
controls.enablePan = false;

const renderer = new THREE.WebGLRenderer({
  canvas: board_canvas,
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
