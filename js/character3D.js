/**
 * 3D Interactive Character Model Engine (1:1 Moncy.dev)
 * Loads models/character.glb, lights, animations, and real-time cursor head rotation
 */

function init3DCharacter() {
  const container = document.getElementById('character-model-container');
  if (!container || typeof THREE === 'undefined') {
    return;
  }

  const width = window.innerWidth;
  const height = window.innerHeight;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(14.5, width / height, 0.1, 1000);
  camera.position.set(0, 13.1, 24.7);
  camera.zoom = 1.1;
  camera.updateProjectionMatrix();

  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.1;
  renderer.outputEncoding = THREE.sRGBEncoding;
  container.appendChild(renderer.domElement);

  // Lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xc7a9ff, 1.5);
  directionalLight.position.set(-0.47, -0.32, -1);
  scene.add(directionalLight);

  const pointLight = new THREE.PointLight(0xc2a4ff, 18, 100, 2);
  pointLight.position.set(3, 12, 4);
  scene.add(pointLight);

  let headBone = null;
  let mixer = null;
  let character = null;
  const clock = new THREE.Clock();

  // Load GLTF with DRACOLoader
  if (THREE.GLTFLoader) {
    const loader = new THREE.GLTFLoader();
    
    if (THREE.DRACOLoader) {
      const dracoLoader = new THREE.DRACOLoader();
      dracoLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.6/');
      loader.setDRACOLoader(dracoLoader);
    }

    loader.load('models/character.glb', (gltf) => {
      character = gltf.scene;
      scene.add(character);

      // Locate head bone
      headBone = character.getObjectByName('spine006') || character.getObjectByName('Head') || character.getObjectByName('Neck') || null;

      if (gltf.animations && gltf.animations.length > 0) {
        mixer = new THREE.AnimationMixer(character);
        gltf.animations.forEach((clip) => {
          mixer.clipAction(clip).play();
        });
      }

      const rim = document.querySelector('.character-rim');
      if (rim) {
        rim.style.opacity = '0.9';
      }
    }, undefined, (err) => {
      console.warn("Could not load character.glb:", err);
    });
  }

  // Real-time cursor head-tracking
  let mouse = { x: 0, y: 0 };
  window.addEventListener('mousemove', (e) => {
    mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
  });

  function animate() {
    requestAnimationFrame(animate);

    if (headBone && window.scrollY < 500) {
      const maxRotY = Math.PI / 6;
      headBone.rotation.y = THREE.MathUtils.lerp(headBone.rotation.y, mouse.x * maxRotY, 0.08);
      headBone.rotation.x = THREE.MathUtils.lerp(headBone.rotation.x, -mouse.y * 0.35 - 0.2, 0.08);
    }

    const delta = clock.getDelta();
    if (mixer) mixer.update(delta);

    renderer.render(scene, camera);
  }
  animate();

  window.addEventListener('resize', () => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  setTimeout(init3DCharacter, 150);
});
