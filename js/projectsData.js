/**
 * Bhavesh Bajirao Gangurde - Official Portfolio Dataset
 * Sourced directly from local downloaded PDFs & verified credentials
 */

const portfolioData = {
  profile: {
    name: "BHAVESH BAJIRAO GANGURDE",
    tagline: "Computer Engineering Student | Full-Stack MERN & AI Developer",
    location: "Thane, Maharashtra, India",
    primaryPhone: "+91 9653605492",
    secondaryPhone: "+91 9769611606",
    email: "bhaveshg1357@gmail.com",
    socials: {
      linkedin: "https://www.linkedin.com/in/bhavesh-gangurde-70a02a372",
      github: "https://github.com/Bhaveshkransan",
      twitter: "https://x.com/Bhaveshkransan",
      youtube: "https://www.youtube.com/@Bhavkransan",
      leetcode: "https://leetcode.com/u/kransan",
      devpost: "https://devpost.com/bhaveshg1357?ref_content=user-portfolio&ref_feature=portfolio&ref_medium=global-nav",
      facebook: "https://www.facebook.com/profile.php?id=61571140585920",
      certificatesDriveUrl: "https://drive.google.com/drive/folders/1LvGpQXChESZ1l1ibboW_HQfRz2XLYyaD"
    }
  },
  
  college: {
    institution: "Terna Engineering College, Nerul | University of Mumbai",
    degree: "B.E. Computer Engineering",
    graduation: "Expected 2027",
    cgpa: "8.12 (up to Semester 4)",
    activities: [
      {
        title: "Smart India Hackathon (SIH)",
        role: "Project: KolamSense (Rangoli Pattern Recognition)",
        detail: "Engineered pattern recognition concept selected for the internal college evaluation round.",
        badge: "Hackathon"
      },
      {
        title: "Training & Placement Committee (T&P)",
        role: "Student Coordinator",
        detail: "Hosted 2 college-wide events and assisted with student placement coordination and corporate communications.",
        badge: "Leadership"
      },
      {
        title: "Computer Society of India (CSI) Member",
        role: "Active Member & Volunteer",
        detail: "Participated in technical oratory competitions, campus event supervision, tech volunteering, and community activities.",
        badge: "Oratory & Volunteering"
      }
    ],
    priorEducation: [
      { institution: "Wamanrao Muranjan College", degree: "HSC (Science)", score: "72%" },
      { institution: "Navodaya English High School & Junior College", degree: "SSC", score: "86%" }
    ]
  }
};

