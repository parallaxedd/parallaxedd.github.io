import * as THREE from '/node_modules/three/build/three.module.js';
import { OrbitControls } from '/node_modules/three/examples/jsm/controls/OrbitControls.js';

//scene
const scene = new THREE.Scene();

// camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

// renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Orbit controls
const controls = new OrbitControls( camera, renderer.domElement );
controls.mouseButtons = {
	LEFT: THREE.MOUSE.ROTATE,
	MIDDLE: THREE.MOUSE.DOLLY,
	RIGHT: THREE.MOUSE.PAN
}

//texture for card
const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load('card.jpg');

//3d card
const cardGeometry = new THREE.BoxGeometry(2, 3, 0.1);
const cardMaterial = new THREE.MeshBasicMaterial({ map: texture });
const card = new THREE.Mesh(cardGeometry, cardMaterial);
scene.add(card);

//card 2d hitbox
const hitboxGeometry = new THREE.PlaneGeometry(2, 3);
const hitboxMaterial = new THREE.MeshBasicMaterial({ transparent: true, opacity: 0 });
const hitbox = new THREE.Mesh(hitboxGeometry, hitboxMaterial);
hitbox.position.copy(card.position); // Position it at the same location as the card
scene.add(hitbox);

let animation = null;

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
mouse.x = 200;

// animation playing
const startAnimation = () => {
	if (!animation) {
		animation = gsap.to(card.rotation, { duration: 1.25, x: -0.25, y: Math.PI * 1.96, onComplete: () => {
			animation = null;
		}});
	}
};

// reverse after mouseout
const reverseAnimation = () => {
	if (!animation) {
		animation = gsap.to(card.rotation, { duration: 0.75, x: 0, y: 0, z: 0, onComplete: () => {
			animation = null;
		}});
	}
};

//update mouse position
renderer.domElement.addEventListener('mousemove', (event) => {
	// Calculate mouse position in normalized device coordinates
	mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
	mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
});

// called each frame
const animate = () => {
	requestAnimationFrame(animate); //calls

	// Update ray with the camera and mouse position
	raycaster.setFromCamera(mouse, camera);

	// Calculate objects intersecting
	const intersects = raycaster.intersectObject(hitbox);

	//intersected with hitbox
	if (intersects.length > 0) {
		startAnimation();
	} else {
		animation = null;
		reverseAnimation();
	}

	renderer.render(scene, camera);
};

window.addEventListener('resize', onWindowResize, false);

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );
	renderer.render();
}

animate();