import { useRef } from "react";
import { projects, certificates } from "../data/portfolioData";
import WorkImage from "./WorkImage";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import "./styles/Work.css";

const Work = () => {
  const projectsTrackRef = useRef<HTMLDivElement>(null);
  const certsTrackRef = useRef<HTMLDivElement>(null);

  const slide = (ref: React.RefObject<HTMLDivElement>, direction: "left" | "right") => {
    if (ref.current) {
      const scrollAmount = 450;
      ref.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="work-section" id="work">
      <div className="work-container">
        <h2>
          My <span>Work &amp; Credentials</span>
        </h2>

        {/* ===================================================================
            ROW 1: FEATURED PROJECTS SLIDING WINDOW
            =================================================================== */}
        <div className="work-row-wrapper">
          <div className="work-row-header">
            <div>
              <h3>01 / FEATURED PROJECTS</h3>
              <p className="work-row-sub">Production-grade full-stack MERN, NLP machine learning, and AI agent architectures</p>
            </div>

            <div className="work-controls">
              <button
                className="work-arrow-btn"
                onClick={() => slide(projectsTrackRef, "left")}
                aria-label="Previous Projects"
              >
                <LuChevronLeft />
              </button>
              <button
                className="work-arrow-btn"
                onClick={() => slide(projectsTrackRef, "right")}
                aria-label="Next Projects"
              >
                <LuChevronRight />
              </button>
            </div>
          </div>

          <div className="work-slider-track" ref={projectsTrackRef}>
            {projects.map((p, idx) => (
              <div className="work-box" key={p.id}>
                <div className="work-info">
                  <div className="work-title">
                    <h3>{String(idx + 1).padStart(2, "0")}</h3>
                    <div>
                      <h4>{p.title}</h4>
                      <p>{p.tagline}</p>
                    </div>
                  </div>
                  <p className="work-desc">{p.description}</p>
                  <div className="work-tech-tags">
                    {p.techStack.map((tech) => (
                      <span key={tech} className="work-tech-pill">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <WorkImage
                  image={p.image}
                  alt={p.title}
                  link={p.githubUrl}
                />
              </div>
            ))}
          </div>
        </div>

        {/* ===================================================================
            ROW 2: VERIFIED CERTIFICATIONS SLIDING WINDOW
            =================================================================== */}
        <div className="work-row-wrapper" style={{ marginTop: "70px" }}>
          <div className="work-row-header">
            <div>
              <h3>02 / VERIFIED CERTIFICATIONS</h3>
              <p className="work-row-sub">Industry authenticated credentials in Cloud, AI Prompt Engineering, and Full-Stack</p>
            </div>

            <div className="work-controls">
              <button
                className="work-arrow-btn cert-arrow-btn"
                onClick={() => slide(certsTrackRef, "left")}
                aria-label="Previous Certificates"
              >
                <LuChevronLeft />
              </button>
              <button
                className="work-arrow-btn cert-arrow-btn"
                onClick={() => slide(certsTrackRef, "right")}
                aria-label="Next Certificates"
              >
                <LuChevronRight />
              </button>
            </div>
          </div>

          <div className="work-slider-track" ref={certsTrackRef}>
            {certificates.map((c, idx) => (
              <div className="work-box cert-box" key={c.id}>
                <div className="work-info">
                  <div className="work-title">
                    <h3>{String(idx + 1).padStart(2, "0")}</h3>
                    <div>
                      <h4>{c.title}</h4>
                      <p className="cert-issuer">{c.issuer}</p>
                    </div>
                  </div>
                  <p className="work-desc">{c.description}</p>
                  <div className="work-tech-tags">
                    {c.skills.map((skill) => (
                      <span key={skill} className="work-tech-pill cert-pill">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <WorkImage
                  image={c.image || "/images/placeholder.webp"}
                  alt={c.title}
                  link={c.localFile}
                />
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Work;