const projectsData = [
  {
    id: "shopnest-ecommerce",
    title: "ShopNest — Full-Stack E-Commerce Platform",
    tagline: "Full-stack e-commerce platform with JWT Auth, Razorpay Payments & Admin Dashboard",
    category: "mern",
    description: "Built a full-stack e-commerce application with JWT-based authentication and role-based access control. Implemented product search and filtering, shopping cart, order tracking/history, and Razorpay payment integration. Developed an admin dashboard for product, order, and user management; integrated Cloudinary for media uploads.",
    highlights: [
      "JWT-based authentication with role-based access control (Admin / Customer)",
      "Razorpay payment gateway integration with server-side signature verification",
      "Admin dashboard for product catalog, stock inventory, and order fulfillment",
      "Cloudinary CDN image integration for product asset uploads"
    ],
    techStack: ["React.js", "Node.js", "Express.js", "MongoDB", "Redux", "JWT", "Razorpay", "Cloudinary"],
    githubUrl: "https://github.com/Bhaveshkransan/ShopNest-Ecommerce-MERN",
    liveUrl: "https://shopnest-ecommerce-mern.onrender.com",
    badge: "Live Website",
    hasLiveDemo: true
  },
  {
    id: "socialhub-ai",
    title: "SocialHub AI — Full-Stack Social Platform",
    tagline: "Real-Time Social Application with Socket.IO & Cloudinary",
    category: "mern",
    description: "Built a social platform with real-time messaging using Socket.IO and secure JWT authentication. Implemented image/video uploads, explore feed, responsive UI, dark mode, and Redux Toolkit state management. Integrated a Node.js/Express.js backend with MongoDB for application and user data.",
    highlights: [
      "Real-time instant messaging using Socket.IO bi-directional communication",
      "Cloudinary integration for optimized photo/video feeds and uploads",
      "Redux Toolkit global state management and theme toggling",
      "RESTful API backend with Express.js and MongoDB database"
    ],
    techStack: ["React.js", "Vite", "Tailwind CSS", "Redux Toolkit", "Node.js", "Express.js", "MongoDB", "Socket.IO", "Cloudinary", "JWT"],
    githubUrl: "https://github.com/Bhaveshkransan/socialhub-ai",
    liveUrl: "https://socialhub-ai-ten.vercel.app",
    badge: "Live Website",
    hasLiveDemo: true
  },
  {
    id: "ai-automation-system",
    title: "AI Response Automation System",
    tagline: "AI Workflow Automation using Robotic Process Automation (RPA) & Generative AI",
    category: "ai",
    description: "Built AI-powered automation workflows for platform-specific response generation across Instagram, LinkedIn, and Facebook. Designed context-aware response logic using Generative AI (LLMs) and engineered agentic workflows and Robotic Process Automation (RPA) for seamless social automation.",
    highlights: [
      "Multi-platform automated workflows across Instagram, LinkedIn, and Facebook",
      "Context-aware response prompt chains tailored to audience tone",
      "Agentic workflow logic built with Generative AI (LLMs) and multi-step reasoning",
      "Robotic Process Automation (RPA) for automated message routing, lead capture, and response orchestration"
    ],
    techStack: ["Robotic Process Automation (RPA)", "Generative AI", "Agentic AI", "LLM APIs", "Python", "Automation Scripts"],
    githubUrl: "https://github.com/Bhaveshkransan",
    liveUrl: "https://github.com/Bhaveshkransan",
    badge: "AI & Automation",
    hasLiveDemo: false
  },
  {
    id: "sms-spam-classifier",
    title: "SMS & Email Spam Classifier",
    tagline: "NLP Machine Learning Text Classification Project",
    category: "ai",
    description: "A machine learning project built with Python and Scikit-Learn to explore NLP text processing. Utilized TF-IDF vectorization and Naive Bayes / Random Forest algorithms, deployed via Streamlit.",
    highlights: [
      "Explored text tokenization, stop-word removal, and TF-IDF feature extraction",
      "Trained classification models with Scikit-Learn on benchmark SMS dataset",
      "Built an interactive testing interface using Streamlit"
    ],
    techStack: ["Python", "Scikit-Learn", "NLTK", "TF-IDF", "Streamlit", "Pandas"],
    githubUrl: "https://github.com/Bhaveshkransan/sms-spam-classifier",
    liveUrl: "https://github.com/Bhaveshkransan/sms-spam-classifier",
    badge: "Python ML Project",
    hasLiveDemo: false
  },
  {
    id: "student-wellbeing",
    title: "Student Wellbeing Predictor",
    tagline: "Academic Stress & Behavioral Data Analysis (EDA & ML)",
    category: "ai",
    description: "Predictive ML project analyzing student lifestyle metrics (sleep, study hours, academic pressure) to study correlations with stress and wellbeing indices in Jupyter.",
    highlights: [
      "Exploratory data analysis with Pandas, Matplotlib, and Seaborn",
      "Feature engineering analyzing lifestyle patterns and academic scores",
      "Supervised ML classification modeling"
    ],
    techStack: ["Python", "Pandas", "Scikit-Learn", "Matplotlib", "Jupyter Notebook"],
    githubUrl: "https://github.com/Bhaveshkransan/student-wellbeing-predictor",
    liveUrl: "https://github.com/Bhaveshkransan/student-wellbeing-predictor",
    badge: "Data Analysis",
    hasLiveDemo: false
  },
  {
    id: "wikipedia-search-app",
    title: "Wikipedia Instant Search",
    tagline: "Client-Side Asynchronous Query Engine with Fetch API",
    category: "frontend",
    description: "A JavaScript application that dynamically searches Wikipedia articles using Fetch API with debounced user input and DOM rendering.",
    highlights: [
      "Debounced search input preventing redundant API requests",
      "Asynchronous Fetch API call handling with dynamic list injection",
      "Clean responsive layout with vanilla JavaScript"
    ],
    techStack: ["JavaScript", "Fetch API", "HTML5", "CSS3"],
    githubUrl: "https://github.com/Bhaveshkransan/wikipedia-search-app",
    liveUrl: "https://github.com/Bhaveshkransan/wikipedia-search-app",
    badge: "JavaScript DOM",
    hasLiveDemo: false
  },
  {
    id: "defusebomb",
    title: "Defuse Bomb Web Game",
    tagline: "Countdown Timer Interval Game with JavaScript",
    category: "frontend",
    description: "Interactive browser game built with JavaScript setInterval countdown timers, code verification logic, and dynamic game over/defused states.",
    highlights: [
      "Interval state machine managing timer countdown",
      "Input validation and event listeners",
      "Pure vanilla JavaScript implementation"
    ],
    techStack: ["JavaScript", "HTML5", "CSS3", "DOM Events"],
    githubUrl: "https://github.com/Bhaveshkransan/defusebomb",
    liveUrl: "https://github.com/Bhaveshkransan/defusebomb",
    badge: "Interactive Game",
    hasLiveDemo: false
  }
];

