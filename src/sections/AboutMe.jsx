import React, { useEffect, useState } from "react";
import { FiClock } from "react-icons/fi";
import { SiNextdotjs, SiReact } from "react-icons/si";
import { aboutCopy, aboutParagraphs } from "../data/about";
import s from "./css/AboutMe.module.css";

const AboutMe = () => {
  const [aboutReady, setAboutReady] = useState(false);
  const highlightChips = [
    {
      icon: <FiClock className={s.chipIcon} size={16} />,
      text: "+2 years",
    },
    {
      icon: <SiNextdotjs className={s.chipIcon} size={16} />,
      text: "Next.js",
    },
    {
      icon: <SiReact className={s.chipIcon} size={16} />,
      text: "React.js",
    },

  ];

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
          <div className={s.aboutHighlights}>
            {highlightChips.map((item) => (
              <span className={s.highlightChip} key={item.text}>
                <span aria-hidden="true">{item.icon}</span>
                {item.text}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutMe;
