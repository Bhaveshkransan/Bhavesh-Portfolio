/**
 * Bhavesh Gangurde — Portfolio App Engine (1:1 Moncy.dev Style)
 */

document.addEventListener('DOMContentLoaded', () => {
  initLucide();
  initCustomCursor();
  renderWork();
  renderCertificates();
});

function initLucide() {
  if (window.lucide) {
    window.lucide.createIcons();
  }
}

// Custom Magnetic Cursor (moncy.dev)
function initCustomCursor() {
  const cursor = document.getElementById('cursor-main');
  if (!cursor) return;

  const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  if (isTouch) {
    cursor.style.display = 'none';
    return;
  }

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let cursorX = mouseX;
  let cursorY = mouseY;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function renderCursor() {
    cursorX += (mouseX - cursorX) * 0.22;
    cursorY += (mouseY - cursorY) * 0.22;
    cursor.style.transform = `translate(${cursorX}px, ${cursorY}px) translate(-50%, -50%)`;
    requestAnimationFrame(renderCursor);
  }
  requestAnimationFrame(renderCursor);

  function attachHover() {
    const hoverables = document.querySelectorAll('a, button, .work-box, .what-content, .career-info-box');
    hoverables.forEach(el => {
      if (el.dataset.cursorAttached) return;
      el.dataset.cursorAttached = 'true';

      el.addEventListener('mouseenter', () => {
        cursor.classList.add('cursor-hover');
      });
      el.addEventListener('mouseleave', () => {
        cursor.classList.remove('cursor-hover');
      });
    });
  }

  attachHover();
  window.attachHover = attachHover;
}

// Render Projects (Work)
function renderWork() {
  const grid = document.getElementById('projects-grid');
  if (!grid || typeof projectsData === 'undefined') return;

  grid.innerHTML = '';
  projectsData.forEach(p => {
    const box = document.createElement('div');
    box.className = 'work-box';

    const liveBtn = p.hasLiveDemo
      ? `<a href="${p.liveUrl}" target="_blank" style="padding: 6px 14px; border-radius: 20px; background: var(--accentColor); color: #000; font-size: 12px; font-weight: 600;">Live ↗</a>`
      : '';

    box.innerHTML = `
      <div>
        <div class="work-title">
          <span style="font-size: 11px; font-family: 'JetBrains Mono', monospace; color: var(--accentColor); text-transform: uppercase; letter-spacing: 1px;">${p.badge}</span>
          <h3 style="margin-top: 6px;">${p.title}</h3>
        </div>
        <div class="work-info">
          <p>${p.description}</p>
        </div>
        <div class="work-tags-wrap">
          ${p.techStack.map(t => `<span class="what-tags">${t}</span>`).join('')}
        </div>
      </div>
      <div class="work-actions">
        <button onclick="openProjectModal('${p.id}')" style="background: transparent; border: 1px solid rgba(255,255,255,0.2); color: #fff; padding: 6px 14px; border-radius: 20px; font-size: 12px; cursor: pointer;">Inspect Specs</button>
        <div style="display: flex; gap: 8px; align-items: center;">
          ${liveBtn}
          <a href="${p.githubUrl}" target="_blank" style="padding: 6px 14px; border-radius: 20px; border: 1px solid rgba(255,255,255,0.2); font-size: 12px;">Code →</a>
        </div>
      </div>
    `;
    grid.appendChild(box);
  });

  if (window.attachHover) window.attachHover();
}

