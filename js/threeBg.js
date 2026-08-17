/**
 * Bhavesh Gangurde — Single Global Scroll-Driven 3D Camera & Spatial World Engine
 * 
 * Architecture:
 * - ONE persistent 3D spatial world spanning from Hero (y=0) to Contact (y=-36).
 * - ONE physical Three.js Perspective Camera driven by page scroll progress.
 * - True 3D Depth Layers:
 *     * Background Constellation Matrix: z = -12 to -22
 *     * Middle Depth Environment: z = -4 to -9
 *     * Content Plane: z = 0 to -3
 *     * Foreground Ambient Tokens: z = +1 to +2.8
 * - Persistent Dynamic 3D Constellation Network Lines connecting nearby nodes.
 * - Independent Floating Code Object Physics (drift, rise, arc, orbit, beacon) randomized once.
 * - Safe reading corridor with smooth margin deflection.
 * - Destination convergence toward Contact CTA.
 */

function initPersistentCodeLayer3D() {
  const canvas = document.getElementById('three-hero-canvas');
  if (!canvas || typeof THREE === 'undefined') return;

  // =========================================================================
  // 1. THREE.JS SCENE & PERSPECTIVE CAMERA
  // =========================================================================
  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(0, 0, 5.8);

  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true,
    antialias: true,
    powerPreference: "high-performance"
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  // Lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 2.2);
  scene.add(ambientLight);

  const keyLightOrange = new THREE.PointLight(0xff6b00, 1.2, 45);
  keyLightOrange.position.set(8, 4, 6);
  scene.add(keyLightOrange);

  const keyLightBlue = new THREE.PointLight(0x2563eb, 1.2, 45);
  keyLightBlue.position.set(-8, -15, 6);
  scene.add(keyLightBlue);

  const keyLightViolet = new THREE.PointLight(0x7c3aed, 1.2, 45);
  keyLightViolet.position.set(8, -30, 6);
  scene.add(keyLightViolet);

  // =========================================================================
  // 2. TECHNICAL TOKEN TEXTURE GENERATOR (BARE, OUTLINE, GLASS)
  // =========================================================================
  function createTokenTexture(text, colorType = 'dark', style = 'bare', depthTier = 'mg') {
    const canvas = document.createElement('canvas');
    canvas.width = 220;
    canvas.height = 96;
    const ctx = canvas.getContext('2d');

    const colorPalette = {
      dark:    { text: depthTier === 'fg' ? '#0f172a' : '#334155', border: 'rgba(51, 65, 85, 0.40)', bg: 'rgba(241, 245, 249, 0.55)' },
      blue:    { text: depthTier === 'fg' ? '#1d4ed8' : '#2563eb', border: 'rgba(37, 99, 235, 0.40)', bg: 'rgba(239, 246, 255, 0.55)' },
      violet:  { text: depthTier === 'fg' ? '#6d28d9' : '#7c3aed', border: 'rgba(124, 58, 237, 0.40)', bg: 'rgba(245, 243, 255, 0.55)' },
      cyan:    { text: depthTier === 'fg' ? '#0e7490' : '#06b6d4', border: 'rgba(8, 145, 178, 0.40)', bg: 'rgba(236, 254, 255, 0.55)' },
      orange:  { text: depthTier === 'fg' ? '#c2410c' : '#ea580c', border: 'rgba(234, 88, 12, 0.40)', bg: 'rgba(255, 247, 237, 0.55)' },
      pink:    { text: depthTier === 'fg' ? '#be185d' : '#ec4899', border: 'rgba(219, 39, 119, 0.40)', bg: 'rgba(253, 242, 248, 0.55)' },
      emerald: { text: depthTier === 'fg' ? '#047857' : '#10b981', border: 'rgba(5, 150, 105, 0.40)', bg: 'rgba(236, 253, 245, 0.55)' }
    };

    const c = colorPalette[colorType] || colorPalette.dark;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const x = 10, y = 12, w = 200, h = 72, r = 18;

    if (style === 'glass') {
      ctx.beginPath();
      ctx.moveTo(x + r, y);
      ctx.lineTo(x + w - r, y);
      ctx.quadraticCurveTo(x + w, y, x + w, y + r);
      ctx.lineTo(x + w, y + h - r);
      ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
      ctx.lineTo(x + r, y + h);
      ctx.quadraticCurveTo(x, y + h, x, y + h - r);
      ctx.lineTo(x, y + r);
      ctx.quadraticCurveTo(x, y, x + r, y);
      ctx.closePath();

      ctx.fillStyle = c.bg;
      ctx.fill();
      ctx.lineWidth = 1.4;
      ctx.strokeStyle = c.border;
      ctx.stroke();
    } else if (style === 'outline') {
      ctx.beginPath();
      ctx.moveTo(x + r, y);
      ctx.lineTo(x + w - r, y);
      ctx.quadraticCurveTo(x + w, y, x + w, y + r);
      ctx.lineTo(x + w, y + h - r);
      ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
      ctx.lineTo(x + r, y + h);
      ctx.quadraticCurveTo(x, y + h, x, y + h - r);
      ctx.lineTo(x, y + r);
      ctx.quadraticCurveTo(x, y, x + r, y);
      ctx.closePath();

      ctx.lineWidth = 1.2;
      ctx.strokeStyle = c.border;
      ctx.stroke();
    }

    const fontSize = style === 'bare' ? '38px' : '32px';
    const fontWeight = depthTier === 'fg' ? '700' : '600';
    ctx.font = `${fontWeight} ${fontSize} "JetBrains Mono", monospace`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = c.text;

    if (style === 'bare' && depthTier === 'fg') {
      ctx.shadowColor = 'rgba(15, 23, 42, 0.08)';
      ctx.shadowBlur = 4;
      ctx.shadowOffsetY = 2;
    }

    ctx.fillText(text, canvas.width / 2, canvas.height / 2 + 1);

    const texture = new THREE.CanvasTexture(canvas);
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
    return texture;
  }

  // =========================================================================
  // 3. PERSISTENT GLOBAL 3D OBJECT DATASET (DISTRIBUTED ACROSS ENTIRE Y AXIS)
  // =========================================================================
  const globalTokens = [
    // --- HERO & ABOUT SECTOR (y: +4 to -6) ---
    { text: '</>', color: 'dark', style: 'bare', depthTier: 'fg', x: -6.5, y: 1.8, z: 1.4, scale: 1.15 },
    { text: '{ }', color: 'dark', style: 'bare', depthTier: 'fg', x: 6.8, y: 2.2, z: 1.2, scale: 1.10 },
    { text: 'const', color: 'dark', style: 'bare', depthTier: 'fg', x: -8.0, y: -2.2, z: 0.5, scale: 1.05 },
    { text: 'React', color: 'blue', style: 'outline', depthTier: 'fg', x: 7.2, y: -1.8, z: 0.8, scale: 1.12 },
    { text: 'API', color: 'blue', style: 'bare', depthTier: 'mg', x: -6.8, y: -4.5, z: -4.0, scale: 1.05 },
    { text: 'AI', color: 'violet', style: 'glass', depthTier: 'fg', x: 6.5, y: -5.0, z: 1.5, scale: 1.15 },
    { text: '01', color: 'dark', style: 'bare', depthTier: 'bg', x: -10.5, y: 3.0, z: -14.0, scale: 0.90 },
    { text: '101', color: 'cyan', style: 'bare', depthTier: 'bg', x: 10.5, y: -3.5, z: -12.0, scale: 0.85 },

    // --- PROJECTS SECTOR (y: -7 to -12) ---
    { text: 'async', color: 'emerald', style: 'outline', depthTier: 'fg', x: -7.5, y: -8.0, z: 1.0, scale: 1.10 },
    { text: 'Node', color: 'orange', style: 'outline', depthTier: 'fg', x: 7.6, y: -8.5, z: 0.8, scale: 1.12 },
    { text: 'DB', color: 'cyan', style: 'bare', depthTier: 'mg', x: -6.2, y: -10.5, z: -5.0, scale: 1.02 },
    { text: 'JS', color: 'orange', style: 'bare', depthTier: 'mg', x: 6.8, y: -11.2, z: -4.5, scale: 1.02 },
    { text: 'git', color: 'dark', style: 'outline', depthTier: 'mg', x: -8.2, y: -12.0, z: -3.5, scale: 1.00 },
    { text: '*', color: 'pink', style: 'bare', depthTier: 'bg', x: 9.5, y: -9.5, z: -15.0, scale: 0.85 },

    // --- SKILLS SECTOR (y: -13 to -18) ---
    { text: 'SQL', color: 'blue', style: 'glass', depthTier: 'mg', x: 7.2, y: -14.2, z: -4.0, scale: 1.05 },
    { text: '( )', color: 'dark', style: 'bare', depthTier: 'mg', x: -7.5, y: -15.0, z: -3.0, scale: 1.00 },
    { text: 'npm', color: 'dark', style: 'bare', depthTier: 'mg', x: 6.5, y: -16.5, z: -5.5, scale: 0.98 },
    { text: 'λ', color: 'violet', style: 'bare', depthTier: 'fg', x: -6.5, y: -17.2, z: 1.2, scale: 1.08 },
    { text: '{}', color: 'violet', style: 'bare', depthTier: 'bg', x: -9.5, y: -14.8, z: -13.5, scale: 0.85 },
    { text: '01', color: 'dark', style: 'bare', depthTier: 'bg', x: 10.0, y: -17.5, z: -16.0, scale: 0.85 },

    // --- CERTIFICATES SECTOR (y: -19 to -24) ---
    { text: '<>', color: 'blue', style: 'bare', depthTier: 'fg', x: -7.2, y: -20.0, z: 1.0, scale: 1.10 },
    { text: 'AI', color: 'violet', style: 'glass', depthTier: 'fg', x: 7.5, y: -20.5, z: 0.9, scale: 1.15 },
    { text: 'const', color: 'dark', style: 'bare', depthTier: 'mg', x: -6.8, y: -22.5, z: -4.5, scale: 1.02 },
    { text: 'DB', color: 'cyan', style: 'bare', depthTier: 'mg', x: 6.8, y: -23.0, z: -5.0, scale: 1.00 },
    { text: '101', color: 'blue', style: 'bare', depthTier: 'bg', x: -10.2, y: -21.0, z: -14.0, scale: 0.85 },

    // --- EDUCATION & LEADERSHIP SECTOR (y: -25 to -29) ---
    { text: '</>', color: 'dark', style: 'bare', depthTier: 'fg', x: 7.2, y: -25.5, z: 1.1, scale: 1.12 },
    { text: 'React', color: 'blue', style: 'outline', depthTier: 'fg', x: -7.4, y: -26.5, z: 0.7, scale: 1.08 },
    { text: 'async', color: 'emerald', style: 'outline', depthTier: 'mg', x: 6.8, y: -28.0, z: -4.2, scale: 1.02 },
    { text: 'git', color: 'dark', style: 'outline', depthTier: 'mg', x: -6.5, y: -28.5, z: -3.8, scale: 0.98 },
    { text: '*', color: 'dark', style: 'bare', depthTier: 'bg', x: 9.8, y: -26.2, z: -15.5, scale: 0.85 },

    // --- PROFILES SECTOR (y: -30 to -33) ---
    { text: 'Node', color: 'orange', style: 'outline', depthTier: 'fg', x: -7.0, y: -30.5, z: 0.9, scale: 1.10 },
    { text: 'API', color: 'blue', style: 'bare', depthTier: 'fg', x: 7.2, y: -31.2, z: 1.2, scale: 1.08 },
    { text: 'SQL', color: 'blue', style: 'glass', depthTier: 'mg', x: -6.2, y: -32.5, z: -4.8, scale: 1.02 },
    { text: '01', color: 'cyan', style: 'bare', depthTier: 'bg', x: -10.5, y: -30.8, z: -14.5, scale: 0.85 },

    // --- CONTACT FINAL DESTINATION SECTOR (y: -34 to -37) ---
    { text: '{ }', color: 'dark', style: 'bare', depthTier: 'fg', x: -5.5, y: -34.8, z: 1.2, scale: 1.15 },
    { text: 'AI', color: 'violet', style: 'glass', depthTier: 'fg', x: 5.8, y: -35.2, z: 1.4, scale: 1.15 },
    { text: 'const', color: 'dark', style: 'bare', depthTier: 'mg', x: -5.0, y: -36.2, z: -3.0, scale: 1.05 },
    { text: 'async', color: 'emerald', style: 'outline', depthTier: 'mg', x: 5.2, y: -36.5, z: -3.5, scale: 1.05 }
  ];

  // =========================================================================
  // 4. INSTANTIATE 3D FLOATING OBJECTS & INDEPENDENT KINEMATICS
  // =========================================================================
  const spatialNodes = [];
  const motionTypes = ['drift', 'elevator', 'arc', 'orbit', 'beacon'];

  globalTokens.forEach((def, idx) => {
    const texture = createTokenTexture(def.text, def.color, def.style, def.depthTier);

    let baseOpacity = 0.42;
    let depthScale = 1.0;

    if (def.depthTier === 'fg') {
      baseOpacity = 0.65;
      depthScale = 1.12;
    } else if (def.depthTier === 'mg') {
      baseOpacity = 0.38;
      depthScale = 0.95;
    } else { // bg
      baseOpacity = 0.16;
      depthScale = 0.78;
    }

    const spriteMat = new THREE.SpriteMaterial({
      map: texture,
      transparent: true,
      opacity: baseOpacity,
      depthWrite: false
    });

    const sprite = new THREE.Sprite(spriteMat);
    const finalW = (def.style === 'bare' ? 0.95 : 1.12) * def.scale * depthScale;
    const finalH = (def.style === 'bare' ? 0.42 : 0.50) * def.scale * depthScale;
    sprite.scale.set(finalW, finalH, 1.0);

    const initialPos = new THREE.Vector3(def.x, def.y, def.z);
    sprite.position.copy(initialPos);
    scene.add(sprite);

    // Randomized once at initialization
    const mType = motionTypes[idx % motionTypes.length];
    spatialNodes.push({
      sprite: sprite,
      mat: spriteMat,
      baseOpacity: baseOpacity,
      pos: initialPos.clone(),
      origin: initialPos.clone(),
      motionType: mType,
      // Independent parameters
      vx: (Math.random() - 0.5) * 0.008,
      vy: (Math.random() - 0.5) * 0.006,
      vz: (Math.random() - 0.5) * 0.002,
      orbitRadius: 0.35 + Math.random() * 0.45,
      orbitSpeed: 0.4 + Math.random() * 0.5,
      orbitPhase: Math.random() * Math.PI * 2,
      curveFreq: 0.3 + Math.random() * 0.4,
      phase: Math.random() * Math.PI * 2,
      tier: def.depthTier,
      inertiaY: 0
    });
  });

  // =========================================================================
  // 5. DEEP BACKGROUND PARTICLE CONSTELLATION (z = -12 to -22)
  // =========================================================================
  const deepParticleCount = 90;
  const deepParticleGeo = new THREE.BufferGeometry();
  const deepPositions = new Float32Array(deepParticleCount * 3);

  for (let p = 0; p < deepParticleCount; p++) {
    deepPositions[p * 3] = (Math.random() - 0.5) * 32;
    deepPositions[p * 3 + 1] = 6.0 - Math.random() * 46.0; // Spans entire y height
    deepPositions[p * 3 + 2] = -12.0 - Math.random() * 12.0;
  }

  deepParticleGeo.setAttribute('position', new THREE.BufferAttribute(deepPositions, 3));
  const deepParticleMat = new THREE.PointsMaterial({
    color: 0x94a3b8,
    size: 0.035,
    transparent: true,
    opacity: 0.22
  });
  const deepParticleSystem = new THREE.Points(deepParticleGeo, deepParticleMat);
  scene.add(deepParticleSystem);

  // =========================================================================
  // 6. PERSISTENT 3D CONSTELLATION NETWORK LINES
  // =========================================================================
  const maxLineConnections = 36;
  const linePositions = new Float32Array(maxLineConnections * 2 * 3);
  const lineGeo = new THREE.BufferGeometry();
  lineGeo.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));

  const lineMat = new THREE.LineBasicMaterial({
    color: 0x94a3b8,
    transparent: true,
    opacity: 0.14,
    linewidth: 1
  });
  const constellationLines = new THREE.LineSegments(lineGeo, lineMat);
  scene.add(constellationLines);

  // =========================================================================
  // 7. VIRTUAL CAMERA FLIGHT PATH & WAYPOINTS
  // =========================================================================
  // Spatial Camera Coordinates mapped along page scroll progress (0.0 to 1.0)
  const cameraWaypoints = [
    { p: 0.00, pos: new THREE.Vector3(0.0,   0.0, 5.8), look: new THREE.Vector3(0.0,   0.0,  0.0) }, // Hero
    { p: 0.16, pos: new THREE.Vector3(0.0,  -4.8, 5.4), look: new THREE.Vector3(0.0,  -4.8,  0.0) }, // About
    { p: 0.32, pos: new THREE.Vector3(0.0, -10.2, 5.2), look: new THREE.Vector3(0.0, -10.2,  0.0) }, // Projects
    { p: 0.48, pos: new THREE.Vector3(0.0, -15.8, 5.0), look: new THREE.Vector3(0.0, -15.8,  0.0) }, // Skills
    { p: 0.64, pos: new THREE.Vector3(0.0, -21.4, 4.8), look: new THREE.Vector3(0.0, -21.4,  0.0) }, // Certificates
    { p: 0.80, pos: new THREE.Vector3(0.0, -26.8, 4.6), look: new THREE.Vector3(0.0, -26.8,  0.0) }, // Education
    { p: 0.90, pos: new THREE.Vector3(0.0, -31.2, 4.4), look: new THREE.Vector3(0.0, -31.2,  0.0) }, // Profiles
    { p: 1.00, pos: new THREE.Vector3(0.0, -35.5, 4.2), look: new THREE.Vector3(0.0, -35.5,  0.0) }  // Contact
  ];

  function getInterpolatedCameraState(progress) {
    const p = Math.min(Math.max(progress, 0), 1);
    
    // Find enclosing waypoints
    let idx = 0;
    for (let i = 0; i < cameraWaypoints.length - 1; i++) {
      if (p >= cameraWaypoints[i].p && p <= cameraWaypoints[i + 1].p) {
        idx = i;
        break;
      }
    }

    const w1 = cameraWaypoints[idx];
    const w2 = cameraWaypoints[idx + 1] || w1;
    const range = (w2.p - w1.p) || 1;
    const localT = (p - w1.p) / range;
    
    // Smooth cubic ease for segment interpolation
    const easeT = localT * localT * (3 - 2 * localT);

    const pos = new THREE.Vector3().lerpVectors(w1.pos, w2.pos, easeT);
    const look = new THREE.Vector3().lerpVectors(w1.look, w2.look, easeT);

    return { pos, look };
  }

  // =========================================================================
  // 8. SCROLL & CURSOR INPUT LISTENER
  // =========================================================================
  let scrollY = 0;
  let lastScrollY = 0;
  let scrollVelocity = 0;
  let scrollInertia = 0;

  let mouseX = 0, mouseY = 0;
  let targetMouseX = 0, targetMouseY = 0;

  window.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
    mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
  });

  window.addEventListener('scroll', () => {
    scrollY = window.scrollY || document.documentElement.scrollTop;
  });

  // Reading corridor safety bounds (|x| < 4.8 in central zone)
  const safeZoneX = 4.8;

  function handleResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }

  window.addEventListener('resize', handleResize);

  // =========================================================================
  // 9. CONTINUOUS SPATIAL RENDER LOOP (60FPS)
  // =========================================================================
  const clock = new THREE.Clock();
  const currentLookAt = new THREE.Vector3(0, 0, 0);

  function animate() {
    requestAnimationFrame(animate);

    const time = clock.getElapsedTime();

    // 1. Scroll Physics & Dynamic Scroll Velocity Inertia
    const dScroll = scrollY - lastScrollY;
    lastScrollY = scrollY;
    scrollVelocity = dScroll * 0.015;

    scrollInertia += (scrollVelocity - scrollInertia) * 0.12;
    scrollInertia *= 0.90;

    const maxDocScroll = (document.documentElement.scrollHeight - window.innerHeight) || 1;
    const scrollProgress = Math.min(Math.max(scrollY / maxDocScroll, 0), 1);

    // 2. Cursor Smoothing
    targetMouseX += (mouseX - targetMouseX) * 0.04;
    targetMouseY += (mouseY - targetMouseY) * 0.04;

    // 3. Compute Target Camera Flight Position driven by Scroll Progress
    const camState = getInterpolatedCameraState(scrollProgress);
    
    // Camera travels purely along Y and Z with subtle vertical-only parallax
    const targetCamPos = new THREE.Vector3(
      0.0,
      camState.pos.y - targetMouseY * 0.15,
      camState.pos.z
    );

    const targetCamLook = new THREE.Vector3(
      0.0,
      camState.look.y - targetMouseY * 0.10,
      camState.look.z
    );

    // Smooth physical camera travel
    camera.position.lerp(targetCamPos, 0.08);
    currentLookAt.lerp(targetCamLook, 0.08);
    camera.lookAt(currentLookAt);
    camera.rotation.z = 0; // Strictly zero roll / zero banking

    // 4. Update Independent Floating 3D Code Objects
    let connectedLinesCount = 0;
    const lPos = lineGeo.attributes.position.array;

    spatialNodes.forEach((node, nIdx) => {
      // Independent motion behaviors
      if (node.motionType === 'drift') {
        node.pos.x += Math.sin(time * node.curveFreq + node.phase) * 0.003;
        node.pos.y += Math.cos(time * 0.25 + node.phase) * 0.002;
      } else if (node.motionType === 'elevator') {
        node.pos.y += Math.sin(time * 0.4 + node.phase) * 0.004;
      } else if (node.motionType === 'arc') {
        node.pos.x += Math.cos(time * 0.35 + node.phase) * 0.0035;
        node.pos.y += Math.sin(time * 0.35 + node.phase) * 0.0035;
      } else if (node.motionType === 'orbit') {
        node.pos.x = node.origin.x + Math.cos(time * node.orbitSpeed + node.orbitPhase) * node.orbitRadius;
        node.pos.y = node.origin.y + Math.sin(time * node.orbitSpeed + node.orbitPhase) * (node.orbitRadius * 0.6);
      } // beacon stays stable around origin

      // Scroll velocity influence on floating field
      const depthMultiplier = node.tier === 'fg' ? 0.35 : 0.18;
      node.inertiaY += (-scrollInertia * depthMultiplier - node.inertiaY) * 0.08;

      const finalRenderY = node.pos.y + node.inertiaY;

      // Contact Destination Subtle Convergence (Gently curves inward near CTA)
      if (scrollProgress > 0.85) {
        const pull = (scrollProgress - 0.85) * 0.006;
        if (node.pos.x > 0) node.pos.x -= pull;
        if (node.pos.x < 0) node.pos.x += pull;
      }

      // Safe Corridor: Deflect outward if inside central reading zone
      if (Math.abs(node.pos.x) < safeZoneX && node.pos.z > -4.5) {
        const push = (1.0 - Math.abs(node.pos.x) / safeZoneX) * 0.025;
        if (node.pos.x < 0) node.pos.x -= push;
        else node.pos.x += push;
      }

      node.sprite.position.set(node.pos.x, finalRenderY, node.pos.z);

      // Build Dynamic 3D Constellation Network Lines between nearby nodes
      if (connectedLinesCount < maxLineConnections) {
        for (let j = nIdx + 1; j < spatialNodes.length; j++) {
          const other = spatialNodes[j];
          const dist = node.pos.distanceTo(other.pos);
          if (dist > 1.2 && dist < 4.6 && Math.abs(node.pos.y - other.pos.y) < 3.2) {
            const ptr = connectedLinesCount * 6;
            lPos[ptr] = node.pos.x;
            lPos[ptr + 1] = finalRenderY;
            lPos[ptr + 2] = node.pos.z;

            lPos[ptr + 3] = other.pos.x;
            lPos[ptr + 4] = other.pos.y + other.inertiaY;
            lPos[ptr + 5] = other.pos.z;

            connectedLinesCount++;
            if (connectedLinesCount >= maxLineConnections) break;
          }
        }
      }
    });

    lineGeo.setDrawRange(0, connectedLinesCount * 2);
    lineGeo.attributes.position.needsUpdate = true;

    // 5. Deep Background Particles Drift
    const dArr = deepParticleGeo.attributes.position.array;
    for (let p = 0; p < deepParticleCount; p++) {
      dArr[p * 3 + 1] += Math.sin(time * 0.3 + p) * 0.0004;
    }
    deepParticleGeo.attributes.position.needsUpdate = true;

    renderer.render(scene, camera);
  }

  animate();
}

document.addEventListener('DOMContentLoaded', () => {
  initPersistentCodeLayer3D();
});
