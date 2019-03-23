const THREE = require('three');
const OrbitControls = require('three-orbitcontrols');
const scene = require('./scene.js');


/***** Parameters *****/
const INSET_POS = new THREE.Vector2(20, 20);
const INSET_SIZE = new THREE.Vector2(300, 300);
const SIZE = new THREE.Vector2(window.innerWidth, window.innerHeight);


/***** Setup *****/
const renderer = new THREE.WebGLRenderer({'antialias': true});
renderer.setSize(SIZE.x, SIZE.y);
document.body.appendChild(renderer.domElement);


/***** Cameras *****/
const camera = new THREE.PerspectiveCamera(
  75, SIZE.x/SIZE.y,
  0.1, 1000);
const insetCamera = new THREE.PerspectiveCamera(
	75, INSET_SIZE.x/INSET_SIZE.y,
	0.1, 1000);

scene.scene.add(camera);
scene.inset.add(insetCamera);

// Camera Controls
camera.position.z = 2;
controls = new OrbitControls(camera);
controls.enableDamping = true;
controls.dampingFactor = 0.15;
controls.rotateSpeed = 0.15;

/***** Interactivity *****/

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2(1, 1);
const clickFlag = new THREE.Vector2();

function onResize(e) {
	[SIZE.x, SIZE.y] = [window.innerWidth, window.innerHeight];

	camera.aspect = SIZE.x / SIZE.y;
    camera.updateProjectionMatrix();

	renderer.setSize(SIZE.x, SIZE.y);
}

function onMouseMove(e) {
	const screenPos = new THREE.Vector2(e.pageX, SIZE.y - e.pageY);

	screenPos.sub(INSET_POS);
	screenPos.divide(INSET_SIZE);

	screenPos.multiplyScalar(2);
	screenPos.subScalar(1);

	mouse.copy(screenPos);
}

function onMouseDown(e) {
	clickFlag.set(e.pageX, e.pageY);
}

function onMouseUp(e) {
	const screenPos = new THREE.Vector2(e.pageX, e.pageY);
	const distance = clickFlag.distanceTo(screenPos);

	if (distance < 10) {
		scene.addPoint();
	}
}

function raycast() {
	raycaster.setFromCamera(mouse, insetCamera);
	const intersects = raycaster.intersectObject(scene.sphere);

	if (intersects.length > 0) {
		scene.update(intersects[0].point);
	} else {
		scene.update(undefined);
	}
}

function addEventListeners() {
	const canvas = document.getElementsByTagName('canvas')[0];
	canvas.addEventListener('mousedown', onMouseDown);
	canvas.addEventListener('mouseup', onMouseUp);
	canvas.addEventListener('mousemove', onMouseMove);
	window.addEventListener('resize', onResize);
}


/***** Animation Loop ******/
function drawScene() {
	renderer.setClearColor(0x000000, 0);
	renderer.setViewport(0, 0, window.innerWidth, window.innerHeight);
	renderer.render(scene.scene, camera);
}

function drawInset() {
	const [x, y] = [INSET_POS.x, INSET_POS.y];
	const [width, height] = [INSET_SIZE.x, INSET_SIZE.y];

	renderer.setClearColor(0xffffff, 0.15);
	renderer.setScissorTest(true);
	renderer.setScissor(x, y, width, height);
	renderer.setViewport(x, y, width, height);
	renderer.render(scene.inset, insetCamera);
	renderer.setScissorTest(false);
}

function animate() {
	requestAnimationFrame(animate);

	drawScene();
	renderer.clearDepth();
	drawInset();

	controls.update();
	insetCamera.position.copy(camera.position);
	insetCamera.quaternion.copy(camera.quaternion);
	insetCamera.position.setLength(2);

	scene.light.position.copy(camera.position);

	raycast();
}

addEventListeners();
exports.animate = animate;
