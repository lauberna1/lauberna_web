import React from "react";
import { knowledgeCopy, skills } from "../data/education";
import {
  DEFAULT_ICON_COMPONENT,
  resolveKnowledgeIcon,
} from "../utils/knowledgeIcons";
import { techColors } from "../utils/techColors";
import styles from "./css/TechStack.module.css";

const SkillIcon = React.memo(({ skill }) => {
  const IconComponent =
    resolveKnowledgeIcon(skill.key) ?? DEFAULT_ICON_COMPONENT;
  const techColor = techColors[skill.key] || "#ffffff";

  return (
    <div className={styles.skillItem}>
      <span
        className={styles.skillGlyph}
        style={{ "--tech-color": techColor }}
        aria-hidden="true"
      >
        <IconComponent />
      </span>
      <p className={styles.skillLabel}>{skill.name}</p>
    </div>
  );
});

SkillIcon.displayName = "SkillIcon";

const TechStack = () => {
  const { stackSection } = knowledgeCopy;

  return (
    <section className={styles.section}>
      <div id={stackSection.id} className={styles.wrapper}>
        <h2 translate="no" className={styles.heading}>
          <p translate="no" className={styles.kicker}>{stackSection.kicker}</p>
          {stackSection.title}
        </h2>
        <div className={styles.skillGrid} aria-label={stackSection.ariaLabel}>
          {skills.map((skill) => (
            <SkillIcon key={`${skill.key}-${skill.name}`} skill={skill} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStack;

