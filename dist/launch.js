import { OrbitControls } from "https://unpkg.com/three@0.127.0/examples/jsm/controls/OrbitControls.js";
import * as THREE from "https://unpkg.com/three@0.127.0/build/three.module.js";
import { GLTFLoader } from "https://cdn.jsdelivr.net/npm/three@0.127.0/examples/jsm/loaders/GLTFLoader.js";

// Load objects ----------------------------------------------------------------------------------
const canvas = document.querySelector(".webgl");
const afterCanvas = document.querySelector(".afterLaunch");
const directions = document.querySelector(".directions");
const scene = new THREE.Scene();
// scene.background = new THREE.Color(0x212429);
const gltfLoader = new GLTFLoader();

var env;
gltfLoader.load("assets/3D_objects/EnvironmentLaunchRoom.glb", function (glb) {
  env = glb.scene;
  env.position.set(0, 0, 0);
  scene.add(env);
});

var roc;
gltfLoader.load("assets/3D_objects/Rocket.glb", function (glb) {
  console.log(glb);
  roc = glb.scene;
  roc.position.set(0, 0, 0);
  scene.add(roc);
});

var roc_ho;
gltfLoader.load("assets/3D_objects/Rocket_Holder.glb", function (glb) {
  console.log(glb);
  roc_ho = glb.scene;
  roc_ho.position.set(0, 0, 0);
  scene.add(roc_ho);
});

var button;
gltfLoader.load("assets/3D_objects/LaunchButton.glb", function (glb) {
  console.log(glb);
  button = glb.scene;
  button.position.set(0, 0, 0);
  scene.add(button);
});

// Lights ----------------------------------------------------------------------------------------
const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 5);
directionalLight.position.set(-52.5, 80, -100);
directionalLight.target.position.set(-52.5, 0, -100);
scene.add(directionalLight);
scene.add(directionalLight.target);

const spotLight2 = new THREE.SpotLight(0xffffff, 1, 0, Math.PI / 2, 1.75);
spotLight2.position.set(-105, 80, -160);
spotLight2.target.position.set(-105, 50, -200);
scene.add(spotLight2);
scene.add(spotLight2.target);

const spotLight3 = new THREE.SpotLight(0xffe6ba, 5, 0, Math.PI / 2, 1.75);
spotLight3.position.set(0, 10, 0);
scene.add(spotLight3);

const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight2.position.set(
  127.4197346173197,
  8.852875995173607,
  -115.69718154158252
);
directionalLight.target.position.set(127.4197346173197, 0, -120.69718154158252);
scene.add(directionalLight2);
scene.add(directionalLight2.target);

// Sizes -----------------------------------------------------------------------------------------
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
  50,
  sizes.width / sizes.height,
  0.1,
  500
);

camera.position.set(127.4197346173197, 8.852875995173607, -115.69718154158252);

// Controls --------------------------------------------------------------------------------------
const controls = new OrbitControls(camera, canvas);
controls.target.set(126.197346173197, 8.852875995173607, -114.59718154158252);
controls.enableZoom = false;
controls.update();

// Fog
scene.fog = new THREE.FogExp2(0xd3d3d3, 0.0025);

const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  alpha: true, // this makes background blank
});

renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.shadowMap.enabled = true;

// Rocket Acceleration ---------------------------------------------------------------------------

let pos = [];
for (let i = 0; i < 10; i += 0.01) {
  pos.push(0.0015 * i * i * i);
}

// Smoke Function ----------------------------------------------------------------------------------

let j = 0;
let smoke = [];
let smokebackground = [];
let smokeTail = [];

function onFloor(particle) {
  return particle.position.y < 5;
}

function isFar(particle) {
  return (
    particle.position.x < -50 ||
    particle.position.x > 50 ||
    particle.position.z < -50 ||
    particle.position.z > 50
  );
}

function createParticleInitial(a, b) {
  let particle;
  gltfLoader.load("assets/3D_objects/small_smoke.glb", function (glb) {
    particle = glb.scene;
    particle.scale.set(2, 2, 2);
    particle.position.set(
      roc.position.x + a,
      roc.position.y + 10,
      roc.position.z + b
    );
    scene.add(particle);
    smoke.push(particle);

    // limits to only 160 particles on map at any point
    if (smoke.length > 160) {
      scene.remove(smoke.shift());
    }
    // particle.color = new THREE.Color(0x000000);
  });
}

function moveParticlesInitial() {
  for (let i = 0; i < smoke.length; i++) {
    let particle = smoke[i];

    // modifiers 1-2
    let randx = (Math.random() * 400) / (300 + smoke.length);
    let randy = (Math.random() * 400) / (300 + smoke.length);
    let randz = (Math.random() * 400) / (300 + smoke.length);

    let currentPosition = particle.position;
    let currentScale = particle.scale;

    let newX, newY, newZ;

    let newscale = 1 + randx / 5;

    if (isFar(particle)) {
      newscale += 0.2;
    } else {
      newX = currentPosition.x * (randx / 10 + 1.15);
      newY = currentPosition.y;
      newZ = currentPosition.z * (randz / 10 + 1.15);
    }

    if (onFloor(particle)) {
      newY += 1;
    } else {
      newY -= 2;
    }

    particle.position.set(newX, newY, newZ);

    particle.scale.set(
      currentScale.x * newscale,
      currentScale.y * newscale,
      currentScale.z * newscale
    );
  }
}

