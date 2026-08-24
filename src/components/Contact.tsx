import { MdArrowOutward } from "react-icons/md";
import "./styles/Contact.css";

const Contact = () => {
  return (
    <div className="contact-section section-container" id="contact">
      <div className="contact-container">
        <h3>
          LET'S BUILD <br />
          <span>SOMETHING TOGETHER</span>
        </h3>
        <div className="contact-flex">
          <div className="contact-box">
            <h4>EMAIL DIRECT</h4>
            <h2>
              <a href="mailto:bhaveshg1357@gmail.com" target="_blank" rel="noreferrer">
                bhaveshg1357@gmail.com
              </a>
            </h2>
            <p>
              Open to Software Engineering Internships, AI Engineering, and full-stack builds.
            </p>
          </div>
          <div className="contact-box">
            <h4>SOCIAL PLATFORMS</h4>
            <h5>
              <a
                href="https://github.com/Bhaveshkransan"
                target="_blank"
                rel="noreferrer"
                className="contact-social"
              >
                GitHub <MdArrowOutward />
              </a>
              <a
                href="https://www.linkedin.com/in/bhavesh-gangurde-70a02a372"
                target="_blank"
                rel="noreferrer"
                className="contact-social"
              >
                LinkedIn <MdArrowOutward />
              </a>
              <a
                href="https://x.com/Bhaveshkransan"
                target="_blank"
                rel="noreferrer"
                className="contact-social"
              >
                X (Twitter) <MdArrowOutward />
              </a>
              <a
                href="https://leetcode.com/u/kransan"
                target="_blank"
                rel="noreferrer"
                className="contact-social"
              >
                LeetCode <MdArrowOutward />
              </a>
              <a
                href="https://devpost.com/bhaveshg1357"
                target="_blank"
                rel="noreferrer"
                className="contact-social"
              >
                Devpost <MdArrowOutward />
              </a>
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
