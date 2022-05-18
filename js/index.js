const UNIT = 12;

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000022);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();

const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.maxPolarAngle = Math.PI / 2;

function resize () {
  const { innerWidth, innerHeight } = window
  camera.aspect = innerWidth / innerHeight;
  // camera.position.set(UNIT, UNIT * 2, UNIT * 6);
  camera.position.set(0, UNIT * 9, 0);
  camera.lookAt(0, 0, 0);
  camera.updateProjectionMatrix();

  controls.update();

  renderer.setSize(innerWidth, innerHeight);
  renderer.render(scene, camera);
}

function init () {
  scene.add(new THREE.AxesHelper(500));

  /* const groundGeometry = new THREE.BoxGeometry(UNIT * 3, 1, UNIT * 3);
  const groundMaterial = new THREE.MeshBasicMaterial({ color: 0x008800, opacity: 0.25, transparent: true });
  const ground = new THREE.Mesh(groundGeometry, groundMaterial);
  ground.position.set(0, -0.5, 0);
  scene.add(ground);

  const buildingBlock = getBuildingBlock()
  buildingBlock.position.set(0, 1.5, 0);
  scene.add(buildingBlock); */

  const gridPlane = getGridPlane({
    division: 18,
    gridSize: UNIT / 2,
    color: 0xffff00,
  });
  scene.add(gridPlane);

  resize();
  document.body.appendChild(renderer.domElement);
  animate();
}

function animate() {
	requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}

document.addEventListener("DOMContentLoaded", init);
window.addEventListener("resize", resize);
