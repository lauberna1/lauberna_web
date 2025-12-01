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

const iconMap = {
  plant: PiPlant,
  chemistry: SlChemistry,
  math: BiMath,
  sun: IoSunnyOutline,
  python: FaPython,
  java: FaJava,
  computer: FaComputer,
  javascript: IoLogoJavascript,
  database: FaDatabase,
  react: FaReact,
  plus: LuPlus,
  css: FaCss3Alt,
  html: FaHtml5,
  nextjs: SiNextdotjs,
  swagger: SiSwagger,
  figma: FaFigma,
  redux: SiRedux,
  typescript: SiTypescript,
  jest: SiJest,
  graphql: SiApollographql,
  storybook: SiStorybook,
  mysql: GrMysql,
  selenium: SiSelenium,
  timer: CiTimer,
  gitlab: FaGitlab,
  docker: FaDocker,
  spring: SiSpring,
  aws: FaAws,
  mui: SiMui,
  node: FaNode,
  zod: SiZod,
};

export const DEFAULT_ICON_COMPONENT = LuPlus;

export const resolveKnowledgeIcon = (key) => iconMap[key] ?? null;

