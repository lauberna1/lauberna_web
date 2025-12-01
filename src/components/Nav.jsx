import React from "react";
import { navCopy, navItems, navQuickLinks } from "../data/nav";
import { socials } from "../data/socials";
import { FaGithub, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import styles from "./css/nav.module.css";

const socialColors = {
  linkedin: "#2D9CDB",
  instagram: "#E4405F",
  github: "#ffffff",
  email: "#EA4335",
};

function Nav() {
  const [isHidden, setIsHidden] = React.useState(false);
  const [navReady, setNavReady] = React.useState(false);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const lastScrollY = React.useRef(0);

  React.useEffect(() => {
    const onScroll = () => {
      const currentY = window.scrollY || 0;
      const delta = currentY - lastScrollY.current;
      if (currentY <= 10) {
        setIsHidden(false);
      } else if (delta > 8) {
        setIsHidden(true);
      } else if (delta < -4) {
        setIsHidden(false);
      }
      lastScrollY.current = currentY;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  React.useEffect(() => {
    const timeout = setTimeout(() => setNavReady(true), 600);
    return () => clearTimeout(timeout);
  }, []);

  React.useEffect(() => {
    if (!isMenuOpen) return;
    const handleKeydown = (e) => {
      if (e.key === "Escape") setIsMenuOpen(false);
    };
    window.addEventListener("keydown", handleKeydown);
    return () => window.removeEventListener("keydown", handleKeydown);
  }, [isMenuOpen]);

  return (
    <>
      <nav
        aria-label={navCopy.ariaLabel}
        className={`${styles.navBar} ${isHidden ? styles.navHidden : ""}`}
        data-intro-ready={navReady ? "true" : "false"}
      >
        <div className={styles.navShell}>
          <div className={styles.navLeft}>
            {navQuickLinks.map(({ to, label, offset = 0 }) => {
              const isCTA = label.toLowerCase().includes("work");
              return (
                <a
                  key={to}
                  className={`${styles.quickLink} ${
                    isCTA ? styles.ctaButton : ""
                  }`}
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setIsMenuOpen(false);
                    const element = document.getElementById(to);
                    if (element) {
                      const elementPosition = element.getBoundingClientRect().top;
                      const offsetPosition = elementPosition + window.pageYOffset + offset;
                      window.scrollTo({
                        top: offsetPosition,
                        behavior: "smooth",
                      });
                    }
                  }}
                >
                  {label}
                </a>
              );
            })}
          </div>
          <button
            type="button"
            aria-expanded={isMenuOpen}
            aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
            className={styles.menuButton}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span className={styles.menuIcon}>
              <span className={styles.menuIconBar}></span>
              <span className={styles.menuIconBar}></span>
              <span className={styles.menuIconBar}></span>
            </span>
          </button>
        </div>
      </nav>
      <div
        className={`${styles.navOverlay} ${
          isMenuOpen ? styles.navOverlayOpen : ""
        }`}
        style={{
          opacity: isMenuOpen ? 1 : 0,
          pointerEvents: isMenuOpen ? "auto" : "none",
        }}
        role="dialog"
        aria-modal="true"
        aria-label={navCopy.overlayLabel}
        aria-hidden={!isMenuOpen}
        onClick={() => setIsMenuOpen(false)}
      >
        <div
          className={styles.navOverlayContent}
          onClick={(e) => e.stopPropagation()}
        >
          <div className={styles.navOverlayMain}>
            <div className={styles.navOverlayLeft}>
              <nav className={styles.navOverlayNav}>
                <ul className={styles.navOverlayList}>
                  {navItems.map(({ to, label, offset = 0 }, index) => (
                    <li
                      key={to}
                      className={styles.navOverlayItem}
                      style={{ "--delay": `${index * 0.1}s` }}
                    >
                      <a
                        href="#"
                        className={styles.navOverlayLink}
                        onClick={(e) => {
                          e.preventDefault();
                          setIsMenuOpen(false);
                          const element = document.getElementById(to);
                          if (element) {
                            const elementPosition = element.getBoundingClientRect().top;
                            const offsetPosition = elementPosition + window.pageYOffset + offset;
                            window.scrollTo({
                              top: offsetPosition,
                              behavior: "smooth",
                            });
                          }
                        }}
                      >
                        {label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            <div className={styles.navOverlayContact}>
              <div className={styles.navOverlaySocials}>
                {socials.map(({ title, href, key }) => {
                  const IconMap = {
                    linkedin: FaLinkedinIn,
                    instagram: FaInstagram,
                    github: FaGithub,
                    email: HiOutlineMail,
                  };
                  const Icon = IconMap[key];
                  const socialColor = socialColors[key] || "#ffffff";
                  return (
                    <a
                      key={key}
                      href={href}
                      className={styles.navOverlaySocialLink}
                      target={href.startsWith("mailto:") ? undefined : "_blank"}
                      rel={
                        href.startsWith("mailto:")
                          ? undefined
                          : "noopener noreferrer"
                      }
                      aria-label={title}
                    >
                      <span
                        className={styles.navOverlaySocialIcon}
                        style={{ "--social-color": socialColor }}
                        aria-hidden="true"
                      >
                        {Icon && <Icon />}
                      </span>
                    </a>
                  );
                })}
              </div>
              <div className={styles.navOverlayContactInfo}>
                <a
                  href="mailto:bernalaureano2002@gmail.com"
                  className={styles.navOverlayContactItem}
                >
                  bernalaureano2002@gmail.com
                  <span className={styles.navOverlayContactArrow}>→</span>
                </a>
                <a
                  href="tel:+542616580386"
                  className={styles.navOverlayContactItem}
                >
                  +54 2616580386
                  <span className={styles.navOverlayContactArrow}>→</span>
                </a>
                <span className={styles.navOverlayContactItem}>
                  Mendoza, Argentina
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Nav;
