import { FaReact, FaCss3Alt, FaWordpress } from "react-icons/fa";
import { HiExternalLink } from "react-icons/hi";
import { SiVite } from "react-icons/si";
import React from "react";
import s from "./css/Projects.module.css";
import { projects } from "../data/projects";

const TECH_ICON_MAP = {
  react: FaReact,
  css: FaCss3Alt,
  vite: SiVite,
  wordpress: FaWordpress,
};

const Projects = () => (
  <section id="projects" className={s.projects}>
    <h2 className={s.projectTitle}>
      <p className={s.sectionKicker}>Portfolio</p>Projects
    </h2>

    <div className={s.cards}>
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  </section>
);

const ProjectCard = ({ project }) => {
  const { id, title, alt, imageSrc, techKeys = [], hover, href } = project;

  const hasHoverState = Boolean(hover);
  const isLink = Boolean(hover && href);
  const Tag = isLink ? "a" : "article";
  const tagProps = isLink
    ? {
        href,
        target: "_blank",
        rel: "noreferrer noopener",
        "aria-label": `Abrir ${title}`,
      }
    : {};

  const className = [
    s.projectLink,
    s.projectCard,
    hasHoverState ? s.projectCardInteractive : "",
  ]
    .filter(Boolean)
    .join(" ");

  const safeTechnologies = Array.isArray(techKeys) ? techKeys : [];

  return (
    <Tag className={className} {...tagProps}>
      <figure className={s.projectImage}>
        {isLink && (
          <HiExternalLink aria-hidden="true" className={s.projectGoIcon} />
        )}
        <img
          loading="lazy"
          className={s.projectImageMedia}
          src={imageSrc}
          alt={alt || title}
        />
      </figure>
      <div className={s.projectDescription}>
        <h3>{title}</h3>
        {!!safeTechnologies.length && (
          <div className={s.projectIcons} aria-label="Tecnologías utilizadas">
            {safeTechnologies.map((key, idx) => {
              const Icon = TECH_ICON_MAP[key];
              if (!Icon) return null;
              return (
                <Icon
                  key={`${id}-${key}-${idx}`}
                  className={s.projectIcon}
                  aria-hidden="true"
                />
              );
            })}
          </div>
        )}
      </div>
    </Tag>
  );
};

export default Projects;
