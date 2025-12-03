import React from "react";
import { navCopy, navItems, navQuickLinks } from "../data/nav";
import { socials } from "../data/socials";
import { FaGithub, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import styles from "./css/nav.module.css";
import { useEffect, useRef, useState } from "react";

const socialColors = {
  linkedin: "#2D9CDB",
  instagram: "#E4405F",
  github: "#ffffff",
  email: "#EA4335",
};

function Nav() {
  const [isHidden, setIsHidden] = useState(false);
  const [navReady, setNavReady] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [ignoreScroll, setIgnoreScroll] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      if (ignoreScroll) return;
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
  }, [ignoreScroll]);

  useEffect(() => {
    const timeout = setTimeout(() => setNavReady(true), 600);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (!isMenuOpen) return;
    const handleKeydown = (e) => {
      if (e.key === "Escape") setIsMenuOpen(false);
    };
    window.addEventListener("keydown", handleKeydown);
    return () => window.removeEventListener("keydown", handleKeydown);
  }, [isMenuOpen]);

  // Manejo del scroll lock
  useEffect(() => {
    if (isMenuOpen) {
      setIgnoreScroll(true);
    } else {
      requestAnimationFrame(() => {
        setIgnoreScroll(false);
      });
    }
  }, [isMenuOpen]);

  useEffect(() => {
    if (isMenuOpen) {
      const scrollY = window.scrollY;

      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.left = "0";
      document.body.style.right = "0";
      document.body.style.width = "100%";

      document.body.dataset.scrollY = scrollY;
    } else {
      const scrollY = parseInt(document.body.dataset.scrollY || "0", 10);

      const html = document.documentElement;
      const previousBehavior = html.style.scrollBehavior;
      html.style.scrollBehavior = "auto";

      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.width = "";

      window.scrollTo(0, scrollY);

      requestAnimationFrame(() => {
        html.style.scrollBehavior = previousBehavior || "";
      });
    }
  }, [isMenuOpen]);

  // 🔥 Helper para hacer scroll suave DEPUÉS de cerrar el menú
  const smoothScrollAfterClose = (to, offset = 0) => {
    setTimeout(() => {
      const element = document.getElementById(to);
      if (element) {
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset + offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    }, 20); // espera a que se restaure el smooth scroll
  };

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
                  className={`${styles.quickLink} ${isCTA ? styles.ctaButton : ""}`}
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setIsMenuOpen(false);
                    smoothScrollAfterClose(to, offset);
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
        className={`${styles.navOverlay} ${isMenuOpen ? styles.navOverlayOpen : ""}`}
        style={{
          opacity: isMenuOpen ? 1 : 0,
          pointerEvents: isMenuOpen ? "auto" : "none",
        }}
        role="dialog"
        aria-modal="true"
        onClick={() => setIsMenuOpen(false)}
      >
        <div className={styles.navOverlayContent} onClick={(e) => e.stopPropagation()}>
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
                          smoothScrollAfterClose(to, offset);
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
                      rel={href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
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
                <a href="mailto:bernalaureano2002@gmail.com" className={styles.navOverlayContactItem}>
                  bernalaureano2002@gmail.com
                  <span className={styles.navOverlayContactArrow}>→</span>
                </a>

                <a href="tel:+542616580386" className={styles.navOverlayContactItem}>
                  +54 2616580386
                  <span className={styles.navOverlayContactArrow}>→</span>
                </a>

                <span className={styles.navOverlayContactItem}>Mendoza, Argentina</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Nav;