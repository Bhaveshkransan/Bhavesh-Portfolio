/**
 * Bhavesh Gangurde - Interactive Developer Terminal
 * Custom CLI Emulator with commands, history, and Matrix rain integration
 */

class InteractiveTerminal {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    if (!this.container) return;

    this.history = [];
    this.historyIndex = -1;
    this.matrixActive = false;

    this.init();
  }

  init() {
    this.outputElement = this.container.querySelector('#terminal-output');
    this.inputElement = this.container.querySelector('#terminal-input');
    this.quickButtons = this.container.querySelectorAll('.terminal-quick-btn');

    if (this.inputElement) {
      this.inputElement.addEventListener('keydown', (e) => this.handleKeyDown(e));
    }

    if (this.quickButtons) {
      this.quickButtons.forEach(btn => {
        btn.addEventListener('click', () => {
          const cmd = btn.getAttribute('data-cmd');
          if (cmd) {
            this.executeCommand(cmd);
          }
        });
      });
    }

    this.printWelcome();
  }

  printWelcome() {
    const welcomeHtml = `
      <div class="text-cyan-400 font-bold mb-2">
      ╔══════════════════════════════════════════════════════════════╗<br>
      ║  BHAVESH GANGURDE (kransan) — INTERACTIVE DEV CLI v2.4       ║<br>
      ║  Full-Stack Developer (MERN) × AI & Machine Learning          ║<br>
      ╚══════════════════════════════════════════════════════════════╝
      </div>
      <div class="text-gray-400 text-xs mb-3">
        Type <span class="text-cyan-300 font-semibold">'help'</span> to see available commands or click quick action pills below.
      </div>
    `;
    this.appendOutput(welcomeHtml);
  }

  handleKeyDown(e) {
    if (e.key === 'Enter') {
      const command = this.inputElement.value.trim();
      if (command) {
        this.history.push(command);
        this.historyIndex = this.history.length;
        this.executeCommand(command);
        this.inputElement.value = '';
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (this.history.length > 0 && this.historyIndex > 0) {
        this.historyIndex--;
        this.inputElement.value = this.history[this.historyIndex];
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (this.historyIndex < this.history.length - 1) {
        this.historyIndex++;
        this.inputElement.value = this.history[this.historyIndex];
      } else {
        this.historyIndex = this.history.length;
        this.inputElement.value = '';
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      this.autocomplete();
    }
  }

  autocomplete() {
    const current = this.inputElement.value.trim().toLowerCase();
    const commands = ['help', 'bio', 'skills', 'projects', 'stats', 'edu', 'contact', 'socials', 'clear', 'matrix', 'whoami', 'date'];
    const match = commands.find(c => c.startsWith(current));
    if (match) {
      this.inputElement.value = match;
    }
  }

  executeCommand(rawCmd) {
    const cmdLine = rawCmd.trim();
    const [cmd, ...args] = cmdLine.toLowerCase().split(' ');

    // Echo user input
    this.appendOutput(`
      <div class="flex items-center space-x-2 text-gray-300 my-1">
        <span class="text-emerald-400 font-bold">visitor@bhavesh-dev:~$</span>
        <span class="text-white font-medium">${escapeHtml(cmdLine)}</span>
      </div>
    `);

    switch (cmd) {
      case 'help':
        this.appendOutput(`
          <div class="text-gray-300 text-xs space-y-1 my-2">
            <div><span class="text-cyan-300 font-semibold w-24 inline-block">bio</span> : Summary of my background & engineering philosophy</div>
            <div><span class="text-cyan-300 font-semibold w-24 inline-block">skills</span> : Full tech stack matrix (Frontend, Backend, AI/ML)</div>
            <div><span class="text-cyan-300 font-semibold w-24 inline-block">projects</span> : List top featured repositories and architectures</div>
            <div><span class="text-cyan-300 font-semibold w-24 inline-block">stats</span> : LeetCode, GitHub PRO, and problem-solving metrics</div>
            <div><span class="text-cyan-300 font-semibold w-24 inline-block">edu</span> : Academic background & NxtWave Fellowship</div>
            <div><span class="text-cyan-300 font-semibold w-24 inline-block">contact</span> : Email & direct reach-out options</div>
            <div><span class="text-cyan-300 font-semibold w-24 inline-block">socials</span> : Verified links (GitHub, LinkedIn, X, YouTube, LeetCode)</div>
            <div><span class="text-cyan-300 font-semibold w-24 inline-block">matrix</span> : Toggle live Matrix digital rain effect</div>
            <div><span class="text-cyan-300 font-semibold w-24 inline-block">clear</span> : Clear terminal display</div>
          </div>
        `);
        break;

      case 'bio':
        this.appendOutput(`
          <div class="text-gray-300 text-xs leading-relaxed my-2 p-3 bg-gray-900/60 rounded border border-gray-800">
            <span class="text-cyan-400 font-bold">Bhavesh Gangurde</span> (He/Him)<br>
            Computer Engineering student at <span class="text-indigo-300 font-semibold">Terna Engineering College</span> & Fellow at <span class="text-indigo-300 font-semibold">NxtWave's CCBP 4.0 Academy</span>.<br><br>
            🚀 Passionate about bridging scalable MERN web applications with predictive AI/ML algorithms. I specialize in building high-precision NLP pipelines, real-time WebSocket apps, and agentic AI systems.
          </div>
        `);
        break;

      case 'skills':
        this.appendOutput(`
          <div class="text-xs space-y-2 my-2">
            <div><span class="text-purple-400 font-bold">⚡ Languages:</span> Python, JavaScript (ES6+), TypeScript, SQL, HTML5, CSS3</div>
            <div><span class="text-blue-400 font-bold">⚛️ Frontend:</span> React.js, Redux Toolkit, Tailwind CSS, Vite, Bootstrap</div>
            <div><span class="text-emerald-400 font-bold">🌐 Backend & DB:</span> Node.js, Express.js, MongoDB, RESTful APIs, WebSockets (Socket.IO)</div>
            <div><span class="text-pink-400 font-bold">🧠 AI, ML & NLP:</span> Scikit-Learn, NLTK, Generative AI / Agentic Workflows, Pandas, NumPy, Streamlit, OpenCV</div>
            <div><span class="text-amber-400 font-bold">🛠️ Tools & Cloud:</span> Git, GitHub PRO, Cloudinary, Razorpay API, Postman, Linux</div>
          </div>
        `);
        break;

      case 'projects':
        this.appendOutput(`
          <div class="text-xs space-y-2 my-2">
            <div class="text-cyan-300 font-bold mb-1">Featured Production & AI Repositories:</div>
            <div>• <a href="https://github.com/Bhaveshkransan/ShopNest-Ecommerce-MERN" target="_blank" class="text-indigo-400 underline font-semibold">ShopNest-Ecommerce-MERN</a>: Full-Stack MERN + Razorpay payments + Admin Dashboard</div>
            <div>• <a href="https://github.com/Bhaveshkransan/socialhub-ai" target="_blank" class="text-pink-400 underline font-semibold">socialhub-ai</a>: Real-Time MERN + Socket.IO Chat + Cloudinary Media + AI features</div>
            <div>• <a href="https://github.com/Bhaveshkransan/sms-spam-classifier" target="_blank" class="text-emerald-400 underline font-semibold">sms-spam-classifier</a>: 97.1% Accuracy NLP Real-Time Classifier with Streamlit</div>
            <div>• <a href="https://github.com/Bhaveshkransan/FarmGenAI" target="_blank" class="text-amber-400 underline font-semibold">FarmGenAI & Agrinegotiator</a>: Agentic GenAI crop market negotiation platform</div>
            <div>• <a href="https://github.com/Bhaveshkransan/student-wellbeing-predictor" target="_blank" class="text-teal-400 underline font-semibold">student-wellbeing-predictor</a>: Predictive ML for student mental health & stress factors</div>
            <div>• <a href="https://github.com/Bhaveshkransan/EMOTION-DETECTOR" target="_blank" class="text-purple-400 underline font-semibold">EMOTION-DETECTOR</a>: Multimodal facial expression & voice audio emotion analysis</div>
          </div>
        `);
        break;

      case 'stats':
        this.appendOutput(`
          <div class="text-xs space-y-1 my-2 p-2 bg-gray-900/60 rounded border border-gray-800">
            <div>🏆 <span class="text-amber-400 font-bold">LeetCode Handle:</span> <a href="https://leetcode.com/u/kransan/" target="_blank" class="text-indigo-400 underline">kransan</a> (Data Structures & Algorithms)</div>
            <div>⭐ <span class="text-cyan-400 font-bold">GitHub:</span> PRO Member • 25+ Repositories • Active Open-Source Contributor</div>
            <div>🎯 <span class="text-emerald-400 font-bold">Accuracy Metric:</span> 97.1% on Spam Classifier NLP Test Suite</div>
            <div>🟢 <span class="text-green-400 font-bold">Status:</span> Open to Software Engineering & AI Collaborations</div>
          </div>
        `);
        break;

      case 'edu':
        this.appendOutput(`
          <div class="text-xs space-y-2 my-2">
            <div>🎓 <span class="text-white font-bold">Terna Engineering College</span><br><span class="text-gray-400">Computer Engineering Student • Thane / Mumbai, India</span></div>
            <div>🚀 <span class="text-white font-bold">NxtWave's CCBP 4.0 Academy</span><br><span class="text-gray-400">Fellowship in Industry-Ready Full-Stack MERN & AI Engineering</span></div>
          </div>
        `);
        break;

      case 'socials':
        this.appendOutput(`
          <div class="text-xs space-y-1 my-2">
            <div>🔗 <span class="text-cyan-300 font-semibold w-20 inline-block">GitHub:</span> <a href="https://github.com/Bhaveshkransan" target="_blank" class="text-blue-400 hover:underline">github.com/Bhaveshkransan</a></div>
            <div>🔗 <span class="text-cyan-300 font-semibold w-20 inline-block">LinkedIn:</span> <a href="https://www.linkedin.com/in/bhavesh-gangurde-70a02a372" target="_blank" class="text-blue-400 hover:underline">linkedin.com/in/bhavesh-gangurde-70a02a372</a></div>
            <div>🔗 <span class="text-cyan-300 font-semibold w-20 inline-block">LeetCode:</span> <a href="https://leetcode.com/u/kransan/" target="_blank" class="text-blue-400 hover:underline">leetcode.com/u/kransan/</a></div>
            <div>🔗 <span class="text-cyan-300 font-semibold w-20 inline-block">Twitter/X:</span> <a href="https://x.com/BhaveshG18964" target="_blank" class="text-blue-400 hover:underline">@BhaveshG18964</a></div>
            <div>🔗 <span class="text-cyan-300 font-semibold w-20 inline-block">YouTube:</span> <a href="https://www.youtube.com/@Bhavkransan" target="_blank" class="text-blue-400 hover:underline">@Bhavkransan</a></div>
          </div>
        `);
        break;

      case 'contact':
        this.appendOutput(`
          <div class="text-xs space-y-1 my-2">
            <div class="text-emerald-400 font-bold">📬 Let's Connect!</div>
            <div>Email: <a href="mailto:bhaveshg1357@gmail.com" class="text-cyan-300 underline font-semibold">bhaveshg1357@gmail.com</a></div>
            <div>Location: Thane / Mumbai, Maharashtra, India (Open to Onsite/Hybrid/Remote)</div>
          </div>
        `);
        break;

      case 'matrix':
        this.toggleMatrix();
        break;

      case 'whoami':
        this.appendOutput(`<div class="text-xs text-gray-300 my-1">visitor@bhavesh-portfolio (Curious Recruiter / Developer)</div>`);
        break;

      case 'date':
        this.appendOutput(`<div class="text-xs text-gray-300 my-1">${new Date().toString()}</div>`);
        break;

      case 'clear':
        this.outputElement.innerHTML = '';
        this.printWelcome();
        return;

      default:
        this.appendOutput(`
          <div class="text-xs text-red-400 my-1">
            command not found: <span class="text-white">${escapeHtml(cmd)}</span>. Type <span class="text-cyan-300 font-semibold">'help'</span> for list of commands.
          </div>
        `);
        break;
    }

    this.scrollToBottom();
  }

  toggleMatrix() {
    const canvas = document.getElementById('matrix-canvas');
    if (!canvas) return;

    this.matrixActive = !this.matrixActive;
    if (this.matrixActive) {
      canvas.classList.add('active');
      this.appendOutput(`<div class="text-xs text-emerald-400 my-1">⚡ Matrix rain mode activated. Type 'matrix' again or press ESC to exit.</div>`);
      startMatrixRain();
    } else {
      canvas.classList.remove('active');
      this.appendOutput(`<div class="text-xs text-gray-400 my-1">Matrix rain mode deactivated.</div>`);
      stopMatrixRain();
    }
  }

  appendOutput(html) {
    const div = document.createElement('div');
    div.innerHTML = html;
    this.outputElement.appendChild(div);
    this.scrollToBottom();
  }

  scrollToBottom() {
    this.outputElement.scrollTop = this.outputElement.scrollHeight;
  }
}

function escapeHtml(str) {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}

// Matrix Animation Engine
let matrixInterval = null;

function startMatrixRain() {
  const canvas = document.getElementById('matrix-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const letters = '01BHAVESHGANGURDE0101KRANSAN01PYTHONMERNREACT';
  const fontSize = 16;
  const columns = Math.floor(canvas.width / fontSize);
  const drops = Array(columns).fill(1);

  if (matrixInterval) clearInterval(matrixInterval);

  matrixInterval = setInterval(() => {
    ctx.fillStyle = 'rgba(7, 9, 14, 0.08)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#00f2fe';
    ctx.font = fontSize + 'px monospace';

    for (let i = 0; i < drops.length; i++) {
      const text = letters.charAt(Math.floor(Math.random() * letters.length));
      ctx.fillText(text, i * fontSize, drops[i] * fontSize);

      if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i]++;
    }
  }, 33);
}

function stopMatrixRain() {
  if (matrixInterval) {
    clearInterval(matrixInterval);
    matrixInterval = null;
  }
  const canvas = document.getElementById('matrix-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
}

window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    const canvas = document.getElementById('matrix-canvas');
    if (canvas && canvas.classList.contains('active')) {
      canvas.classList.remove('active');
      stopMatrixRain();
    }
  }
});
