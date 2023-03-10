import { OrbitControls } from "https://unpkg.com/three@0.127.0/examples/jsm/controls/OrbitControls.js";
import * as THREE from "https://unpkg.com/three@0.127.0/build/three.module.js";
import { GLTFLoader } from "https://cdn.jsdelivr.net/npm/three@0.127.0/examples/jsm/loaders/GLTFLoader.js";

const my_canvas = document.getElementById("my-canvas");
const my_container = document.getElementById("my-container");
const scene = new THREE.Scene();
const gltfLoader = new GLTFLoader();
var my;
gltfLoader.load("assets/My_Phung.glb", function (glb) {
    console.log(glb);
    my = glb.scene;
    my.scale.set(0.8, 0.8, 0.8);
    scene.add(my);
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
    width: my_container.offsetWidth,
    height: my_container.offsetHeight,
};

// Renderer gets updated each time window is resized
window.addEventListener("resize", () => {
    sizes.width = my_container.offsetWidth;
    sizes.height = my_container.offsetHeight;

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
camera.position.set(-0.6826728730773773,
    -0.4177265353630172,
    5.035817936543958
);
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, my_canvas);
controls.target.set(0, 0, -1.5);
controls.enablePan = false;
controls.update();

const renderer = new THREE.WebGLRenderer({
    canvas: my_canvas,
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
