import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.119.1/build/three.module.js';
import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.119.1/examples/jsm/loaders/GLTFLoader.js';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x8cabde);

const camera = new THREE.PerspectiveCamera(80, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.x = 0.75;
camera.position.y = 0.5;
camera.position.z = 0.75;
camera.lookAt(0.15, 0.25, -0.025);

let cc = 0;

const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const light = new THREE.DirectionalLight(0xffffff, 2.5);
scene.add(light);

const loader = new GLTFLoader();
loader.load('../files/Mountain.glb', function (gltf) {
	scene.add(gltf.scene);
}, undefined, function (error) {
	console.error(error);
});

const animate = (t) => {
    requestAnimationFrame(animate);
    TWEEN.update(t);

    renderer.render(scene, camera);
};

window.addEventListener('keydown', onKeyDown, false);

function onKeyDown() {
    const cam0_look = new TWEEN.Tween({y: 0.4})
    .to({y: 0.25}, 750)
    .onUpdate((coords) => {
        camera.lookAt(0.15, coords.y, -0.025);
    })

    const cam1_look_L = new TWEEN.Tween({y: 0.25})
        .to({y: 0.4}, 750)
        .onUpdate((coords) => {
            camera.lookAt(0.15, coords.y, -0.025);
        })
    const cam1_look_R = new TWEEN.Tween({y: 0.5})
        .to({y: 0.4}, 750)
        .onUpdate((coords) => {
            camera.lookAt(0.15, coords.y, -0.025);
        })

    const cam2_look_L = new TWEEN.Tween({y: 0.4})
        .to({y: 0.5}, 750)
        .onUpdate((coords) => {
            camera.lookAt(0.15, coords.y, -0.025);
        })
    const cam2_look_R = new TWEEN.Tween({y: 0.75})
        .to({y: 0.5}, 750)
        .onUpdate((coords) => {
            camera.lookAt(0.15, coords.y, -0.025);
        })

    const cam3_look = new TWEEN.Tween({y: 0.5})
        .to({y: 0.75}, 750)
        .onUpdate((coords) => {
            camera.lookAt(0.15, coords.y, -0.025);
        })

    const cam0 = new TWEEN.Tween({x: camera.position.x, y: camera.position.y, z: camera.position.z})
    .to({x: 0.75, y: 0.5, z: 0.75}, 750)
    .onUpdate((coords) => {
        camera.position.x = coords.x;
        camera.position.y = coords.y;
        camera.position.z = coords.z;
    })

    const cam1 = new TWEEN.Tween({x: camera.position.x, y: camera.position.y, z: camera.position.z})
        .to({x: 1, y: 0.75, z: -0.25}, 750)
        .onUpdate((coords) => {
            camera.position.x = coords.x;
            camera.position.y = coords.y;
            camera.position.z = coords.z;
        })

    const cam2 = new TWEEN.Tween({x: camera.position.x, y: camera.position.y, z: camera.position.z})
        .to({x: 0.1, y: 1, z: -0.75}, 750)
        .onUpdate((coords) => {
            camera.position.x = coords.x;
            camera.position.y = coords.y;
            camera.position.z = coords.z;
        })

    const cam3 = new TWEEN.Tween({x: camera.position.x, y: camera.position.y, z: camera.position.z})
        .to({x: -0.5, y: 1.25, z: -0.025}, 750)
        .onUpdate((coords) => {
            camera.position.x = coords.x;
            camera.position.y = coords.y;
            camera.position.z = coords.z;
        })

    if (event.keyCode === 37) {
        //arrow left
        switch (cc) {
            case 3:
                cam2.start();
                cam2_look_R.start();
                cc--;
                break;
            case 2:
                cam1.start();
                cam1_look_R.start();
                cc--;
                break;
            case 1:
                cam0.start();
                cam0_look.start();
                cc--;
                break;
            case 0:
                return;
        }
    } else if (event.keyCode === 39) {
        //arrow right
        switch (cc) {
            case 0:
                cam1.start();
                cam1_look_L.start();
                cc++;
                break;
            case 1:
                cam2.start();
                cam2_look_L.start();
                cc++;
                break;
            case 2:
                cam3.start();
                cam3_look.start();
                cc++;
                break;
            case 3:
                return;
        }
    }
}

window.addEventListener('resize', onWindowResize, false);

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.render(scene, camera);
}

animate();
