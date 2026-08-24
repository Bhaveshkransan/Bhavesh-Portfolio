/**
 * Bhavesh Gangurde — Portfolio Application Engine
 * Cinematic 3D Spatial Interactions, Routing, Projects & Certificates Engine
 */

document.addEventListener('DOMContentLoaded', () => {
  initLucideIcons();
  initCustomCursor();
  initRouter();
  renderFeaturedProjects();
  renderProjects('all');
  renderCertificates('all');
  initFilterButtons();
  initCertFilterButtons();
  initMobileMenu();
  init3DCardTiltPhysics();
  setCurrentYear();
});

// Initialize Lucide Icons
function initLucideIcons() {
  if (window.lucide) {
    window.lucide.createIcons();
  }
}

// Set Dynamic Year
function setCurrentYear() {
  const el = document.getElementById('current-year');
  if (el) el.textContent = new Date().getFullYear();
}

/* ==========================================================================
   3D CARD HOVER TILT PHYSICS & DYNAMIC LIGHTING HIGHLIGHTS
   ========================================================================== */
function init3DCardTiltPhysics() {
  const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  if (isTouch) return;

  function attachTiltToCards() {
    const cards = document.querySelectorAll('.card-gradient');
    cards.forEach(card => {
      if (card.dataset.tiltInitialized) return;
      card.dataset.tiltInitialized = 'true';

      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -4.5;
        const rotateY = ((x - centerX) / centerX) * 4.5;

        card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-6px) scale3d(1.015, 1.015, 1.015)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px) scale3d(1, 1, 1)';
        card.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.5s ease, border-color 0.3s ease';
      });

      card.addEventListener('mouseenter', () => {
        card.style.transition = 'transform 0.15s ease-out, box-shadow 0.3s ease, border-color 0.3s ease';
      });
    });
  }

  attachTiltToCards();
  window.attachTiltToCards = attachTiltToCards;
}

/* ==========================================================================
   SPA ROUTER WITH 3D SPATIAL ENTRANCE TRANSITIONS
   ========================================================================== */
function initRouter() {
  const routes = {
    '/': 'page-home',
    '/about': 'page-about',
    '/skills': 'page-skills',
    '/projects': 'page-projects',
    '/certificates': 'page-certificates',
    '/github': 'page-github',
    '/competitive': 'page-competitive',
    '/connect': 'page-connect'
  };

  function handleRoute() {
    let hash = window.location.hash.slice(1) || '/';
    if (hash.length > 1 && hash.endsWith('/')) {
      hash = hash.slice(0, -1);
    }

    const targetPageId = routes[hash] || 'page-home';

    // Hide all sections
    document.querySelectorAll('.page-section').forEach(sec => {
      sec.classList.remove('active');
    });

    const activeSection = document.getElementById(targetPageId);
    if (activeSection) {
      activeSection.classList.remove('active');
      void activeSection.offsetWidth; // DOM Reflow
      activeSection.classList.add('active');

      const cards = activeSection.querySelectorAll('.stagger-card');
      cards.forEach((card, idx) => {
        card.style.animation = 'none';
        void card.offsetWidth;
        card.style.animation = `staggerCardIn 0.55s cubic-bezier(0.16, 1, 0.3, 1) both`;
        card.style.animationDelay = `${(idx * 0.065) + 0.05}s`;
      });

      const header = activeSection.querySelector('.section-header-wrap');
      if (header) {
        header.style.animation = 'none';
        void header.offsetWidth;
        header.style.animation = `headerSlideDown 0.5s cubic-bezier(0.16, 1, 0.3, 1) both`;
      }

      window.scrollTo({ top: 0, behavior: 'smooth' });
      if (window.attachTiltToCards) window.attachTiltToCards();
    }

    // Update Nav Link highlighting
    document.querySelectorAll('.nav-item, #mobile-menu a').forEach(link => {
      const linkRoute = link.getAttribute('data-route');
      if (linkRoute === hash || (hash === '' && linkRoute === '/')) {
        link.classList.add('active');
        if (link.classList.contains('text-muted-foreground')) {
          link.classList.remove('text-muted-foreground');
          link.classList.add('text-primary');
        }
      } else {
        link.classList.remove('active');
        if (link.parentElement.id === 'mobile-menu') {
          link.classList.remove('text-primary');
          link.classList.add('text-muted-foreground');
        }
      }
    });

    setTimeout(initLucideIcons, 50);
  }

  window.addEventListener('hashchange', handleRoute);
  handleRoute();
}

/* ==========================================================================
   MOBILE MENU TOGGLE
   ========================================================================== */
