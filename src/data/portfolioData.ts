export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  badge: string;
  tagline: string;
  description: string;
  techStack: string[];
  githubUrl: string;
  liveUrl?: string;
  hasLiveDemo: boolean;
  image: string;
}

export interface CertificateItem {
  id: string;
  title: string;
  category: string;
  issuer: string;
  badge: string;
  fileType: string;
  localFile: string;
  description: string;
  skills: string[];
  date?: string;
  image?: string;
}

export const projects: ProjectItem[] = [
  {
    id: "shopnest",
    title: "ShopNest E-Commerce",
    category: "mern",
    badge: "MERN STACK",
    tagline: "Modern E-Commerce with Razorpay & Gemini AI",
    description: "Full-stack e-commerce web platform featuring JWT authentication, Razorpay payments, admin product management, and Cloudinary media pipelines.",
    techStack: ["React", "Node.js", "Express", "MongoDB", "Razorpay", "Cloudinary"],
    githubUrl: "https://github.com/Bhaveshkransan/ShopNest-Ecommerce-MERN",
    hasLiveDemo: false,
    image: "/images/shopnest.webp"
  },
  {
    id: "socialhub",
    title: "SocialHub AI",
    category: "mern",
    badge: "REAL-TIME MERN",
    tagline: "Instant Messaging & Social Platform",
    description: "Full-stack social platform featuring sub-50ms instant messaging via Socket.IO, explore feeds, likes, comments, and dark mode.",
    techStack: ["React", "Node.js", "Express", "MongoDB", "Socket.IO", "Tailwind CSS"],
    githubUrl: "https://github.com/Bhaveshkransan/socialhub-ai",
    hasLiveDemo: false,
    image: "/images/socialhub.webp"
  },
  {
    id: "spam-classifier",
    title: "SMS & Email Spam Classifier",
    category: "ai",
    badge: "MACHINE LEARNING",
    tagline: "NLP Machine Learning Text Classifier",
    description: "NLP-based machine learning classification pipeline with Multinomial Naive Bayes model, text preprocessing, and interactive Streamlit UI.",
    techStack: ["Python", "Scikit-Learn", "NLP", "Pandas", "Streamlit"],
    githubUrl: "https://github.com/Bhaveshkransan",
    hasLiveDemo: false,
    image: "/images/spam_classifier.webp"
  },
  {
    id: "ai-automation",
    title: "AI Response Automation",
    category: "ai",
    badge: "GEN-AI & RPA",
    tagline: "Automated Message Routing & Bot Dispatch",
    description: "Automated social response agent powered by Google Gemini SDK and RPA bots for instant message classification and auto-replies.",
    techStack: ["Google Gemini API", "RPA", "Node.js", "Automation"],
    githubUrl: "https://github.com/Bhaveshkransan",
    hasLiveDemo: false,
    image: "/images/ai_automation.webp"
  },
  {
    id: "kolamsense",
    title: "KolamSense (SIH 2025)",
    category: "frontend",
    badge: "HACKATHON",
    tagline: "Symmetrical Pattern Analysis UI",
    description: "Smart India Hackathon project analyzing symmetrical pattern recognition with computer vision and responsive dashboard UI.",
    techStack: ["React", "Computer Vision", "Tailwind CSS", "Vite"],
    githubUrl: "https://github.com/Bhaveshkransan",
    hasLiveDemo: false,
    image: "/images/kolamsense.webp"
  }
];

