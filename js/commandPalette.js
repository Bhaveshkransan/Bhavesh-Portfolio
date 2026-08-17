/**
 * Bhavesh Gangurde - Command Palette (Cmd+K / Ctrl+K)
 * Fast navigation and action launcher for recruiters & developers
 */

class CommandPalette {
  constructor() {
    this.modal = document.getElementById('command-palette-modal');
    this.input = document.getElementById('palette-input');
    this.resultsList = document.getElementById('palette-results');
    this.isOpen = false;
    this.selectedIndex = 0;

    this.actions = [
      { id: 'jump-projects', title: 'Featured Projects', category: 'Navigation', icon: 'folder-git-2', handler: () => this.scrollTo('projects') },
      { id: 'jump-skills', title: 'Tech Stack & Skills Matrix', category: 'Navigation', icon: 'cpu', handler: () => this.scrollTo('skills') },
      { id: 'jump-terminal', title: 'Open Developer Terminal', category: 'Navigation', icon: 'terminal', handler: () => this.openTerminal() },
      { id: 'jump-about', title: 'About & Academic Journey', category: 'Navigation', icon: 'user', handler: () => this.scrollTo('about') },
      { id: 'jump-youtube', title: 'YouTube & Content Hub', category: 'Navigation', icon: 'youtube', handler: () => this.scrollTo('youtube') },
      { id: 'jump-contact', title: 'Contact & Hire Bhavesh', category: 'Navigation', icon: 'mail', handler: () => this.scrollTo('contact') },
      { id: 'act-email', title: 'Copy Email (bhaveshg1357@gmail.com)', category: 'Quick Action', icon: 'copy', handler: () => copyEmailToClipboard() },
      { id: 'act-github', title: 'Visit GitHub (@Bhaveshkransan)', category: 'External Link', icon: 'github', handler: () => window.open('https://github.com/Bhaveshkransan', '_blank') },
      { id: 'act-linkedin', title: 'Connect on LinkedIn', category: 'External Link', icon: 'linkedin', handler: () => window.open('https://www.linkedin.com/in/bhavesh-gangurde-70a02a372', '_blank') },
      { id: 'act-leetcode', title: 'View LeetCode Profile (@kransan)', category: 'External Link', icon: 'code', handler: () => window.open('https://leetcode.com/u/kransan/', '_blank') },
      { id: 'act-twitter', title: 'Follow on Twitter / X (@BhaveshG18964)', category: 'External Link', icon: 'twitter', handler: () => window.open('https://x.com/BhaveshG18964', '_blank') },
      { id: 'act-matrix', title: 'Trigger Matrix Rain Mode', category: 'Fun & Visuals', icon: 'sparkles', handler: () => toggleMatrixFromApp() }
    ];

    // Append project links dynamically
    if (typeof projectsData !== 'undefined') {
      projectsData.forEach(p => {
        this.actions.push({
          id: `proj-${p.id}`,
          title: `Project: ${p.title} (${p.techStack.slice(0, 3).join(', ')})`,
          category: 'Projects',
          icon: 'code-2',
          handler: () => {
            this.scrollTo('projects');
            highlightProjectCard(p.id);
          }
        });
      });
    }

    this.filteredActions = [...this.actions];
    this.bindEvents();
  }

  bindEvents() {
    // Keyboard shortcuts
    window.addEventListener('keydown', (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        this.toggle();
      } else if (e.key === 'Escape' && this.isOpen) {
        this.close();
      }
    });

    // Triggers
    const triggerButtons = document.querySelectorAll('.palette-trigger');
    triggerButtons.forEach(btn => btn.addEventListener('click', () => this.open()));

    if (this.modal) {
      this.modal.addEventListener('click', (e) => {
        if (e.target === this.modal || e.target.id === 'palette-backdrop') {
          this.close();
        }
      });
    }

    if (this.input) {
      this.input.addEventListener('input', () => this.handleSearch());
      this.input.addEventListener('keydown', (e) => this.handleNavigation(e));
    }
  }

  open() {
    if (!this.modal) return;
    this.isOpen = true;
    this.modal.classList.remove('hidden');
    this.modal.classList.add('flex');
    this.input.value = '';
    this.filteredActions = [...this.actions];
    this.selectedIndex = 0;
    this.render();
    setTimeout(() => this.input.focus(), 50);
  }

  close() {
    if (!this.modal) return;
    this.isOpen = false;
    this.modal.classList.add('hidden');
    this.modal.classList.remove('flex');
  }

  toggle() {
    if (this.isOpen) this.close();
    else this.open();
  }

  handleSearch() {
    const query = this.input.value.toLowerCase().trim();
    if (!query) {
      this.filteredActions = [...this.actions];
    } else {
      this.filteredActions = this.actions.filter(item => 
        item.title.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query)
      );
    }
    this.selectedIndex = 0;
    this.render();
  }

  handleNavigation(e) {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      this.selectedIndex = (this.selectedIndex + 1) % Math.max(1, this.filteredActions.length);
      this.render();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      this.selectedIndex = (this.selectedIndex - 1 + this.filteredActions.length) % Math.max(1, this.filteredActions.length);
      this.render();
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (this.filteredActions[this.selectedIndex]) {
        const item = this.filteredActions[this.selectedIndex];
        this.close();
        item.handler();
      }
    }
  }

  render() {
    if (!this.resultsList) return;
    if (this.filteredActions.length === 0) {
      this.resultsList.innerHTML = `
        <div class="py-8 text-center text-gray-400 text-sm">
          No matching actions found for "<span class="text-cyan-400 font-semibold">${escapeHtml(this.input.value)}</span>"
        </div>
      `;
      return;
    }

    this.resultsList.innerHTML = this.filteredActions.map((item, index) => {
      const isSelected = index === this.selectedIndex;
      return `
        <div class="palette-item flex items-center justify-between px-3 py-2.5 rounded-lg cursor-pointer transition-colors ${
          isSelected ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' : 'text-gray-300 hover:bg-white/5'
        }" data-index="${index}">
          <div class="flex items-center space-x-3">
            <span class="text-xs text-gray-500 px-2 py-0.5 rounded bg-gray-800 border border-gray-700 font-mono">${item.category}</span>
            <span class="text-sm font-medium ${isSelected ? 'text-white font-semibold' : ''}">${escapeHtml(item.title)}</span>
          </div>
          <span class="text-xs text-gray-400 ${isSelected ? 'text-cyan-300 font-mono' : 'hidden'}">↵ Select</span>
        </div>
      `;
    }).join('');

    // Attach click listeners to items
    this.resultsList.querySelectorAll('.palette-item').forEach(el => {
      el.addEventListener('click', () => {
        const index = parseInt(el.getAttribute('data-index'), 10);
        if (this.filteredActions[index]) {
          this.close();
          this.filteredActions[index].handler();
        }
      });
    });
  }

  scrollTo(sectionId) {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }

  openTerminal() {
    this.scrollTo('terminal');
    const termInput = document.getElementById('terminal-input');
    if (termInput) {
      setTimeout(() => termInput.focus(), 400);
    }
  }
}

function highlightProjectCard(projectId) {
  const card = document.getElementById(`card-${projectId}`);
  if (card) {
    card.classList.add('ring-2', 'ring-cyan-400', 'scale-[1.02]');
    setTimeout(() => {
      card.classList.remove('ring-2', 'ring-cyan-400', 'scale-[1.02]');
    }, 2500);
  }
}
