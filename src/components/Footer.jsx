import Media from "./Media";
import s from "./css/Footer.module.css";
import React from "react";

// Cierre del sitio con redes y año actualizado automáticamente.
const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className={s.footer}>
      <section className={s.upper}>
        <div className={s.divider}></div>
        <Media />
        <div className={s.divider}></div>
      </section>
      <section className={s.lower}>
{/*         <a href="">resume</a>
        <p>|</p> */}
        <p>© {year}</p>
      </section>
    </footer>
  );
};
export default Footer;
