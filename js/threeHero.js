/**
 * Bhavesh Gangurde — High-Interactivity 3D Neural Spider-Web Engine (Home Page Only)
 * Enhanced Visibility & Brilliant Synaptic Filaments
 */

(function() {
  function initHomeSpiderWeb() {
    const container = document.getElementById('three-hero-container');
    if (!container || typeof THREE === 'undefined') return;

    const isMobile = window.innerWidth < 768;

    // Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 0, 36);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance"
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    const webGroup = new THREE.Group();
    scene.add(webGroup);

    // Glowing Node Texture with High Luminance Core
    function createGlowTexture(colorHex, coreHex = '#ffffff') {
      const canvas = document.createElement('canvas');
      canvas.width = 64;
      canvas.height = 64;
      const ctx = canvas.getContext('2d');

      const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 31);
      grad.addColorStop(0, coreHex);
      grad.addColorStop(0.2, colorHex);
      grad.addColorStop(0.65, colorHex);
      grad.addColorStop(1, 'rgba(0,0,0,0)');

      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 64, 64);

      const texture = new THREE.CanvasTexture(canvas);
      texture.generateMipmaps = false;
      return texture;
    }

    const cyanTex = createGlowTexture('#22d3ee', '#ffffff');
    const blueTex = createGlowTexture('#38bdf8', '#ffffff');
    const violetTex = createGlowTexture('#c084fc', '#ffffff');
    const whiteTex = createGlowTexture('#ffffff', '#ffffff');

    // 1. Generate 3D Neural Web Nodes
    const nodeCount = isMobile ? 55 : 115;
    const nodes = [];

    const colorPalette = [
      { r: 0.13, g: 0.83, b: 0.93, tex: cyanTex },   // Neon Cyan
      { r: 0.22, g: 0.74, b: 0.97, tex: blueTex },   // Electric Sky Blue
      { r: 0.75, g: 0.52, b: 0.99, tex: violetTex }, // Violet / Lavender
      { r: 0.98, g: 0.99, b: 1.00, tex: whiteTex }   // Pure White Highlight
    ];

    for (let i = 0; i < nodeCount; i++) {
      const z = -24 + (Math.random() * 32); // -24 to +8
      const depthRatio = (z + 24) / 32;

      let x = (Math.random() - 0.5) * (isMobile ? 36 : 70);
      let y = (Math.random() - 0.5) * (isMobile ? 32 : 46);

      if (Math.abs(x) < 6.5 && Math.abs(y) < 4.5 && depthRatio > 0.5) {
        x += (x >= 0 ? 7.5 : -7.5);
        y += (y >= 0 ? 5.5 : -5.5);
      }

      const col = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      // Slightly larger & brighter nodes for enhanced visibility
      const baseScale = 1.35 + depthRatio * 2.1;
      const baseOpacity = 0.65 + depthRatio * 0.35;

      const mat = new THREE.SpriteMaterial({
        map: col.tex,
        transparent: true,
        opacity: baseOpacity,
        blending: THREE.AdditiveBlending,
        depthWrite: false
      });

      const sprite = new THREE.Sprite(mat);
      sprite.position.set(x, y, z);
      sprite.scale.set(baseScale, baseScale, 1);
      webGroup.add(sprite);

      nodes.push({
        sprite: sprite,
        x: x, y: y, z: z,
        baseX: x, baseY: y, baseZ: z,
        vx: (Math.random() - 0.5) * 0.02,
        vy: (Math.random() - 0.5) * 0.02,
        vz: (Math.random() - 0.5) * 0.015,
        floatSpeed: 0.35 + Math.random() * 0.45,
        phase: Math.random() * Math.PI * 2,
        color: col,
        depthRatio: depthRatio,
        baseOpacity: baseOpacity,
        baseScale: baseScale
      });
    }

    // 2. Interconnecting Spider-Web Lines
    const maxConnections = (nodeCount * (nodeCount - 1)) / 2 + 50;
    const linePositions = new Float32Array(maxConnections * 6);
    const lineColors = new Float32Array(maxConnections * 6);

    const lineGeom = new THREE.BufferGeometry();
    lineGeom.setAttribute('position', new THREE.BufferAttribute(linePositions, 3).setUsage(THREE.DynamicDrawUsage));
    lineGeom.setAttribute('color', new THREE.BufferAttribute(lineColors, 3).setUsage(THREE.DynamicDrawUsage));

    const lineMat = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 1.0,
      blending: THREE.AdditiveBlending,
      linewidth: 1
    });

    const webLines = new THREE.LineSegments(lineGeom, lineMat);
    webGroup.add(webLines);

    // 3. Electrical Action Potential Impulses (Traveling Sparks)
    const impulseCount = isMobile ? 8 : 16;
    const impulses = [];
    const sparkTex = createGlowTexture('#ffffff', '#ffffff');

    for (let p = 0; p < impulseCount; p++) {
      const sparkMat = new THREE.SpriteMaterial({
        map: sparkTex,
        transparent: true,
        opacity: 1.0,
        blending: THREE.AdditiveBlending
      });
      const sparkSprite = new THREE.Sprite(sparkMat);
      sparkSprite.scale.set(2.2, 2.2, 1);
      webGroup.add(sparkSprite);

      impulses.push({
        sprite: sparkSprite,
        nodeA: 0,
        nodeB: 1,
        progress: Math.random(),
        speed: 0.012 + Math.random() * 0.016,
        active: false
      });
    }

    // 4. Mouse 3D Interaction Variables
    let mouseX = 0, mouseY = 0;
    let targetMouseX = 0, targetMouseY = 0;
    let cursor3DX = 0, cursor3DY = 0;

    window.addEventListener('mousemove', (e) => {
      const halfW = window.innerWidth / 2;
      const halfH = window.innerHeight / 2;
      mouseX = (e.clientX - halfW) / halfW;
      mouseY = (e.clientY - halfH) / halfH;

      cursor3DX = mouseX * 28;
      cursor3DY = -mouseY * 18;
    });

    document.addEventListener('mouseleave', () => {
      mouseX = 0;
      mouseY = 0;
      cursor3DX = 0;
      cursor3DY = 0;
    });

    function onResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }
    window.addEventListener('resize', onResize);

    // 5. Animation Loop
    const clock = new THREE.Clock();
    const maxWebDistance = isMobile ? 14.0 : 18.0; // Slightly larger radius for richer web lines
    const activeWebPairs = [];

    function isHomePageActive() {
      const hash = window.location.hash.slice(1) || '/';
      return hash === '/' || hash === '';
    }

    function animate() {
      requestAnimationFrame(animate);

      if (!isHomePageActive()) return;

      const time = clock.getElapsedTime();

      // Smooth mouse lerp
      targetMouseX += (mouseX * 0.75 - targetMouseX) * 0.06;
      targetMouseY += (mouseY * 0.75 - targetMouseY) * 0.06;

      webGroup.rotation.y = targetMouseX + Math.sin(time * 0.04) * 0.04;
      webGroup.rotation.x = -targetMouseY + Math.cos(time * 0.03) * 0.03;

      // 1. Update Floating Node Positions + Magnetic Mouse Hover Reaction
      for (let i = 0; i < nodeCount; i++) {
        const n = nodes[i];

        let targetX = n.baseX + Math.sin(time * n.floatSpeed + n.phase) * 1.3 + n.vx * 15;
        let targetY = n.baseY + Math.cos(time * n.floatSpeed * 0.9 + n.phase) * 1.3 + n.vy * 15;
        let targetZ = n.baseZ + Math.sin(time * 0.35 + n.phase) * 0.8;

        const dx = cursor3DX - targetX;
        const dy = cursor3DY - targetY;
        const distToCursor = Math.sqrt(dx * dx + dy * dy);

        if (distToCursor < 17 && Math.abs(mouseX) > 0.01) {
          const repelStrength = (1.0 - distToCursor / 17) * 3.8;
          targetX -= (dx / distToCursor) * repelStrength;
          targetY -= (dy / distToCursor) * repelStrength;
          targetZ += repelStrength * 1.4;
        }

        n.x += (targetX - n.x) * 0.08;
        n.y += (targetY - n.y) * 0.08;
        n.z += (targetZ - n.z) * 0.08;

        n.sprite.position.set(n.x, n.y, n.z);

        let extraGlow = 0;
        if (distToCursor < 17) {
          extraGlow = (1.0 - distToCursor / 17) * 0.55;
        }

        const shimmer = Math.sin(time * 2.0 + n.phase) * 0.15;
        n.sprite.material.opacity = Math.min(1.0, n.baseOpacity + shimmer + extraGlow);
        const dynamicScale = n.baseScale * (1.0 + extraGlow * 0.45);
        n.sprite.scale.set(dynamicScale, dynamicScale, 1);
      }

      // 2. Draw Connected Spider-Web Filaments & Cursor Interactive Lines
      let lineVertexIndex = 0;
      let colorIndex = 0;
      activeWebPairs.length = 0;

      for (let i = 0; i < nodeCount; i++) {
        const ni = nodes[i];

        // A. Direct Web Connections between Nodes
        for (let j = i + 1; j < nodeCount; j++) {
          const nj = nodes[j];

          const dx = ni.x - nj.x;
          const dy = ni.y - nj.y;
          const dz = ni.z - nj.z;
          const distSq = dx * dx + dy * dy + dz * dz;

          if (distSq < maxWebDistance * maxWebDistance) {
            const dist = Math.sqrt(distSq);
            const distRatio = 1.0 - (dist / maxWebDistance);
            const avgDepth = (ni.depthRatio + nj.depthRatio) * 0.5;

            const midX = (ni.x + nj.x) * 0.5;
            const midY = (ni.y + nj.y) * 0.5;
            const distToCursor = Math.sqrt((cursor3DX - midX) * (cursor3DX - midX) + (cursor3DY - midY) * (cursor3DY - midY));
            const cursorBoost = distToCursor < 16 ? (1.0 - distToCursor / 16) * 0.5 : 0;

            // Richer, boosted filament opacity
            const alpha = distRatio * (0.50 + avgDepth * 0.45 + cursorBoost);

            linePositions[lineVertexIndex++] = ni.x;
            linePositions[lineVertexIndex++] = ni.y;
            linePositions[lineVertexIndex++] = ni.z;

            linePositions[lineVertexIndex++] = nj.x;
            linePositions[lineVertexIndex++] = nj.y;
            linePositions[lineVertexIndex++] = nj.z;

            const r = ((ni.color.r + nj.color.r) * 0.5) * alpha;
            const g = ((ni.color.g + nj.color.g) * 0.5) * alpha;
            const b = ((ni.color.b + nj.color.b) * 0.5) * alpha;

            lineColors[colorIndex++] = r;
            lineColors[colorIndex++] = g;
            lineColors[colorIndex++] = b;

            lineColors[colorIndex++] = r;
            lineColors[colorIndex++] = g;
            lineColors[colorIndex++] = b;

            activeWebPairs.push({ a: i, b: j });
          }
        }

        // B. Interactive Cursor Filaments (Connect directly from mouse position to nearby nodes!)
        if (Math.abs(mouseX) > 0.01) {
          const dxC = cursor3DX - ni.x;
          const dyC = cursor3DY - ni.y;
          const dzC = 4 - ni.z;
          const distToCursor = Math.sqrt(dxC * dxC + dyC * dyC + dzC * dzC);

          if (distToCursor < 19) {
            const cursorAlpha = (1.0 - distToCursor / 19) * 0.95;

            linePositions[lineVertexIndex++] = cursor3DX;
            linePositions[lineVertexIndex++] = cursor3DY;
            linePositions[lineVertexIndex++] = 4;

            linePositions[lineVertexIndex++] = ni.x;
            linePositions[lineVertexIndex++] = ni.y;
            linePositions[lineVertexIndex++] = ni.z;

            lineColors[colorIndex++] = 0.45 * cursorAlpha;
            lineColors[colorIndex++] = 0.98 * cursorAlpha;
            lineColors[colorIndex++] = 1.00 * cursorAlpha;

            lineColors[colorIndex++] = ni.color.r * cursorAlpha;
            lineColors[colorIndex++] = ni.color.g * cursorAlpha;
            lineColors[colorIndex++] = ni.color.b * cursorAlpha;
          }
        }
      }

      webLines.geometry.attributes.position.needsUpdate = true;
      webLines.geometry.attributes.color.needsUpdate = true;
      webLines.geometry.setDrawRange(0, lineVertexIndex / 3);

      // 3. Update Electrical Action Potential Impulses
      if (activeWebPairs.length > 0) {
        for (let p = 0; p < impulseCount; p++) {
          const imp = impulses[p];

          if (!imp.active) {
            const pair = activeWebPairs[Math.floor(Math.random() * activeWebPairs.length)];
            imp.nodeA = pair.a;
            imp.nodeB = pair.b;
            imp.progress = 0;
            imp.active = true;
          }

          imp.progress += imp.speed;
          if (imp.progress >= 1.0) {
            imp.active = false;
            imp.sprite.position.set(0, -999, 0);
            continue;
          }

          const na = nodes[imp.nodeA];
          const nb = nodes[imp.nodeB];
          if (na && nb) {
            const px = na.x + (nb.x - na.x) * imp.progress;
            const py = na.y + (nb.y - na.y) * imp.progress;
            const pz = na.z + (nb.z - na.z) * imp.progress;

            imp.sprite.position.set(px, py, pz);
            imp.sprite.material.opacity = Math.sin(imp.progress * Math.PI);
          }
        }
      }

      renderer.render(scene, camera);
    }

    animate();
  }

  window.addEventListener('DOMContentLoaded', () => {
    setTimeout(initHomeSpiderWeb, 50);
  });
})();
