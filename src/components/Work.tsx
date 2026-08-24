import "./styles/Work.css";
import WorkImage from "./WorkImage";

const Work = () => {
  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <h2>
          My <span>Work</span>
        </h2>
        <div className="work-flex">
          
          {/* 01: ShopNest */}
          <div className="work-box">
            <div className="work-info">
              <div className="work-title">
                <h3>01</h3>
                <div>
                  <h4>ShopNest E-Commerce</h4>
                  <p>Full-Stack MERN &amp; Razorpay</p>
                </div>
              </div>
              <p>
                Comprehensive e-commerce platform with JWT auth, Razorpay payments, admin product management, and Cloudinary media pipelines.
              </p>
            </div>
            <WorkImage
              image="/images/shopnest.webp"
              alt="ShopNest E-Commerce"
              link="https://github.com/Bhaveshkransan/ShopNest-Ecommerce-MERN"
            />
          </div>

          {/* 02: SocialHub AI */}
          <div className="work-box">
            <div className="work-info">
              <div className="work-title">
                <h3>02</h3>
                <div>
                  <h4>SocialHub AI</h4>
                  <p>Real-Time MERN &amp; Socket.IO</p>
                </div>
              </div>
              <p>
                Full-featured social platform featuring sub-50ms instant messaging via Socket.IO, explore feeds, likes, comments, and dark mode.
              </p>
            </div>
            <WorkImage
              image="/images/socialhub.webp"
              alt="SocialHub AI"
              link="https://github.com/Bhaveshkransan/socialhub-ai"
            />
          </div>

          {/* 03: SMS & Email Spam Classifier */}
          <div className="work-box">
            <div className="work-info">
              <div className="work-title">
                <h3>03</h3>
                <div>
                  <h4>SMS &amp; Email Spam Classifier</h4>
                  <p>Machine Learning &amp; Python NLP</p>
                </div>
              </div>
              <p>
                NLP-based machine learning classification pipeline with Multinomial Naive Bayes model, text preprocessing, and interactive Streamlit UI.
              </p>
            </div>
            <WorkImage
              image="/images/spam_classifier.webp"
              alt="SMS & Email Spam Classifier"
              link="https://github.com/Bhaveshkransan"
            />
          </div>

          {/* 04: AI Response Automation */}
          <div className="work-box">
            <div className="work-info">
              <div className="work-title">
                <h3>04</h3>
                <div>
                  <h4>AI Response Automation</h4>
                  <p>Google Gemini &amp; RPA</p>
                </div>
              </div>
              <p>
                Automated social response agent powered by Google Gemini SDK and RPA bots for instant message classification and auto-replies.
              </p>
            </div>
            <WorkImage
              image="/images/ai_automation.webp"
              alt="AI Response Automation"
              link="https://github.com/Bhaveshkransan"
            />
          </div>

          {/* 05: KolamSense SIH */}
          <div className="work-box">
            <div className="work-info">
              <div className="work-title">
                <h3>05</h3>
                <div>
                  <h4>KolamSense (SIH 2025)</h4>
                  <p>Computer Vision &amp; Web</p>
                </div>
              </div>
              <p>
                Smart India Hackathon project analyzing symmetrical pattern recognition with computer vision and responsive dashboard UI.
              </p>
            </div>
            <WorkImage
              image="/images/kolamsense.webp"
              alt="KolamSense SIH"
              link="https://github.com/Bhaveshkransan"
            />
          </div>

        </div>
      </div>
    </div>
  );
};

export default Work;
