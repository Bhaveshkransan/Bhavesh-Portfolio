import { projects, certificates } from "../data/portfolioData";
import WorkImage from "./WorkImage";
import "./styles/Work.css";

const Work = () => {
  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <h2>
          My <span>Work &amp; Credentials</span>
        </h2>

        {/* ===================================================================
            ROW 1: FEATURED PROJECTS SLIDING WINDOW
            =================================================================== */}
        <div className="work-row-wrapper">
          <div className="work-row-header">
            <h3>01 / FEATURED PROJECTS</h3>
            <span className="work-row-hint">← Drag or Scroll Horizontally →</span>
          </div>

          <div className="work-slider-track">
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
                  <p>{p.description}</p>
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
        <div className="work-row-wrapper" style={{ marginTop: "60px" }}>
          <div className="work-row-header">
            <h3>02 / VERIFIED CERTIFICATIONS</h3>
            <span className="work-row-hint">← Drag or Scroll Horizontally →</span>
          </div>

          <div className="work-slider-track">
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
                  <p>{c.description}</p>
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