export const certificates: CertificateItem[] = [
  {
    id: "cert-oracle",
    title: "Oracle Cloud Data Management Foundations",
    category: "recognized",
    issuer: "Oracle University",
    badge: "Oracle Certified",
    fileType: "pdf",
    localFile: "assets/certificates/Bhavesh_Oracle_Certificate.pdf",
    description: "Certified foundational knowledge in autonomous databases, data warehousing, and cloud data architecture.",
    skills: ["Cloud Databases", "Autonomous DB", "Data Architecture", "SQL"],
    image: "/images/cert_oracle.webp"
  },
  {
    id: "cert-ibm-generative-ai",
    title: "Generative AI: Prompt Engineering Basics",
    category: "ai",
    issuer: "IBM (Coursera)",
    badge: "IBM Verified",
    fileType: "pdf",
    localFile: "assets/certificates/IBM_Generative_AI_Prompt_Engineering_Basics_Certificate.pdf",
    description: "Prompt optimization techniques, zero-shot and few-shot inference, and LLM behavior tuning.",
    skills: ["Prompt Engineering", "LLM Tuning", "Few-Shot Inference", "GenAI"],
    image: "/images/cert_ibm.webp"
  },
  {
    id: "cert-anthropic-claude",
    title: "Anthropic Claude with Amazon Bedrock",
    category: "ai",
    issuer: "Anthropic / AWS Bedrock",
    badge: "Anthropic / AWS",
    fileType: "pdf",
    localFile: "assets/certificates/Anthropic_Claude_with_Amazon_Bedrock_Certificate.pdf",
    description: "Building production LLM architectures using Claude on AWS Bedrock foundation infrastructure.",
    skills: ["Anthropic Claude", "AWS Bedrock", "LLM APIs", "Cloud AI"],
    image: "/images/cert_anthropic.webp"
  },
  {
    id: "cert-mcp-anthropic",
    title: "Model Context Protocol (MCP) Certificate",
    category: "ai",
    issuer: "Anthropic / DeepLearning.AI",
    badge: "Agentic AI",
    fileType: "image",
    localFile: "assets/certificates/Model_Context_Protocol_MCP_Anthropic_Certificate.png",
    description: "Standardized agent tool use and context orchestration with Anthropic Model Context Protocol.",
    skills: ["Model Context Protocol", "Agentic Tooling", "Context Orchestration"],
    image: "/images/cert_mcp.webp"
  },
  {
    id: "cert-agentforce",
    title: "Salesforce Agentforce Specialist",
    category: "ai",
    issuer: "Salesforce Trailhead",
    badge: "Salesforce",
    fileType: "pdf",
    localFile: "assets/certificates/Agentforce_Specialist_Salesforce_Certificate.pdf",
    description: "Autonomous CRM agents, action orchestration, and enterprise customer automation.",
    skills: ["Agentforce", "Autonomous Agents", "Workflow Automation"],
    image: "/images/cert_agentforce.webp"
  },
  {
    id: "cert-wocs",
    title: "Winter of Code & Science (WoCS)",
    category: "hackathon",
    issuer: "WoCS Open Source Initiative",
    badge: "Open Source",
    fileType: "pdf",
    localFile: "assets/certificates/Bhavesh_Gangurde_WoCS_Certificate.pdf",
    description: "Selected contributor for open-source engineering during the winter development sprint.",
    skills: ["Open Source", "Git & GitHub", "Code Review", "Collaboration"],
    image: "/images/cert_wocs.webp"
  },
  {
    id: "cert-nxtwave-python",
    title: "Programming Foundations with Python",
    category: "fellowship",
    issuer: "NxtWave CCBP 4.0 Academy",
    badge: "Python Mastery",
    fileType: "pdf",
    localFile: "assets/certificates/NxtWave_Python_Programming_Foundations_Certificate.pdf",
    description: "Object-oriented programming, data structures, and algorithmic scripting in Python.",
    skills: ["Python", "OOP", "Algorithm Scripting", "Data Structures"],
    image: "/images/cert_python.webp"
  },
  {
    id: "cert-nxtwave-web",
    title: "Build Your Own Static & Dynamic Web",
    category: "fellowship",
    issuer: "NxtWave CCBP 4.0 Academy",
    badge: "Frontend Dev",
    fileType: "pdf",
    localFile: "assets/certificates/NxtWave_Build_Your_Own_Static_Web_Certificate.pdf",
    description: "Modern responsive web layouts, semantic HTML5, CSS3 flexbox/grid, and JavaScript DOM manipulation.",
    skills: ["HTML5", "CSS3", "JavaScript DOM", "Responsive UI"],
    image: "/images/cert_nxtwave.webp"
  }
];
