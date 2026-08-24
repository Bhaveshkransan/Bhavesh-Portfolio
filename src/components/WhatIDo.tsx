import { useEffect, useRef } from "react";
import "./styles/WhatIDo.css";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const WhatIDo = () => {
  const containerRef = useRef<(HTMLDivElement | null)[]>([]);
  const setRef = (el: HTMLDivElement | null, index: number) => {
    containerRef.current[index] = el;
  };
  useEffect(() => {
    if (ScrollTrigger.isTouch) {
      containerRef.current.forEach((container) => {
        if (container) {
          container.classList.remove("what-noTouch");
          container.addEventListener("click", () => handleClick(container));
        }
      });
    }
    function handleClick(container: HTMLDivElement) {
      containerRef.current.forEach((c) => {
        if (c !== container) {
          c?.classList.remove("what-content-active");
          c?.classList.remove("what-sibling");
        }
      });
      container.classList.toggle("what-content-active");
      containerRef.current.forEach((c) => {
        if (c !== container) {
          c?.classList.toggle("what-sibling");
        }
      });
    }
  }, []);
  return (
    <div className="whatIDO">
      <div className="what-box">
        <h2 className="title">
          W<span className="hat-h2">HAT</span>
          <div>I DO</div>
        </h2>
      </div>
      <div className="what-box">
        <div className="what-box-in">
          
          <div className="what-content what-noTouch" ref={(el) => setRef(el, 0)}>
            <div className="what-border1">
              <svg height="100%">
                <line x1="0" y1="0" x2="100%" y2="0" stroke="white" strokeWidth="2" strokeDasharray="6,6" />
                <line x1="0" y1="100%" x2="100%" y2="100%" stroke="white" strokeWidth="2" strokeDasharray="6,6" />
              </svg>
            </div>
            <div className="what-corner"></div>
            <div className="what-content-in">
              <h3>FULL-STACK ARCHITECTURE</h3>
              <h4>MERN &amp; REAL-TIME WEBSOCKETS</h4>
              <p>
                Engineering production-grade applications with React, Node.js, Express, MongoDB, and Socket.IO real-time bi-directional messaging with secure JWT authentication and Razorpay payment integration.
              </p>
              <h5>SKILLS</h5>
              <div className="what-content-flex">
                <span className="what-tags">React.js</span>
                <span className="what-tags">Node.js</span>
                <span className="what-tags">Express.js</span>
                <span className="what-tags">MongoDB</span>
                <span className="what-tags">Socket.IO</span>
                <span className="what-tags">Redux Toolkit</span>
              </div>
              <div className="what-arrow"></div>
            </div>
          </div>

          <div className="what-content what-noTouch" ref={(el) => setRef(el, 1)}>
            <div className="what-border1">
              <svg height="100%">
                <line x1="0" y1="0" x2="100%" y2="0" stroke="white" strokeWidth="2" strokeDasharray="6,6" />
                <line x1="0" y1="100%" x2="100%" y2="100%" stroke="white" strokeWidth="2" strokeDasharray="6,6" />
              </svg>
            </div>
            <div className="what-corner"></div>
            <div className="what-content-in">
              <h3>GENERATIVE AI &amp; RPA</h3>
              <h4>AGENTIC WORKFLOWS &amp; LLMS</h4>
              <p>
                Designing autonomous agentic workflows, multi-step prompt chains with Google Gemini GenAI API, and Robotic Process Automation (RPA) for automated message routing and intelligent operations.
              </p>
              <h5>SKILLS</h5>
              <div className="what-content-flex">
                <span className="what-tags">Google Gemini API</span>
                <span className="what-tags">RPA Automation</span>
                <span className="what-tags">Agentic AI</span>
                <span className="what-tags">Prompt Chains</span>
                <span className="what-tags">MCP</span>
              </div>
              <div className="what-arrow"></div>
            </div>
          </div>

          <div className="what-content what-noTouch" ref={(el) => setRef(el, 2)}>
            <div className="what-border1">
              <svg height="100%">
                <line x1="0" y1="0" x2="100%" y2="0" stroke="white" strokeWidth="2" strokeDasharray="6,6" />
                <line x1="0" y1="100%" x2="100%" y2="100%" stroke="white" strokeWidth="2" strokeDasharray="6,6" />
              </svg>
            </div>
            <div className="what-corner"></div>
            <div className="what-content-in">
              <h3>DSA &amp; PROBLEM SOLVING</h3>
              <h4>C++ STL &amp; COMPLEXITY OPTIMIZATION</h4>
              <p>
                Solving complex data structures &amp; algorithmic challenges in C++ with 40+ solved LeetCode problems and rigorous mathematical problem solving.
              </p>
              <h5>SKILLS</h5>
              <div className="what-content-flex">
                <span className="what-tags">C++ (STL)</span>
                <span className="what-tags">LeetCode</span>
                <span className="what-tags">Arrays &amp; Maps</span>
                <span className="what-tags">Binary Search</span>
                <span className="what-tags">Trees</span>
              </div>
              <div className="what-arrow"></div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default WhatIDo;
