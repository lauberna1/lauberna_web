import React, { useEffect, useState } from "react";
import { aboutCopy, aboutParagraphs } from "../data/about";
import s from "./css/AboutMe.module.css";

const AboutMe = () => {
  const [aboutReady, setAboutReady] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    if (window.__welcomeAnimDone) {
      const frame = window.requestAnimationFrame(() => setAboutReady(true));
      return () => window.cancelAnimationFrame(frame);
    }

    const handleIntroFinished = () => setAboutReady(true);

    window.addEventListener("welcomeAnimationCompleted", handleIntroFinished, {
      once: true,
    });

    return () =>
      window.removeEventListener(
        "welcomeAnimationCompleted",
        handleIntroFinished
      );
  }, []);

  return (
    <div
      id="about"
      className={s.aboutSection}
      data-ready={aboutReady ? "true" : "false"}
    >
      <div className={s.aboutDescription}>
        <img src="/Profile.webp" alt="About Me" className={s.aboutImage} />
        <div className={s.aboutContent}>
          <h2 className={s.aboutHeading}>
            <p className={s.aboutKicker}>{aboutCopy.kicker}</p>
            {aboutCopy.title}
          </h2>
          <div className={s.aboutParagraphs}>
            {aboutParagraphs.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutMe;