const certificatesData = [
  {
    id: "oracle-cert",
    title: "Oracle Certified Foundations Associate",
    issuer: "Oracle University",
    category: "recognized",
    badge: "Industry Standard • Oracle",
    badgeColor: "bg-red-50 text-red-700 border-red-200",
    description: "Certified proficiency in enterprise relational database modeling, Oracle SQL query optimization, database design architecture, and cloud infrastructure.",
    skills: ["Oracle SQL", "Relational Database Design", "DBMS", "Enterprise Systems"],
    localFile: "certificates/OracleCertificate.jpg",
    fileType: "image",
    isFeatured: true
  },
  {
    id: "ibm-skillsbuild",
    title: "IBM SkillsBuild Professional Certificate",
    issuer: "IBM SkillsBuild",
    category: "recognized",
    badge: "Industry Leader • IBM",
    badgeColor: "bg-blue-50 text-blue-700 border-blue-200",
    description: "Credential for completing professional technology foundation courses in enterprise software practices and cloud workflows on IBM SkillsBuild.",
    skills: ["Cloud Foundations", "Enterprise IT", "Software Engineering", "IBM SkillsBuild"],
    localFile: "certificates/Completion Certificate _ SkillsBuild IBM (1).pdf",
    fileType: "pdf",
    isFeatured: true
  },
  {
    id: "anthropic-cert",
    title: "Anthropic AI & LLM Systems Certification",
    issuer: "Anthropic",
    category: "ai",
    badge: "AI & LLM • Anthropic",
    badgeColor: "bg-purple-50 text-purple-700 border-purple-200",
    description: "Certified understanding of foundational Generative AI architectures, prompt engineering, context management, and Anthropic Claude AI capabilities.",
    skills: ["Generative AI", "Prompt Engineering", "Claude API", "LLM Systems"],
    localFile: "certificates/Anthropic.pdf",
    fileType: "pdf",
    isFeatured: true
  },
  {
    id: "agentblazer-cert",
    title: "Agentforce AI AgentBlazer Champion",
    issuer: "Salesforce / Agentforce",
    category: "ai",
    badge: "Autonomous Agents",
    badgeColor: "bg-indigo-50 text-indigo-700 border-indigo-200",
    description: "Certified badge for autonomous AI agent architectures, action triggers, tool integrations, and agentic workflows.",
    skills: ["AI Agents", "Autonomous Workflows", "Agentforce", "LLM Actions"],
    localFile: "certificates/AgentBlazerCertificate.png",
    fileType: "image",
    isFeatured: true
  },
  {
    id: "mcp-project-cert",
    title: "Model Context Protocol (MCP) Project Completion",
    issuer: "Model Context Protocol (MCP)",
    category: "ai",
    badge: "MCP Certified",
    badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
    description: "Certified completion of technical implementation using the Model Context Protocol (MCP) for connecting AI models to external tools and data sources.",
    skills: ["Model Context Protocol (MCP)", "Tool Calling", "Context Servers", "AI Integrations"],
    localFile: "certificates/mcpProjectCompletion.png",
    fileType: "image",
    isFeatured: true
  },
  {
    id: "nxtwave-streak",
    title: "NxtWave 180-Day Continuous Learning Streak",
    issuer: "NxtWave Academy",
    category: "fellowship",
    badge: "🔥 180-Day Milestone",
    badgeColor: "bg-amber-50 text-amber-700 border-amber-200",
    description: "Awarded official milestone badge for maintaining an unbroken 180-day streak of daily problem-solving and full-stack software development.",
    skills: ["Daily Consistency", "Full-Stack Development", "Problem Solving", "Continuous Learning"],
    localFile: "assets/nxtwave-streak-180.png",
    fileType: "image",
    isFeatured: true
  },
  {
    id: "nxtwave-javascript",
    title: "NxtWave CCBP JavaScript Essentials & Algorithms",
    issuer: "NxtWave CCBP 4.0 Academy",
    category: "fellowship",
    badge: "JavaScript Certified",
    badgeColor: "bg-yellow-50 text-yellow-800 border-yellow-200",
    description: "Certification in modern JavaScript (ES6+), asynchronous closures, DOM manipulation, promises, and dynamic frontend interactions.",
    skills: ["JavaScript ES6+", "DOM Manipulation", "Async/Await", "Event Handling"],
    localFile: "certificates/NxtwaveJavacript1.pdf",
    fileType: "pdf",
    isFeatured: false
  },
  {
    id: "python-cert",
    title: "Python Programming & Data Structures Certification",
    issuer: "NxtWave / Technical Academy",
    category: "recognized",
    badge: "Python Core",
    badgeColor: "bg-blue-50 text-blue-700 border-blue-200",
    description: "Certified proficiency in Python programming fundamentals, object-oriented programming, data structures, and algorithmic logic.",
    skills: ["Python", "OOP", "Data Structures", "Algorithms"],
    localFile: "certificates/Python.pdf",
    fileType: "pdf",
    isFeatured: false
  },
  {
    id: "responsive-web-cert",
    title: "Responsive Web Design & Modern Layouts",
    issuer: "NxtWave CCBP 4.0 Academy",
    category: "fellowship",
    badge: "Frontend Certified",
    badgeColor: "bg-cyan-50 text-cyan-700 border-cyan-200",
    description: "Certification in responsive web architecture, CSS Grid, Flexbox, media queries, and pixel-perfect modern web layouts.",
    skills: ["Responsive Design", "CSS3", "Flexbox", "Bootstrap", "HTML5"],
    localFile: "certificates/ResponsiveWebsite.pdf",
    fileType: "pdf",
    isFeatured: false
  },
  {
    id: "buildathon-hackathon",
    title: "Buildathon Hackathon Engineering Certificate",
    issuer: "Buildathon / Tech Community",
    category: "hackathon",
    badge: "Hackathon Build",
    badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
    description: "Recognition for intense product development and project deployment during high-paced tech buildathon hackathon.",
    skills: ["Rapid Engineering", "Full-Stack Deployment", "Hackathon Collaboration"],
    localFile: "certificates/Buildathon.jpeg",
    fileType: "image",
    isFeatured: false
  },
  {
    id: "wocs-open-source",
    title: "Winter of Code & Open Source (WoCS 2025)",
    issuer: "Winter of Code 2025",
    category: "hackathon",
    badge: "Open Source Contributor",
    badgeColor: "bg-purple-50 text-purple-700 border-purple-200",
    description: "Certificate of contribution to open-source software repositories during the Winter of Code 2025 initiative.",
    skills: ["Open Source", "Git & GitHub", "Pull Requests", "Code Review"],
    localFile: "certificates/WoCS2025_contributor_Bhavesh_Gangurde.png",
    fileType: "image",
    isFeatured: false
  },
  {
    id: "rpa-completion",
    title: "Robotic Process Automation (RPA) Master Certificate",
    issuer: "Automation Academy",
    category: "ai",
    badge: "RPA Automation",
    badgeColor: "bg-amber-50 text-amber-700 border-amber-200",
    description: "Comprehensive certification in RPA workflow development, process automation, bot orchestration, and automated data pipelines.",
    skills: ["RPA", "Process Automation", "Workflow Design", "Bot Automation"],
    localFile: "certificates/RPAcompletion.pdf",
    fileType: "pdf",
    isFeatured: false
  }
];

if (typeof module !== "undefined" && module.exports) {
  module.exports = { portfolioData, projectsData, certificatesData };
}
