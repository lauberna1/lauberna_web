import React from "react";
import { FaGithub, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { contactCopy, contactMethods } from "../data/contact";
import s from "./css/Contact.module.css";

const ICON_MAP = {
  linkedin: FaLinkedinIn,
  instagram: FaInstagram,
  email: HiOutlineMail,
  github: FaGithub,
};

const Contact = () => {
  const { kicker, title, subtitle } = contactCopy;

  const titleParts = title.split("great");

  return (
    <section id="contact" className={s.contactSection}>
      <div className={s.contactHeading}>
        <p className={s.contactKicker}>{kicker}</p>
        <h2 className={s.contactTitle}>
          {titleParts[0]}
          <span className={s.gradientText}>great</span>
          {titleParts[1]}
        </h2>
        <p className={s.contactSubtitle}>{subtitle}</p>
      </div>
      <div className={s.contactGrid}>
        {contactMethods.map(
          ({ id, iconKey, label, handle, href, description }) => {
            const Icon = ICON_MAP[iconKey];
            return (
              <a
                key={id}
                href={href}
                className={s.contactCard}
                target={href.startsWith("mailto:") ? undefined : "_blank"}
                rel={
                  href.startsWith("mailto:") ? undefined : "noopener noreferrer"
                }
              >
                <span className={s.contactIcon} aria-hidden="true">
                  {Icon ? <Icon /> : null}
                </span>
                <div className={s.contactCardBody}>
                  <p className={s.contactCardLabel}>{label}</p>
                  <p className={s.contactCardHandle}>{handle}</p>
                  <p className={s.contactCardDescription}>{description}</p>
                </div>
                <span className={s.contactArrow} aria-hidden="true">
                  →
                </span>
              </a>
            );
          }
        )}
      </div>
    </section>
  );
};

export default Contact;