function createParticleAfter(a, b) {
  let particle;
  gltfLoader.load("assets/3D_objects/small_smoke.glb", function (glb) {
    particle = glb.scene;
    particle.scale.set(2, 3, 2);
    particle.position.set(
      roc.position.x + a,
      roc.position.y + 10,
      roc.position.z + b
    );
    scene.add(particle);
    // particle.color.setHex(0xf0f000);
    smokeTail.push(particle);

    // limits to only 8 particles on map at any point
    if (smokeTail.length > 8) {
      scene.remove(smokeTail.shift());
    }
    // particle.color = new THREE.Color(0x000000);
  });
}

function moveParticlesAfter() {
  for (let i = 0; i < smokeTail.length; i++) {
    let particle = smokeTail[i];

    // modifiers 1-2
    let randx = Math.random();
    let randy = Math.random();
    let randz = Math.random();

    let currentPosition = particle.position;
    let currentScale = particle.scale;

    let newX = currentPosition.x * (randx / 10 + 1);
    let newY = currentPosition.y;
    let newZ = currentPosition.z * (randz / 10 + 1);

    let newscale = 1 + randx / 15;

    particle.position.set(newX, newY, newZ);

    particle.scale.set(
      currentScale.x * newscale,
      currentScale.y * newscale,
      currentScale.z * newscale
    );
  }
  for (let i = 0; i < smoke.length; i++) {
    let particle = smoke[i];

    // modifiers 1-2
    let randx = Math.random();
    let randy = Math.random();
    let randz = Math.random();

    let currentPosition = particle.position;
    let currentScale = particle.scale;

    let newX = currentPosition.x * (randx / 100 + 1);
    let newY = currentPosition.y + 0.1;
    let newZ = currentPosition.z * (randz / 100 + 1);

    let newscale = 1 + randx / 100;

    particle.position.set(newX, newY, newZ);

    particle.scale.set(
      currentScale.x * newscale,
      currentScale.y * newscale,
      currentScale.z * newscale
    );
  }
}

function expandSmoke(state) {
  // Add smoke intial
  if (state % 15 == 0) {
    if (state < 800) {
      createParticleInitial(Math.random(), Math.random());
      createParticleInitial(Math.random() * -1, Math.random() * -1);
      createParticleInitial(Math.random() * -1, Math.random());
      createParticleInitial(Math.random(), Math.random() * -1);
    }
  }

  if (state % 5 == 0) {
    moveParticlesInitial();
    // add smoke after launch
    if (state > 600 && state < 1250) {
      createParticleAfter(0, 0);
      moveParticlesAfter();
    }
  }
}

// After Launch -----------------------------------------------------------------
function restoreCamera() {
  fadeIn(afterCanvas, 5000);
  canvas.style.display = "none";
}

function fadeIn(element, duration) {
  element.style.opacity = 0;
  element.style.display = "flex";

  let start = null;

  function step(timestamp) {
    if (!start) start = timestamp;
    const progress = timestamp - start;
    element.style.opacity = progress / duration;
    if (progress < duration) {
      window.requestAnimationFrame(step);
    } else {
      typeWriter(directions, "<p> scroll to get started </p>", 100);
      setTimeout(resetType, 4000);
    }
  }

  window.requestAnimationFrame(step);
}

function typeWriter(element, text, speed) {
  let i = 0;

  function type() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }

  type();
}

function resetType() {
  directions.textContent = "scroll to get started";
  directions.style.fontFamily = "";
}

// Camera Shake --------------------------------------------------------------------------------------

function shakeCamera(j) {
  controls.enabled = false;
  camera.lookAt(roc.position);

  let randomizer = Math.random() > 0.6;

  if (j % 3 == 0 && randomizer) {
    // CameraRight
    camera.position.z -= (Math.random() * 100) / j;
    camera.position.x -= (Math.random() * 100) / j;
  } else if (j % 3 == 1 && randomizer) {
    // CameraLeft
    camera.position.z += (Math.random() * 200) / j;
    camera.position.x += (Math.random() * 200) / j;
  } else {
    // CameraCenter
    camera.position.set(127, 9, -116);
  }
}

// Launch --------------------------------------------------------------------------------------------

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  j += 1;
  if (j >= 320) {
    // move rocket
    if (roc_ho.rotation.x < 0.2) {
      roc_ho.rotation.x += 0.001;
    }
    roc.position.y += pos[j - 320];
    spotLight3.position.y += pos[j - 320];

    if (j > 375 && j < 1250) {
      expandSmoke(j);
      shakeCamera(j);
    } else if (j == 1250) {
      // stop everything
      renderer.setAnimationLoop(null);
      restoreCamera();
    }
  }
}

animate();
