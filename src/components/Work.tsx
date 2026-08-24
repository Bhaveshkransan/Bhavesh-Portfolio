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
                Comprehensive e-commerce platform with JWT auth, Razorpay payments, admin product management, and Cloudinary image pipelines.
              </p>
            </div>
            <WorkImage image="/images/shopnest.png" alt="ShopNest" link="https://github.com/Bhaveshkransan/ShopNest-Ecommerce-MERN" />
          </div>

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
                Full-featured social platform featuring sub-50ms instant chat, media feeds, interactive likes/comments, and dark mode UI.
              </p>
            </div>
            <WorkImage image="/images/socialhub.png" alt="SocialHub AI" link="https://github.com/Bhaveshkransan/socialhub-ai" />
          </div>

          <div className="work-box">
            <div className="work-info">
              <div className="work-title">
                <h3>03</h3>
                <div>
                  <h4>AI Response Automation</h4>
                  <p>Google Gemini &amp; RPA</p>
                </div>
              </div>
              <p>
                Automated social response agent powered by Google Gemini SDK and RPA bots for instant message classification and auto-replies.
              </p>
            </div>
            <WorkImage image="/images/ai-automation.png" alt="AI Automation" link="https://github.com/Bhaveshkransan" />
          </div>

          <div className="work-box">
            <div className="work-info">
              <div className="work-title">
                <h3>04</h3>
                <div>
                  <h4>KolamSense (SIH)</h4>
                  <p>Computer Vision &amp; Web</p>
                </div>
              </div>
              <p>
                Smart India Hackathon project analyzing symmetrical pattern recognition with computer vision and responsive dashboard UI.
              </p>
            </div>
            <WorkImage image="/images/kolamsense.png" alt="KolamSense" link="https://github.com/Bhaveshkransan" />
          </div>

        </div>
      </div>
    </div>
  );
};

export default Work;