function initMobileMenu() {
  const btn = document.getElementById('mobile-menu-btn');
  const menu = document.getElementById('mobile-menu');

  if (!btn || !menu) return;

  btn.addEventListener('click', () => {
    menu.classList.toggle('hidden');
  });

  menu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.add('hidden');
    });
  });
}

/* ==========================================================================
   PROJECT RENDERING & FILTERING
   ========================================================================== */
function renderProjects(filter = 'all') {
  const grid = document.getElementById('projects-grid');
  if (!grid || typeof projectsData === 'undefined') return;

  const filtered = filter === 'all'
    ? projectsData
    : projectsData.filter(p => p.category === filter);

  grid.innerHTML = '';

  filtered.forEach((p, idx) => {
    const card = document.createElement('div');
    card.className = 'card-gradient stagger-card rounded-2xl border border-border overflow-hidden flex flex-col justify-between group';
    card.style.animation = `staggerCardIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) both`;
    card.style.animationDelay = `${(idx * 0.075) + 0.04}s`;

    const liveBtn = p.hasLiveDemo
      ? `<a href="${p.liveUrl}" target="_blank" class="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-mono font-medium hover:bg-emerald-500/20 transition-all flex items-center gap-1.5">
          <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>Live Demo ↗</span>
        </a>`
      : '';

    card.innerHTML = `
      <div>
        <div class="h-2 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600"></div>
        <div class="p-6 space-y-4">
          <div class="flex items-center justify-between">
            <span class="badge-chip text-primary border-primary/30 font-semibold">${p.badge}</span>
            ${liveBtn}
          </div>

          <h3 class="text-xl font-bold text-foreground font-heading group-hover:text-primary transition-colors">
            ${p.title}
          </h3>

          <p class="text-xs text-muted-foreground leading-relaxed line-clamp-3">
            ${p.description}
          </p>

          <div class="flex flex-wrap gap-1.5 pt-2">
            ${p.techStack.map(t => `<span class="badge-chip !text-[11px] !py-0.5 !px-2">${t}</span>`).join('')}
          </div>
        </div>
      </div>

      <div class="p-6 pt-0 border-t border-border/60 flex items-center justify-between gap-3 mt-4">
        <button onclick="openProjectModal('${p.id}')" class="btn-secondary !text-xs !py-1.5 !px-3 font-mono">
          <span>Inspect Specs</span>
        </button>
        <a href="${p.githubUrl}" target="_blank" class="btn-outline !text-xs !py-1.5 !px-3 font-mono flex items-center gap-1">
          <span>Code</span>
          <i data-lucide="github" class="w-3.5 h-3.5"></i>
        </a>
      </div>
    `;

    grid.appendChild(card);
  });

  initLucideIcons();
  if (window.attachTiltToCards) window.attachTiltToCards();
}

function renderFeaturedProjects() {
  const homeGrid = document.getElementById('home-featured-grid');
  if (!homeGrid || typeof projectsData === 'undefined') return;

  homeGrid.innerHTML = '';
  const featured = projectsData.slice(0, 3);

  featured.forEach((p, idx) => {
    const card = document.createElement('div');
    card.className = 'card-gradient stagger-card rounded-2xl border border-border overflow-hidden flex flex-col justify-between group';
    card.style.animation = `staggerCardIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) both`;
    card.style.animationDelay = `${(idx * 0.08) + 0.1}s`;

    const liveBtn = p.hasLiveDemo
      ? `<a href="${p.liveUrl}" target="_blank" class="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-mono font-medium hover:bg-emerald-500/20 transition-all flex items-center gap-1.5">
          <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>Live ↗</span>
        </a>`
      : '';

    card.innerHTML = `
      <div>
        <div class="h-2 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600"></div>
        <div class="p-6 space-y-3">
          <div class="flex items-center justify-between">
            <span class="badge-chip text-primary border-primary/30">${p.badge}</span>
            ${liveBtn}
          </div>

          <h3 class="text-lg font-bold text-foreground font-heading group-hover:text-primary transition-colors">
            ${p.title}
          </h3>

          <p class="text-xs text-muted-foreground leading-relaxed line-clamp-3">
            ${p.description}
          </p>

          <div class="flex flex-wrap gap-1.5 pt-2">
            ${p.techStack.slice(0, 4).map(t => `<span class="badge-chip !text-[10px] !py-0.5 !px-2">${t}</span>`).join('')}
          </div>
        </div>
      </div>

      <div class="p-6 pt-0 border-t border-border/60 flex items-center justify-between gap-3 mt-4">
        <button onclick="openProjectModal('${p.id}')" class="btn-secondary !text-xs !py-1.5 !px-3 font-mono">
          <span>Specs</span>
        </button>
        <a href="${p.githubUrl}" target="_blank" class="btn-outline !text-xs !py-1.5 !px-3 font-mono flex items-center gap-1">
          <span>Code</span>
          <i data-lucide="github" class="w-3.5 h-3.5"></i>
        </a>
      </div>
    `;

    homeGrid.appendChild(card);
  });

  initLucideIcons();
  if (window.attachTiltToCards) window.attachTiltToCards();
}

