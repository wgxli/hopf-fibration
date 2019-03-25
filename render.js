const THREE = require('three');
const OrbitControls = require('three-orbitcontrols');
const scene = require('./scene.js');


/***** Parameters *****/
const INSET_POS = new THREE.Vector2(20, 20);
const INSET_SIZE = new THREE.Vector2(300, 300);

const SCENE_POS = new THREE.Vector2(0, 0);
const SCENE_SIZE = new THREE.Vector2(window.innerWidth, window.innerHeight);

const SIZE = SCENE_SIZE.clone();


/***** Setup *****/
const renderer = new THREE.WebGLRenderer({'antialias': true});
renderer.setPixelRatio(window.devicePixelRatio ? window.devicePixelRatio : 1)
renderer.setSize(SIZE.x, SIZE.y);
document.body.appendChild(renderer.domElement);


/***** Cameras *****/
const camera = new THREE.PerspectiveCamera(
  75, SCENE_SIZE.x/SCENE_SIZE.y,
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
controls.enablePan = false;

/***** Interactivity *****/

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2(1, 1);
const clickFlag = new THREE.Vector2();
var mobileFlag = false;

function onResize(e) {
	[SIZE.x, SIZE.y] = [window.innerWidth, window.innerHeight];

	const insetSize = Math.round(0.4 * Math.min(SIZE.x, SIZE.y));

	if (insetSize > 200) {
		SCENE_POS.set(0, 0);
		SCENE_SIZE.copy(SIZE);

		INSET_SIZE.set(insetSize, insetSize);
		INSET_POS.set(20, 20);
	} else if (SIZE.y < SIZE.x) {
		const insetWidth = Math.round(Math.min(SIZE.y, SIZE.x / 2.5));
		SCENE_POS.set(insetWidth, 0);
		SCENE_SIZE.set(SIZE.x - insetWidth, SIZE.y);

		const padding = Math.round((SIZE.y - insetWidth) / 2);
		INSET_POS.set(0, padding);
		INSET_SIZE.set(insetWidth, insetWidth);
	} else {
		const insetHeight = Math.round(SIZE.y / 2.5);
		SCENE_POS.set(0, 0);
		SCENE_SIZE.set(SIZE.x, SIZE.y - insetHeight);

		INSET_POS.set(0, SIZE.y - insetHeight);
		INSET_SIZE.set(SIZE.x, insetHeight);
	}

	camera.aspect = SCENE_SIZE.x / SCENE_SIZE.y;
    camera.updateProjectionMatrix();

	insetCamera.aspect = INSET_SIZE.x / INSET_SIZE.y;
    insetCamera.updateProjectionMatrix();

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
	raycast();

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

function preventDefault(e) {
	mobileFlag = true;
	const tagName = e.target.tagName.toLowerCase();

	if (tagName === 'canvas') {
		if (e.touches.length > 1) {
			e.preventDefault();
		} else {
			mouse.set(1, 1);
		}
	} else {
		return e;
	}
}


function addEventListeners() {
	const canvas = document.getElementsByTagName('canvas')[0];
	canvas.addEventListener('mousedown', onMouseDown);
	canvas.addEventListener('mouseup', onMouseUp);
	canvas.addEventListener('mousemove', onMouseMove);
	window.addEventListener('resize', onResize);
    document.addEventListener('gesturestart', preventDefault, {passive: false});
    document.addEventListener('touchmove', preventDefault, {passive: false});
}


/***** Animation Loop ******/
function drawScene() {
	const [x, y] = [SCENE_POS.x, SCENE_POS.y];
	const [width, height] = [SCENE_SIZE.x, SCENE_SIZE.y];


	renderer.setClearColor(0xffffff, 0.15);
	renderer.setViewport(0, 0, SIZE.x, SIZE.y);
	renderer.clear();

	renderer.setClearColor(0x000000, 0);
	renderer.setScissorTest(true);
	renderer.setScissor(x, y, width, height);
	renderer.setViewport(x, y, width, height);
	renderer.render(scene.scene, camera);
	renderer.setScissorTest(false);
}

function animate() {
	requestAnimationFrame(animate);

	drawScene();
	renderer.clearDepth();
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
onResize(undefined);
exports.animate = animate;
