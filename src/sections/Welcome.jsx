import React, { useEffect, useState } from "react";
import s from "./css/Welcome.module.css";
import Media from "../components/Media";
import { welcomeNameParts } from "../data/welcome";
import { IoIosArrowDown } from "react-icons/io";
// Hero inicial que presenta la identidad y los enlaces sociales principales.
const Welcome = () => {
  const [introReady, setIntroReady] = useState(false);
  const [dividerPlayed, setDividerPlayed] = useState(false);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setIntroReady(true));
    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (!introReady || dividerPlayed) return;
    const timeout = window.setTimeout(() => setDividerPlayed(true), 1100);
    return () => window.clearTimeout(timeout);
  }, [introReady, dividerPlayed]);

  useEffect(() => {
    if (typeof window === "undefined" || !dividerPlayed) return;
    window.__welcomeAnimDone = true;
    window.dispatchEvent(new Event("welcomeAnimationCompleted"));
  }, [dividerPlayed]);

  return (
    <section
      id="home"
      className={s.home}
      data-ready={introReady ? "true" : "false"}
      data-divider-played={dividerPlayed ? "true" : "false"}
    >
      <div className={s.cont}>
        <div className={s.title} role="group" aria-labelledby="welcome-title">
          <span className={s.hi}>Hi, I'm</span>
          <h1 id="welcome-title" className={s.name}>
            <span>{welcomeNameParts[0]}</span>
            <span>{welcomeNameParts[1]}</span>
          </h1>
          <Media />
        </div>
        <div className={s.divider} />
        <div
          className={`${s.title} ${s.dev}`}
          role="group"
          aria-labelledby="welcome-title"
        >
          <span className={s.hi}>And I'm a</span>
          <h1 id="welcome-title" className={s.name}>
            <span>FRONTEND</span>
            <span>DEV</span>
          </h1>
        </div>
      </div>
      <div className={s.scrollIndicator}>
        <IoIosArrowDown />
        <IoIosArrowDown />
        <IoIosArrowDown />
      </div>
    </section>
  );
};

export default Welcome;
