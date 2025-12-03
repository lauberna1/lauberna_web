import React from "react";
import { knowledgeCopy, studies } from "../data/education";
import { resolveKnowledgeIcon } from "../utils/knowledgeIcons";
import styles from "./css/Studies.module.css";

const StudyCard = React.memo(({ item, certificateCopy }) => {
  const hasCertificate = Boolean(item.certificate);

  const handleClick = () => {
    if (hasCertificate) {
      window.open(item.certificate, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <article
      className={`${styles.card} ${
        hasCertificate ? styles.cardInteractive : ""
      }`}
      onClick={hasCertificate ? handleClick : undefined}
      role={hasCertificate ? "button" : undefined}
      tabIndex={hasCertificate ? 0 : undefined}
      aria-label={
        hasCertificate
          ? `${certificateCopy.ariaLabelPrefix} ${item.degree}`
          : undefined
      }
    >
      <header className={styles.cardHeader}>
        <span translate="no" className={styles.schoolChip}>{item.school}</span>
        <p className={styles.time}>{item.time}</p>
      </header>
      <h4 translate="no" className={styles.degree}>{item.degree}</h4>
      <div className={styles.iconRow}>
        {item.iconKeys.map((key, ind) => {
          const Icon = resolveKnowledgeIcon(key);
          if (!Icon) return null;
          return (
            <span
              key={`${item.school}-${key}-${ind}`}
              className={styles.iconGlyph}
              aria-hidden="true"
            >
              <Icon />
            </span>
          );
        })}
      </div>
      <div className={styles.cardFooter}>
        <p
          className={
            item.certificate ? styles.certificateLink : styles.certificateMuted
          }
        >
          {certificateCopy.label}
        </p>
        <span
          className={`${styles.cardArrow} ${
            !hasCertificate ? styles.cardArrowHidden : ""
          }`}
          aria-hidden="true"
        >
          →
        </span>
      </div>
    </article>
  );
});

StudyCard.displayName = "StudyCard";

const Studies = () => {
  const { studySection, certificate } = knowledgeCopy;

  return (
    <section className={styles.section} id="studies">
      <div id={studySection.id} className={styles.wrapper}>
        <h2 className={styles.heading}>
          <p className={styles.kicker}>{studySection.kicker}</p>
          {studySection.title}
        </h2>
        <div className={styles.cards}>
          {studies.map((item) => (
            <StudyCard
              key={`${item.school}-${item.degree}`}
              item={item}
              certificateCopy={certificate}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Studies;
