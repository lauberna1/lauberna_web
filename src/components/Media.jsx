import React from "react";
import { AiOutlineMail } from "react-icons/ai";
import { FaInstagram, FaLinkedin, FaWhatsapp } from "react-icons/fa";
import { FaGithub } from "react-icons/fa6";
import { socials } from "../data/socials";
import s from "./css/media.module.css";

const ICON_MAP = {
  instagram: FaInstagram,
  linkedin: FaLinkedin,
  github: FaGithub,
  whatsapp: FaWhatsapp,
  email: AiOutlineMail,
};

const socialColors = {
  linkedin: "#2D9CDB",
  instagram: "#E4405F",
  github: "#ffffff",
  email: "#EA4335",
  whatsapp: "#25D366",
};

const Media = () => (
  <div className={s.mediaIconGroup}>
    {socials.map(({ title, href, key }) => {
      const Icon = ICON_MAP[key];
      if (!Icon) {
        return null;
      }
      const socialColor = socialColors[key] || "#ffffff";
      return (
        <a
          key={key}
          className={s.mediaLink}
          title={title}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          style={{ "--social-color": socialColor }}
        >
          <span className={s.mediaIcon}>
            <Icon />
          </span>
        </a>
      );
    })}
  </div>
);

export default Media;
