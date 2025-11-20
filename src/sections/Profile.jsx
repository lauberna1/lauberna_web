import Knowledge from "./Knowledge";
import Projects from "./Projects";
import AboutMe from "./AboutMe";
import Experience from "./Experience";

// Contenedor que agrupa la parte central del portfolio.
const Profile = () => {
  return (
    <>
      <AboutMe />
      <Knowledge />
      <Experience />
      <Projects />
    </>
  );
};
export default Profile;
