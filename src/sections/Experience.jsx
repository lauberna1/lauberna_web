import React from "react";
import { FaRocket, FaLeaf } from "react-icons/fa";
import s from "./css/Experience.module.css";
import { experiences } from "../data/experience";
import { MdOpenInNew } from "react-icons/md";
const iconMap = {
  rocket: <FaRocket />,
  pulse: <FaLeaf />,
};

const Experience = () => {
  return (
    <section id="experience" className={s.section}>
      <div className={s.inner}>
        <header className={s.header}>
          <h2 className={s.title}>Experiencia</h2>
        </header>

        <div className={s.timeline}>
          <span className={s.line} aria-hidden="true" />
          <ul className={s.items}>
            {experiences.map((exp) => (
              <li key={exp.id} className={s.item}>
                <span className={s.marker}>
                  <img
                    src={exp.icon}
                    alt={exp.company}
                    className={s.markerImage}
                  />
                </span>
                <div className={s.content}>
                  <div className={s.meta}>
                    <span className={s.period}>{exp.period}</span>
                    <span className={s.role}>{exp.role}</span>
                  </div>
                  <h3 className={s.company}>
                    <a href={exp.companyUrl} className={s.companyLink} target="_blank" rel="noreferrer">
                      {exp.company} <MdOpenInNew className={s.openInNew} />
                    </a>
                  </h3>
                  <p className={s.description}>{exp.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Experience;
