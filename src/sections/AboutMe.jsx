import React, { useEffect, useState } from "react";
import { aboutParagraphs, aboutTitle, profileImage } from "../data/about";
import s from "./css/AboutMe.module.css";

// Bloque dedicado a la presentación personal y resumen biográfico.
const AboutMe = () => {
  const [aboutReady, setAboutReady] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

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
      className={s.about}
      data-ready={aboutReady ? "true" : "false"}
    >
      {/* Perfil con fotografía destacada */}
      {/*  <section className={s.profile}>
        <img
          alt={profileImage.alt}
          className={s.profilePic}
          src={profileImage.src}
          loading="lazy"
        />
      </section> */}
      {/* Descripción en texto y hashtags dinámicos */}
      <section className={s.descripcion}>
        <div className={s.desCont}>
          <h2 className={s.titulo}>
            <p className={s.sectionKicker}>Profile</p>
            {aboutTitle}
          </h2>
          <div className={s.parrafo}>
            {aboutParagraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
export default AboutMe;