function initFilterButtons() {
  document.querySelectorAll('.filter-btn:not(.cert-filter-btn)').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn:not(.cert-filter-btn)').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.getAttribute('data-filter');
      renderProjects(filter);
    });
  });
}

/* ==========================================================================
   CERTIFICATES RENDERING & FILTERING
   ========================================================================== */
function renderCertificates(filter = 'all') {
  const grid = document.getElementById('certificates-grid');
  if (!grid || typeof certificatesData === 'undefined') return;

  const filtered = filter === 'all'
    ? certificatesData
    : certificatesData.filter(c => c.category === filter);

  grid.innerHTML = '';

  filtered.forEach((c, idx) => {
    const card = document.createElement('div');
    card.className = 'card-gradient stagger-card rounded-2xl border border-border overflow-hidden flex flex-col justify-between group';
    card.style.animation = `staggerCardIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) both`;
    card.style.animationDelay = `${(idx * 0.06) + 0.04}s`;

    card.innerHTML = `
      <div>
        <div class="h-2 bg-gradient-to-r from-teal-400 via-cyan-500 to-indigo-600"></div>
        <div class="p-6 space-y-3">
          <div class="flex items-center justify-between">
            <span class="badge-chip text-primary border-primary/30">${c.badge}</span>
            <span class="text-[11px] font-mono text-muted-foreground uppercase">${c.fileType.toUpperCase()}</span>
          </div>

          <h3 class="text-lg font-bold text-foreground font-heading group-hover:text-primary transition-colors">
            ${c.title}
          </h3>

          <p class="text-xs text-cyan-400 font-mono font-medium">
            ${c.issuer}
          </p>

          <p class="text-xs text-muted-foreground leading-relaxed line-clamp-2">
            ${c.description}
          </p>

          <div class="flex flex-wrap gap-1.5 pt-2">
            ${c.skills.slice(0, 3).map(s => `<span class="badge-chip !text-[10px] !py-0.5 !px-2">${s}</span>`).join('')}
          </div>
        </div>
      </div>

      <div class="p-6 pt-0 border-t border-border/60 flex items-center justify-between gap-3 mt-4">
        <button onclick="openCertificateModal('${c.id}')" class="btn-primary !text-xs !py-1.5 !px-3 font-mono flex items-center gap-1.5 w-full justify-center">
          <i data-lucide="eye" class="w-3.5 h-3.5"></i>
          <span>Inspect Credential ↗</span>
        </button>
      </div>
    `;

    grid.appendChild(card);
  });

  initLucideIcons();
  if (window.attachTiltToCards) window.attachTiltToCards();
}

function initCertFilterButtons() {
  document.querySelectorAll('.cert-filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.cert-filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.getAttribute('data-filter');
      renderCertificates(filter);
    });
  });
}

function openCertificateModal(certId) {
  if (typeof certificatesData === 'undefined') return;
  const c = certificatesData.find(item => item.id === certId);
  if (!c) return;

  const modal = document.getElementById('certificate-modal');
  document.getElementById('modal-cert-badge').textContent = c.badge;
  document.getElementById('modal-cert-title').textContent = c.title;
  document.getElementById('modal-cert-issuer').textContent = c.issuer;
  document.getElementById('modal-cert-desc').textContent = c.description;

  const skillsEl = document.getElementById('modal-cert-skills');
  skillsEl.innerHTML = (c.skills || []).map(s => `<span class="badge-chip">${s}</span>`).join('');

  // Preview Box
  const previewBox = document.getElementById('modal-cert-preview-box');
  if (c.fileType === 'image') {
    previewBox.innerHTML = `<img src="${c.localFile}" alt="${c.title}" class="w-full h-full object-contain p-2 rounded-lg" />`;
  } else {
    previewBox.innerHTML = `
      <object data="${c.localFile}" type="application/pdf" class="w-full h-full">
        <iframe src="${c.localFile}" class="w-full h-full border-0">
          <p class="p-6 text-center text-xs text-muted-foreground">Preview not supported in this browser. Please use the download or open button below.</p>
        </iframe>
      </object>
    `;
  }

  document.getElementById('modal-cert-open').href = c.localFile;
  document.getElementById('modal-cert-download').href = c.localFile;

  modal.classList.add('active');
  initLucideIcons();
}

function closeCertificateModal() {
  const modal = document.getElementById('certificate-modal');
  if (modal) modal.classList.remove('active');
}

/* ==========================================================================
   PROJECT SPECS MODAL
   ========================================================================== */
