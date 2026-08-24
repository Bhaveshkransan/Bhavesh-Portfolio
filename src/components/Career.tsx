import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container" id="career">
      <div className="career-container">
        <h2>
          My career <span>&amp;</span>
          <br /> experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>

          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>B.E. Computer Engineering</h4>
                <h5>Terna Engineering College • Mumbai University</h5>
              </div>
              <h3>2027</h3>
            </div>
            <p>
              Maintaining an academic score of <strong>8.12 CGPA</strong>. Serving as Training &amp; Placement Coordinator and active developer in college tech events.
            </p>
          </div>

          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Smart India Hackathon (SIH)</h4>
                <h5>KolamSense Project • Full-Stack Lead</h5>
              </div>
              <h3>2025</h3>
            </div>
            <p>
              Spearheaded full-stack architecture for KolamSense, connecting computer vision model outputs to an asynchronous responsive web interface.
            </p>
          </div>

          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>AI &amp; Automation Developer</h4>
                <h5>Generative AI &amp; RPA Agentic Workflows</h5>
              </div>
              <h3>2024</h3>
            </div>
            <p>
              Engineered automated response workflows across social platforms using Google Gemini APIs and RPA bots, reducing response turnaround times by over 80%.
            </p>
          </div>

          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>180-Day Dev Streak Milestone</h4>
                <h5>Daily Engineering Consistency</h5>
              </div>
              <h3>NOW</h3>
            </div>
            <p>
              Maintained an unbroken 180-day streak of daily software engineering, building production-grade MERN applications like ShopNest and SocialHub AI.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Career;
