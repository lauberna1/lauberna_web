import { FaReact, FaCss3Alt } from "react-icons/fa";
import { HiExternalLink } from "react-icons/hi";
import { SiVite } from "react-icons/si";
import React from "react";
import s from "./css/Projects.module.css";
import { projects } from "../data/projects";
import { FaWordpress } from "react-icons/fa";

const Projects = () => {
  // Asociación simple entre clave y componente de ícono.
  const techIconMap = {
    react: FaReact,
    css: FaCss3Alt,
    vite: SiVite,
    wordpress: FaWordpress,
  };
  return (
    <section id="projects" className={s.projects}>
      <h2 className={s.projectTitle}>Projects</h2>
      <div className={s.cards}>
        {projects.map((project) => {
          const CardTag = project.hover ? "a" : "div";
          const cardClass = `${s.projectCard} ${
            project.hover ? s.projectCardInteractive : ""
          }`;
          const cardProps = project.hover
            ? {
                href: project.href,
                target: project.href ? "_blank" : undefined,
                rel: project.href ? "noreferrer" : undefined,
              }
            : { role: "presentation" };
          return (
            <CardTag
              key={project.id}
              className={`${s.projectLink} ${cardClass}`}
              {...cardProps}
            >
              <div className={s.projectImage}>
                <HiExternalLink className={s.projectGoIcon} />
                <img
                  loading="lazy"
                  className={s.projectImageMedia}
                  src={project.imageSrc}
                  alt={project.alt}
                />
              </div>
              <div className={s.projectDescription}>
                <h3>{project.title}</h3>
                <div className={s.projectIcons}>
                  {project.techKeys.map((key, idx) => {
                    const Icon = techIconMap[key];
                    if (!Icon) return null;
                    return (
                      <Icon
                        key={`${project.id}-${key}-${idx}`}
                        className={s.projectIcon}
                      />
                    );
                  })}
                </div>
              </div>
            </CardTag>
          );
        })}
      </div>
    </section>
  );
};

export default Projects;