// Render Certificates
function renderCertificates() {
  const grid = document.getElementById('certificates-grid');
  if (!grid || typeof certificatesData === 'undefined') return;

  grid.innerHTML = '';
  certificatesData.forEach(c => {
    const box = document.createElement('div');
    box.className = 'work-box';

    box.innerHTML = `
      <div>
        <div class="work-title">
          <span style="font-size: 11px; font-family: 'JetBrains Mono', monospace; color: var(--accentColor); text-transform: uppercase; letter-spacing: 1px;">${c.badge}</span>
          <h3 style="margin-top: 6px;">${c.title}</h3>
          <h5 style="color: var(--accentColor); font-size: 13px; margin: 4px 0 10px; font-weight: 400;">${c.issuer}</h5>
        </div>
        <div class="work-info">
          <p>${c.description}</p>
        </div>
        <div class="work-tags-wrap">
          ${c.skills.map(s => `<span class="what-tags">${s}</span>`).join('')}
        </div>
      </div>
      <div class="work-actions">
        <button onclick="openCertificateModal('${c.id}')" style="background: var(--accentColor); color: #000; font-weight: 600; border: none; padding: 7px 16px; border-radius: 20px; font-size: 12px; cursor: pointer; width: 100%;">Inspect Credential ↗</button>
      </div>
    `;
    grid.appendChild(box);
  });

  if (window.attachHover) window.attachHover();
}

// Modals
function openProjectModal(projectId) {
  if (typeof projectsData === 'undefined') return;
  const p = projectsData.find(item => item.id === projectId);
  if (!p) return;

  const modal = document.getElementById('project-modal');
  document.getElementById('modal-project-title').textContent = p.title;
  document.getElementById('modal-project-tagline').textContent = p.tagline;
  document.getElementById('modal-project-desc').textContent = p.description;

  const highlightsEl = document.getElementById('modal-project-highlights');
  highlightsEl.innerHTML = (p.highlights || []).map(h => `<div>• ${h}</div>`).join('');

  const techEl = document.getElementById('modal-project-tech');
  techEl.innerHTML = (p.techStack || []).map(t => `<span class="what-tags">${t}</span>`).join('');

  const liveBtn = document.getElementById('modal-project-live');
  if (p.hasLiveDemo) {
    liveBtn.href = p.liveUrl;
    liveBtn.style.display = 'inline-block';
  } else {
    liveBtn.style.display = 'none';
  }

  document.getElementById('modal-project-github').href = p.githubUrl;

  modal.classList.add('active');
}

function closeProjectModal() {
  const modal = document.getElementById('project-modal');
  if (modal) modal.classList.remove('active');
}

function openCertificateModal(certId) {
  if (typeof certificatesData === 'undefined') return;
  const c = certificatesData.find(item => item.id === certId);
  if (!c) return;

  const modal = document.getElementById('certificate-modal');
  document.getElementById('modal-cert-title').textContent = c.title;
  document.getElementById('modal-cert-issuer').textContent = c.issuer;

  const previewBox = document.getElementById('modal-cert-preview-box');
  if (c.fileType === 'image') {
    previewBox.innerHTML = `<img src="${c.localFile}" alt="${c.title}" style="max-width: 100%; max-height: 100%; object-fit: contain;" />`;
  } else {
    previewBox.innerHTML = `
      <object data="${c.localFile}" type="application/pdf" style="width: 100%; height: 100%;">
        <iframe src="${c.localFile}" style="width: 100%; height: 100%; border: none;"></iframe>
      </object>
    `;
  }

  document.getElementById('modal-cert-open').href = c.localFile;
  modal.classList.add('active');
}

function closeCertificateModal() {
  const modal = document.getElementById('certificate-modal');
  if (modal) modal.classList.remove('active');
}

function openResumeModal() {
  const modal = document.getElementById('resume-modal');
  if (modal) modal.classList.add('active');
}

function closeResumeModal() {
  const modal = document.getElementById('resume-modal');
  if (modal) modal.classList.remove('active');
}

window.addEventListener('click', (e) => {
  const projModal = document.getElementById('project-modal');
  const resumeModal = document.getElementById('resume-modal');
  const certModal = document.getElementById('certificate-modal');
  if (e.target === projModal) closeProjectModal();
  if (e.target === resumeModal) closeResumeModal();
  if (e.target === certModal) closeCertificateModal();
});

function copyToClipboard(text, message = 'Copied!') {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text).then(() => {
      showToast(message);
    });
  }
}

function showToast(message) {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  container.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 3000);
}
