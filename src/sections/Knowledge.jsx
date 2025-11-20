import React from "react";
import { BiMath } from "react-icons/bi";
import { CiTimer } from "react-icons/ci";
import {
  FaCss3Alt,
  FaDatabase,
  FaHtml5,
  FaJava,
  FaPython,
  FaReact,
} from "react-icons/fa";
import { FaComputer } from "react-icons/fa6";
import { IoLogoJavascript, IoSunnyOutline } from "react-icons/io5";
import { LuPlus } from "react-icons/lu";
import { PiPlant } from "react-icons/pi";
import { SlChemistry } from "react-icons/sl";
import s from "./css/Knowledge.module.css";
import { studies, skills } from "../data/education";
import { SiSwagger } from "react-icons/si";
import { SiNextdotjs } from "react-icons/si";
import { FaFigma } from "react-icons/fa";
import { SiRedux } from "react-icons/si";
import { SiTypescript } from "react-icons/si";
import { SiApollographql } from "react-icons/si";
import { SiJest } from "react-icons/si";
import { SiStorybook } from "react-icons/si";
import { GrMysql } from "react-icons/gr";
import { SiSelenium } from "react-icons/si";
import { FaGitlab } from "react-icons/fa6";
import { FaDocker } from "react-icons/fa6";
import { SiSpring } from "react-icons/si";
import { FaAws } from "react-icons/fa";
import { SiMui } from "react-icons/si";
import { FaNode } from "react-icons/fa6";
import { SiZod } from "react-icons/si";
import { MdOpenInNew } from "react-icons/md";
// Resume el stack técnico y el recorrido académico.
const Knowledge = () => {
  // Relaciona claves de datos con los componentes de íconos.
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
    java: <FaJava />,
    gitlab: <FaGitlab />,
    docker: <FaDocker />,
    spring: <SiSpring />,
    aws: <FaAws />,
    mui: <SiMui />,
    node: <FaNode />,
    zod: <SiZod />,
  };
  return (
    <section className={s.container}>
      <div className={s.skills}>
        <h2 className={s.tittleS}>Tech Stack</h2>
        <div className={s.skillIcons}>
          {skills.map((skill, skillIndex) => (
            <div key={skillIndex} className={s.skillIcon}>
              {iconMap[skill.key]}
              <p className={s.skillName}>{skill.name}</p>
            </div>
          ))}
        </div>
      </div>
      <div id="estudio" className={s.study}>
        <h2 className={s.tittleS}>Education</h2>
        <div className={s.cards}>
          {studies.map((item, index) => (
            <div
              key={index}
              className={`${s.card} ${
                item.certificate ? s.cardHasCertificate : ""
              }`}
              style={{
                cursor: item.certificate ? "pointer" : "default",
              }}
              onClick={() => {
                if (item.certificate) {
                  window.open(item.certificate, "_blank");
                }
              }}
            >
              <header className={s.cardHeader}>
                <h3 className={s.title} data-text={item.school}>
                  {item.school}
                </h3>
                <div className={s.icons}>
                  {item.iconKeys.map((key, ind) => {
                    return (
                      <React.Fragment key={ind}>{iconMap[key]}</React.Fragment>
                    );
                  })}
                </div>
              </header>
              <div className={s.line}></div>
              <section className={s.info}>
                <h4 className={s.tit}>{item.degree}</h4>
                <div className={s.time}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "5px",
                    }}
                  >
                    {item.time}
                  </div>
                  {item.certificate && (
                    <>
                      <a
                        className={s.certificateLink}
                        href={item.certificate}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Certificate <MdOpenInNew />
                      </a>
                    </>
                  )}
                </div>
              </section>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Knowledge;
