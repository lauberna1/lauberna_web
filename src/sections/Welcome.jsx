import React, { useEffect, useState } from "react";
import FBOParticlesScene from "../components/FBOParticles";
import Media from "../components/Media";
import { welcomeNameParts } from "../data/welcome";
import s from "./css/Welcome.module.css";

const Welcome = () => {
  const [introReady, setIntroReady] = useState(false);
  const [dividerPlayed, setDividerPlayed] = useState(false);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setIntroReady(true));
    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (!introReady || dividerPlayed) {
      return;
    }
    const timeout = window.setTimeout(() => setDividerPlayed(true), 600);
    return () => window.clearTimeout(timeout);
  }, [introReady, dividerPlayed]);

  useEffect(() => {
    if (typeof window === "undefined" || !dividerPlayed) {
      return;
    }
    window.__welcomeAnimDone = true;
    window.dispatchEvent(new Event("welcomeAnimationCompleted"));
  }, [dividerPlayed]);

  useEffect(() => {
    if (typeof document === "undefined" || dividerPlayed) {
      return;
    }
    const html = document.documentElement;
    const body = document.body;
    const prevHtmlOverflow = html.style.overflow;
    const prevBodyOverflow = body.style.overflow;

    html.style.overflow = "hidden";
    body.style.overflow = "hidden";

    return () => {
      html.style.overflow = prevHtmlOverflow;
      body.style.overflow = prevBodyOverflow;
    };
  }, [dividerPlayed]);

  return (
    <div
      id="home"
      className={s.welcomeHero}
      data-ready={introReady ? "true" : "false"}
      data-divider-played={dividerPlayed ? "true" : "false"}
    >
      <div className={s.welcomeBackground} />
      <div className={s.welcomeContent}>
        <div className={s.leftSection}>
          <h1 className={s.welcomeName}>
            <span>{welcomeNameParts[0]}</span>
            <span>{welcomeNameParts[1]}</span>
          </h1>
          <div className={s.role}>
            <span className={s.roleText}>Front End Developer</span>
          </div>
        </div>
        <div className={s.rightSection}>
          <FBOParticlesScene />
        </div>
      </div>
    </div>
  );
};

export default Welcome;
