import { FaInstagram, FaLinkedin, FaWhatsapp } from "react-icons/fa";
import { AiOutlineMail } from "react-icons/ai";
import { FaGithub } from "react-icons/fa6";
import React from "react";
import s from "./css/media.module.css";
import { socials } from "../data/socials";

// Listado compacto con iconos sociales reutilizables.
const Media = () => {
  const iconMap = {
    instagram: FaInstagram,
    linkedin: FaLinkedin,
    github: FaGithub,
    whatsapp: FaWhatsapp,
    email: AiOutlineMail,
  };
  return (
    <div className={s.iconCont}>
      {socials.map(({ title, href, key }) => {
        const Icon = iconMap[key];
        if (!Icon) return null;
        return (
          <a
            key={key}
            className={s.socialLink}
            title={title}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon className={s.icon} />
          </a>
        );
      })}
    </div>
  );
};

export default Media;

