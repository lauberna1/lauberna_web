import React from "react";
import { FaCss3Alt, FaReact, FaWordpress } from "react-icons/fa";
import { SiVite } from "react-icons/si";
import { projects, projectsCopy } from "../data/projects";
import s from "./css/Projects.module.css";

const TECH_ICON_MAP = {
  react: FaReact,
  css: FaCss3Alt,
  vite: SiVite,
  wordpress: FaWordpress,
};

const Projects = () => {
  const [isExpanded, setIsExpanded] = React.useState(false);
  const titleRef = React.useRef(null);
  const prevExpandedRef = React.useRef(false);
  const gridRef = React.useRef(null);
  const INITIAL_PROJECTS_COUNT = 2;
  const hasMoreProjects = projects.length > INITIAL_PROJECTS_COUNT;
  const initialProjects = projects.slice(0, INITIAL_PROJECTS_COUNT);
  const additionalProjects = projects.slice(INITIAL_PROJECTS_COUNT);

  React.useEffect(() => {
    if (prevExpandedRef.current && !isExpanded && titleRef.current) {
      setTimeout(() => {
        const element = titleRef.current;
        if (element) {
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - 100;
          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });
        }
      }, 100);
    }
    prevExpandedRef.current = isExpanded;
  }, [isExpanded]);

  return (
    <div id="projects" className={s.projectsSection}>
      <h2 ref={titleRef} className={s.projectsSectionTitle}>
        <p className={s.projectsSectionKicker}>{projectsCopy.kicker}</p>
        {projectsCopy.title}
      </h2>

      <div className={s.projectsSectionGridWrapper}>
        <div ref={gridRef} className={s.projectsSectionGrid}>
          {initialProjects.map((project) => (
            <ProjectCard
              key={`${project.id}-${project.title}`}
              project={project}
            />
          ))}
        </div>
        {hasMoreProjects && (
          <div
            className={`${s.projectsSectionAdditionalContainer} ${
              isExpanded ? s.projectsSectionAdditionalContainerExpanded : ""
            }`}
          >
            <div className={s.projectsSectionGrid}>
              {additionalProjects.map((project) => (
                <ProjectCard
                  key={`${project.id}-${project.title}`}
                  project={project}
                />
              ))}
            </div>
          </div>
        )}
        {hasMoreProjects && (
          <div className={s.projectsSectionButtonWrapper}>
            <button
              className={s.projectsSectionToggleButton}
              onClick={() => setIsExpanded(!isExpanded)}
              aria-expanded={isExpanded}
            >
              {isExpanded
                ? projectsCopy.showLessLabel
                : projectsCopy.showMoreLabel}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const ProjectCard = ({ project }) => {
  const {
    id,
    title,
    alt,
    imageSrc,
    techKeys = [],
    hover,
    href,
    description,
  } = project;

  const isLink = Boolean(hover && href);
  const Tag = isLink ? "a" : "article";
  const tagProps = isLink
    ? {
        href,
        target: "_blank",
        rel: "noreferrer noopener",
        "aria-label": `${projectsCopy.linkAriaLabelPrefix} ${title}`,
      }
    : {};

  return (
    <Tag
      className={`${s.projectsSectionLink} ${s.projectsSectionCard} ${
        hover ? s.projectsSectionCardInteractive : ""
      }`}
      {...tagProps}
    >
      <figure className={s.projectsSectionImage}>
        <img
          loading="lazy"
          className={s.projectsSectionImageMedia}
          src={imageSrc}
          alt={alt || title}
        />
        {isLink && (
          <span className={s.projectsSectionArrow} aria-hidden="true">
            →
          </span>
        )}
      </figure>
      <div className={s.projectsSectionDescription}>
        <div className={s.projectsSectionText}>
          <h3 translate="no">{title}</h3>
        </div>
        {techKeys?.length > 0 && (
          <div
            className={s.projectsSectionIconList}
            aria-label={projectsCopy.technologiesAriaLabel}
          >
            {techKeys.map((key, index) => {
              const Icon = TECH_ICON_MAP[key];
              if (!Icon) return null;
              return (
                <Icon
                  key={`${id}-${key}-${index}`}
                  className={s.projectsSectionIconGlyph}
                  aria-hidden="true"
                />
              );
            })}
          </div>
        )}
      </div>
      {description && (
        <p className={s.projectsSectionDescriptionText}>{description}</p>
      )}
    </Tag>
  );
};

export default Projects;
