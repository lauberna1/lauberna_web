import React from "react";
import s from "./css/Footer.module.css";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className={s.footerUpper}>
      {year} developed by Laureano Berna
    </footer>
  );
};

export default Footer;
