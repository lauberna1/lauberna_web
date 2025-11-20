import React from "react";
import { Link } from "react-scroll";
import {
  navbar,
  list,
  item,
  hidden as hiddenClass,
} from "./css/nav.module.css";
import { navItems } from "../data/nav";

// Barra de navegación sticky con auto-ocultado según el scroll.
function Nav() {
  const [isHidden, setIsHidden] = React.useState(false);
  const lastScrollY = React.useRef(0);
  const [navReady, setNavReady] = React.useState(false);

  React.useEffect(() => {
    let ticking = false;
    const thresholdDown = 8;
    const thresholdUp = 4;

    const onScroll = () => {
      const currentY = window.scrollY || 0;
      const delta = currentY - lastScrollY.current;

      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (currentY <= 10) {
            setIsHidden(false);
          } else if (delta > thresholdDown) {
            setIsHidden(true);
          } else if (delta < -thresholdUp) {
            setIsHidden(false);
          }
          lastScrollY.current = currentY;
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  React.useEffect(() => {
    const introTimeout = window.setTimeout(() => setNavReady(true), 1200);
    return () => window.clearTimeout(introTimeout);
  }, []);

  return (
    <section
      className={`${navbar} ${isHidden ? hiddenClass : ""}`}
      data-intro-ready={navReady ? "true" : "false"}
    >
      <ul className={list}>
        {navItems.map(({ to, label, offset = 0, duration = 500 }) => (
          <li key={to} className={item}>
            <Link to={to} smooth={true} duration={duration} offset={offset}>
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
export default Nav;
