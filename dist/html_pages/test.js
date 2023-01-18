import { OrbitControls } from "https://unpkg.com/three@0.127.0/examples/jsm/controls/OrbitControls.js";
import * as THREE from "https://unpkg.com/three@0.127.0/build/three.module.js";
import { GLTFLoader } from "https://cdn.jsdelivr.net/npm/three@0.127.0/examples/jsm/loaders/GLTFLoader.js";

// Load objects
const canvas = document.querySelector(".webgl");
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x73D7FF);
const gltfLoader = new GLTFLoader();

var env;
gltfLoader.load("../assets/Environment.glb", function (glb) {
    env = glb.scene
    env.position.set(0, 0, 0);
    scene.add(env)
});

var roc;
gltfLoader.load("../assets/Rocket.glb", function (glb) {
    console.log(glb);
    roc = glb.scene;
    roc.position.set(0, 0, 0);
    scene.add(roc);
});

var roc_ho;
gltfLoader.load("../assets/Rocket_Holder.glb", function (glb) {
    console.log(glb);
    roc_ho = glb.scene;
    roc_ho.position.set(0, 0, 0);
    scene.add(roc_ho);
});
var launch_room;
gltfLoader.load("../assets/Launch_room.glb", function (glb) {
    console.log(glb);
    launch_room = glb.scene;
    launch_room.position.set(0, 0, 0);
    scene.add(launch_room);
});

// Lights
const directionalLight = new THREE.DirectionalLight(0xFFFFFF, 2.5);
directionalLight.position.set(-52.5, 80, -100)
directionalLight.target.position.set(-52.5, 0, -100)
scene.add(directionalLight);
scene.add(directionalLight.target)

const ambientLight = new THREE.AmbientLight(0xFFFFFF, 1);
scene.add(ambientLight);

const spotLight = new THREE.SpotLight(0xFFFFFF, 1, 0, Math.PI / 2, .75);
spotLight.position.set(-105, 80, -160)
spotLight.target.position.set(-105, 50, -200)
scene.add(spotLight)
scene.add(spotLight.target)

// Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
};

// Renderer gets updated each time window is resized
window.addEventListener("resize", () => {
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();

    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

// Camera
const camera = new THREE.PerspectiveCamera(
    60,
    sizes.width / sizes.height,
    0.1,
    500
);
camera.position.set(
    127.4197346173197, 
    8.852875995173607, 
    -115.69718154158252);
console.log(camera.position);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.target.set(
    126.197346173197, 
    8.852875995173607, 
    -114.59718154158252);
console.log(controls.target);
// controls.maxDistance = 0.01;
controls.enableZoom = false;
controls.update();

// Fog
scene.fog = new THREE.Fog()

const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true, // this makes background blank
});

renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.shadowMap.enabled = true;

// Rocket Acceleration

let pos = []
for (let i = 0; i < 10; i += 0.01) {
    pos.push(0.005 * i * i);
};

// Smoke Function

let j = 0;
let smoke = [];

function createParticle(a, b) {
    let particle;
    gltfLoader.load("../assets/small_smoke.glb", function (glb) {
        particle = glb.scene
        particle.scale.set(2, 2, 2)
        particle.position.set(roc.position.x + a, roc.position.y + 8, roc.position.z + b);
        scene.add(particle)
        smoke.push(particle);
    });
}

function expandSmoke() {
    for (let particle of smoke) {
        let factor = Math.random();
        let currentSize = particle.scale;
        let newX = currentSize.x + factor;
        let newY = currentSize.y + factor / 2;
        let newZ = currentSize.z + factor;
        particle.scale.set(newX, newY, newZ);
    }
}

// Change Camera Position to Lauch, and Shake
// function launchCamera() {
//     controls.enabled = false
//     camera.position.x = -90
//     camera.position.y = 80
//     camera.position.z = -210
//     camera.lookAt(roc.position)
// }

// function restoreCamera() {
//     controls.enabled = true
//     camera.position.set(
//         0.005107356524073513,
//         7.002503176031226,
//         0.008224902375876341);
//     controls.target.set(0, 7.001, 0);
//     controls.maxDistance = 0.01;
//     controls.enableZoom = false;
//     controls.update();
// }

// function CameraRight() {
//     camera.position.z -= 0.1
//     camera.position.x -= 0.1
// }

// function CameraLeft() {
//     camera.position.z += 0.2
//     camera.position.x += 0.2
// }

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    roc.position.y += pos[j]
    j += 1

    // if (240 < j && j < 840) {
    //     // move camera
    //     launchCamera()
    //     if (j % 6 == 0) {
    //         CameraRight()
    //     }
    //     else if (j % 6 == 2) {
    //         CameraLeft()
    //     }
    //     else if (j % 6 == 4) {
    //         CameraRight()
    //     }
    // }
    // else if (j == 845) {
    //     restoreCamera()
    // };

    if (j > 140 && j % 5 === 0) {
        createParticle(0, Math.random() * 5);
        createParticle(0, Math.random * -5);
        createParticle(Math.random() * 5, 0);
        createParticle(Math.random() * -5, 0);
        createParticle(Math.random() * 5, Math.random() * 5);
        createParticle(Math.random() * 5, Math.random() * -5);
        createParticle(Math.random() * -5, Math.random() * -5);
        createParticle(Math.random() * -5, Math.random() * 5);
        expandSmoke();
    };
};

animate();