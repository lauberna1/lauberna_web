import React from "react";
import { BiMath } from "react-icons/bi";
import { CiTimer } from "react-icons/ci";
import {
  FaAws,
  FaCss3Alt,
  FaDatabase,
  FaFigma,
  FaHtml5,
  FaJava,
  FaPython,
  FaReact,
} from "react-icons/fa";
import { FaComputer, FaDocker, FaGitlab, FaNode } from "react-icons/fa6";
import { IoLogoJavascript, IoSunnyOutline } from "react-icons/io5";
import { LuPlus } from "react-icons/lu";
import { PiPlant } from "react-icons/pi";
import { SlChemistry } from "react-icons/sl";
import {
  SiApollographql,
  SiJest,
  SiMui,
  SiNextdotjs,
  SiRedux,
  SiSelenium,
  SiSpring,
  SiStorybook,
  SiSwagger,
  SiTypescript,
  SiZod,
} from "react-icons/si";
import { GrMysql } from "react-icons/gr";
import { MdOpenInNew } from "react-icons/md";
import s from "./css/Knowledge.module.css";
import { studies, skills } from "../data/education";
// Resume el stack técnico y el recorrido académico.
const iconMap = {
  plant: <PiPlant />,
  chemistry: <SlChemistry />,
  math: <BiMath />,
  sun: <IoSunnyOutline />,
  python: <FaPython />,
  java: <FaJava />,
  computer: <FaComputer />,
  javascript: <IoLogoJavascript />,
  database: <FaDatabase />,
  react: <FaReact />,
  plus: <LuPlus />,
  css: <FaCss3Alt />,
  html: <FaHtml5 />,
  nextjs: <SiNextdotjs />,
  swagger: <SiSwagger />,
  figma: <FaFigma />,
  redux: <SiRedux />,
  typescript: <SiTypescript />,
  jest: <SiJest />,
  graphql: <SiApollographql />,
  storybook: <SiStorybook />,
  mysql: <GrMysql />,
  selenium: <SiSelenium />,
  timer: <CiTimer />,
  gitlab: <FaGitlab />,
  docker: <FaDocker />,
  spring: <SiSpring />,
  aws: <FaAws />,
  mui: <SiMui />,
  node: <FaNode />,
  zod: <SiZod />,
};

const resolveIcon = (key) => iconMap[key] ?? null;

const SkillIcon = ({ skill }) => {
  const icon = resolveIcon(skill.key) ?? <LuPlus />;

  return (
    <div className={s.skillIcon}>
      <span className={s.skillGlyph} aria-hidden="true">
        {icon}
      </span>
      <p className={s.skillName}>{skill.name}</p>
    </div>
  );
};

const StudyCard = ({ item }) => {
  const hasCertificate = Boolean(item.certificate);

  const openCertificate = () => {
    if (hasCertificate) {
      window.open(item.certificate, "_blank", "noopener,noreferrer");
    }
  };

  const handleKeyDown = (event) => {
    if (!hasCertificate) {
      return;
    }
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openCertificate();
    }
  };

  return (
    <article
      className={`${s.card} ${hasCertificate ? s.cardHasCertificate : ""}`}
      onClick={hasCertificate ? openCertificate : undefined}
      onKeyDown={hasCertificate ? handleKeyDown : undefined}
      role={hasCertificate ? "button" : undefined}
      tabIndex={hasCertificate ? 0 : undefined}
    >
      <header className={s.cardHeader}>
        <h3 className={s.title} data-text={item.school}>
          {item.school}
        </h3>
        <div className={s.icons}>
          {item.iconKeys.map((key, ind) => {
            const icon = resolveIcon(key);
            if (!icon) {
              return null;
            }
            return (
              <span
                key={`${item.school}-${key}-${ind}`}
                className={s.cardIcon}
                aria-hidden="true"
              >
                {icon}
              </span>
            );
          })}
        </div>
      </header>
      <div className={s.line} aria-hidden="true"></div>
      <section className={s.info}>
        <h4 className={s.tit}>{item.degree}</h4>
        <div className={s.time}>
          <p>{item.time}</p>
          {item.certificate && (
            <a
              className={s.certificateLink}
              href={item.certificate}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(event) => event.stopPropagation()}
            >
              Certificate <MdOpenInNew />
            </a>
          )}
        </div>
      </section>
    </article>
  );
};

const Knowledge = () => (
  <section className={s.container}>
    <div className={s.skills}>
      <h2 className={s.tittleS}>
        <p className={s.sectionKicker}>Technologies</p>
        Tech Stack
      </h2>
      <div className={s.skillIcons}>
        {skills.map((skill) => (
          <SkillIcon key={`${skill.key}-${skill.name}`} skill={skill} />
        ))}
      </div>
    </div>
    <div id="estudio" className={s.study}>
      <h2 className={s.tittleS}>
        <p className={s.sectionKicker}>Certifications</p>Education
      </h2>
      <div className={s.cards}>
        {studies.map((item) => (
          <StudyCard key={`${item.school}-${item.degree}`} item={item} />
        ))}
      </div>
    </div>
  </section>
);

export default Knowledge;
