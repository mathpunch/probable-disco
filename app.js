// Basic game setup
let scene, camera, renderer, controls;
let light, ambientLight;
let sound, listener;
let monsterSound;

// Initialize Three.js
function init() {
    // Set up the scene
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Add a simple floor
    const geometry = new THREE.PlaneGeometry(200, 200);
    const material = new THREE.MeshBasicMaterial({ color: 0xaaaaaa, side: THREE.DoubleSide });
    const floor = new THREE.Mesh(geometry, material);
    floor.rotation.x = -Math.PI / 2; // Rotate it to be horizontal
    scene.add(floor);

    // Add simple walls (we'll make it very simple for now)
    const wallGeometry = new THREE.BoxGeometry(200, 10, 10);
    const wallMaterial = new THREE.MeshBasicMaterial({ color: 0x555555 });
    const wall1 = new THREE.Mesh(wallGeometry, wallMaterial);
    wall1.position.set(0, 5, -100);
    scene.add(wall1);

    // Lighting
    ambientLight = new THREE.AmbientLight(0x404040); // Ambient light
    scene.add(ambientLight);
    
    light = new THREE.PointLight(0xffffff, 1, 100);
    light.position.set(50, 50, 50);
    scene.add(light);

    // Camera setup
    camera.position.z = 10;

    // Add sound
    listener = new THREE.AudioListener();
    camera.add(listener);
    sound = new THREE.Audio(listener);
    const audioLoader = new THREE.AudioLoader();
    audioLoader.load('assets/creepy-sound.mp3', function (buffer) {
        sound.setBuffer(buffer);
        sound.setLoop(true);
        sound.setVolume(0.5);
        sound.play();
    });

    // Monster growl sound (this will be used for jump scares)
    monsterSound = new THREE.Audio(listener);
    audioLoader.load('assets/monster-growl.mp3', function (buffer) {
        monsterSound.setBuffer(buffer);
        monsterSound.setVolume(1.0);
    });

    // Add event listener for mouse and keyboard
    window.addEventListener('resize', onWindowResize, false);

    // Start game loop
    animate();
}

// Resize the canvas when the window is resized
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

// Animate the scene (game loop)
function animate() {
    requestAnimationFrame(animate);

    // Simple camera movement (WASD controls)
    const speed = 0.1;
    if (keyIsDown('w')) {
        camera.position.z -= speed;
    }
    if (keyIsDown('s')) {
        camera.position.z += speed;
    }
    if (keyIsDown('a')) {
        camera.position.x -= speed;
    }
    if (keyIsDown('d')) {
        camera.position.x += speed;
    }

    // Add some random jump scare
    if (Math.random() < 0.001) {
        playMonsterGrowl();
    }

    renderer.render(scene, camera);
}

// Simple key press handler (for WASD movement)
const keys = {};
window.addEventListener('keydown', function (e) {
    keys[e.key.toLowerCase()] = true;
});
window.addEventListener('keyup', function (e) {
    keys[e.key.toLowerCase()] = false;
});
function keyIsDown(key) {
    return keys[key] === true;
}

// Play the monster growl sound
function playMonsterGrowl() {
    monsterSound.play();
}

// Initialize everything
init();