function openProjectModal(projectId) {
  if (typeof projectsData === 'undefined') return;
  const p = projectsData.find(item => item.id === projectId);
  if (!p) return;

  const modal = document.getElementById('project-modal');
  document.getElementById('modal-project-badge').textContent = p.badge;
  document.getElementById('modal-project-title').textContent = p.title;
  document.getElementById('modal-project-tagline').textContent = p.tagline;
  document.getElementById('modal-project-desc').textContent = p.description;

  const highlightsEl = document.getElementById('modal-project-highlights');
  highlightsEl.innerHTML = (p.highlights || []).map(h => `<li>${h}</li>`).join('');

  const techEl = document.getElementById('modal-project-tech');
  techEl.innerHTML = (p.techStack || []).map(t => `<span class="badge-chip">${t}</span>`).join('');

  const liveBtn = document.getElementById('modal-project-live');
  if (p.hasLiveDemo) {
    liveBtn.href = p.liveUrl;
    liveBtn.classList.remove('hidden');
  } else {
    liveBtn.classList.add('hidden');
  }

  document.getElementById('modal-project-github').href = p.githubUrl;

  modal.classList.add('active');
  initLucideIcons();
}

function closeProjectModal() {
  const modal = document.getElementById('project-modal');
  if (modal) modal.classList.remove('active');
}

// Close modals on overlay click
window.addEventListener('click', (e) => {
  const projModal = document.getElementById('project-modal');
  const resumeModal = document.getElementById('resume-modal');
  const certModal = document.getElementById('certificate-modal');
  if (e.target === projModal) closeProjectModal();
  if (e.target === resumeModal) closeResumeModal();
  if (e.target === certModal) closeCertificateModal();
});

/* ==========================================================================
   RESUME MODAL
   ========================================================================== */
function openResumeModal() {
  const modal = document.getElementById('resume-modal');
  if (modal) modal.classList.add('active');
  initLucideIcons();
}

function closeResumeModal() {
  const modal = document.getElementById('resume-modal');
  if (modal) modal.classList.remove('active');
}

/* ==========================================================================
   CONTACT FORM & TOAST NOTIFICATIONS
   ========================================================================== */
function handleContactFormSubmit(e) {
  e.preventDefault();
  const name = document.getElementById('form-name').value;
  const email = document.getElementById('form-email').value;
  const subject = document.getElementById('form-subject').value;
  const message = document.getElementById('form-message').value;

  showToast(`Thank you, ${name}! Your message has been prepared.`);

  const mailtoUrl = `mailto:bhaveshg1357@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent("From: " + name + " (" + email + ")\n\n" + message)}`;
  window.open(mailtoUrl, '_blank');

  e.target.reset();
}

function copyToClipboard(text, message = 'Copied to clipboard!') {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text).then(() => {
      showToast(message);
    }).catch(() => {
      fallbackCopy(text, message);
    });
  } else {
    fallbackCopy(text, message);
  }
}

function fallbackCopy(text, message) {
  const ta = document.createElement('textarea');
  ta.value = text;
  document.body.appendChild(ta);
  ta.select();
  document.execCommand('copy');
  document.body.removeChild(ta);
  showToast(message);
}

function showToast(message) {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <i data-lucide="check-circle" class="w-4 h-4 text-primary"></i>
    <span>${message}</span>
  `;

  container.appendChild(toast);
  initLucideIcons();

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}


/* ==========================================================================
   CUSTOM MAGNETIC CURSOR ENGINE (moncy.dev style)
   ========================================================================== */
function initCustomCursor() {
  const dot = document.getElementById('cursor-dot');
  const ring = document.getElementById('cursor-ring');
  if (!dot || !ring) return;

  const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  if (isTouch) {
    dot.style.display = 'none';
    ring.style.display = 'none';
    return;
  }

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let ringX = mouseX;
  let ringY = mouseY;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
  });

  function renderCursor() {
    ringX += (mouseX - ringX) * 0.18;
    ringY += (mouseY - ringY) * 0.18;
    ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
    requestAnimationFrame(renderCursor);
  }
  requestAnimationFrame(renderCursor);

  function attachCursorHover() {
    const hoverables = document.querySelectorAll('a, button, input, textarea, .card-gradient, .what-i-do-card, .marquee-pill');
    hoverables.forEach(el => {
      if (el.dataset.cursorAttached) return;
      el.dataset.cursorAttached = 'true';

      el.addEventListener('mouseenter', () => {
        ring.classList.add('active-hover');
      });
      el.addEventListener('mouseleave', () => {
        ring.classList.remove('active-hover');
      });
    });
  }

  attachCursorHover();
  window.attachCursorHover = attachCursorHover;
}
