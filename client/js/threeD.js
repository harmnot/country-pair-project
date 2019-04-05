const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  300,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer();
renderer.setClearColor("rgb(255, 255, 255)");

renderer.setSize(window.innerWidth, window.innerHeight);
document.querySelector(".wrapper").appendChild(renderer.domElement);
const controls = new THREE.OrbitControls(camera);
// camera.position.set(0, 20, 100);
controls.update();
controls.enableZoom = false;
controls.enableKeys = true;

// const axes = new THREE.AxisHelper(50);
// scene.add(axes);
// const gridXZ = new THREE.GridHelper(500, 10);
// scene.add(gridXZ);

const geometry = new THREE.SphereGeometry(2, 20, 10);

const material = new THREE.MeshBasicMaterial({
  side: THREE.DoubleSide,
  map: new THREE.TextureLoader().load("js/peta.jpg")
});

const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

camera.position.z = 6;

//controls.update() must be called after any manual changes to the camera's transform

function animates() {
  requestAnimationFrame(animates);

  // required if controls.enableDamping or controls.autoRotate are set to true
  controls.update();
  sphere.rotation.x += 0.03;
  renderer.render(scene, camera);
}
animates();

window.addEventListener("resize", () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;

  camera.updateProjectionMatrix();
});
