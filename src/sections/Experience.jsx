import React from "react";
import { experienceCopy, experiences } from "../data/experience";
import s from "./css/Experience.module.css";

const Experience = () => {
  const { kicker, title } = experienceCopy;

  return (
    <div id="experience" className={s.experienceSection}>
      <div className={s.experienceInner}>
        <header className={s.experienceHeader}>
          <h2 className={s.experienceTitle}>
            <p className={s.experienceKicker}>{kicker}</p>
            {title}
          </h2>
        </header>

        <div className={s.experienceTimeline}>
          <span className={s.experienceLine} aria-hidden="true" />
          <ul className={s.experienceItems}>
            {experiences.map((exp) => {
              const openCompanyUrl = () => {
                window.open(exp.companyUrl, "_blank", "noopener,noreferrer");
              };

              const handleKeyDown = (event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  openCompanyUrl();
                }
              };

              return (
                <li key={exp.id} className={s.experienceItem}>
                  <span className={s.experienceMarker}>
                    <img
                      src={exp.icon}
                      alt={exp.company}
                      className={s.experienceMarkerImage}
                    />
                  </span>
                  <div
                    className={s.experienceContent}
                    onClick={openCompanyUrl}
                    onKeyDown={handleKeyDown}
                    role="button"
                    tabIndex={0}
                    aria-label={`View website of ${exp.company}`}
                  >
                    <div className={s.experienceMeta}>
                      <span className={s.period}>{exp.period}</span>
                      <span className={s.experienceRole}>{exp.role}</span>
                    </div>
                    <h3 className={s.experienceCompany}>{exp.company}</h3>
                    <p className={s.experienceDescription}>{exp.description}</p>
                    <div className={s.experienceFooter}>
                      <span className={s.experienceArrow} aria-hidden="true">
                        →
                      </span>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Experience;
