"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { FaFacebookF, FaInstagram } from "react-icons/fa6";
import { useLanguage } from "./LanguageProvider";

const navigation = [
  { href: "/services", key: "navServices" },
  { href: "/about", key: "navAbout" },
  { href: "/equipment", key: "navEquipment" },
  { href: "/gallery", key: "navGallery" },
  { href: "/contact", key: "navContact" },
];

const socialLinks = [
  { label: "Facebook", href: "", Icon: FaFacebookF },
  { label: "Instagram", href: "", Icon: FaInstagram },
];

function Brand({ footer = false }) {
  return (
    <Link
      className={`brand${footer ? " footer-brand" : ""}`}
      href="/"
      aria-label="Дизел Сервис Славе"
    >
      <span className="brand-mark" aria-hidden="true">
        <i />
        <i />
        <i />
      </span>
      <span className="brand-copy">
        <b>ДИЗЕЛ СЕРВИС</b>
        <strong>СЛАВЕ</strong>
      </span>
    </Link>
  );
}

export function SkipLink() {
  const { t } = useLanguage();
  return (
    <a className="skip-link" href="#main">
      {t.skip}
    </a>
  );
}

export function SocialLinks({ variant = "dark", presentation = "icons" }) {
  const { t } = useLanguage();
  return (
    <div
      className={`social-links social-links-${variant} social-links-${presentation}`}
      aria-label={t.socialMedia}
    >
      {socialLinks.map(({ label, href, Icon }) => (
        <a
          className="social-link"
          href={href || undefined}
          aria-label={label}
          aria-disabled={!href}
          tabIndex={href ? 0 : -1}
          title={`${label} — ${t.comingSoon}`}
          key={label}
        >
          <Icon aria-hidden="true" />
          {presentation === "buttons" && <span>{label}</span>}
        </a>
      ))}
    </div>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const normalizedPathname =
    pathname === "/" ? "/" : pathname.replace(/\/$/, "");
  const { language, setLanguage, t } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("nav-open", menuOpen);
    return () => document.body.classList.remove("nav-open");
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return undefined;
    const closeOnEscape = (event) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [menuOpen]);

  useEffect(() => {
    const desktopQuery = window.matchMedia("(min-width: 821px)");
    const closeOnDesktop = (event) => {
      if (event.matches) setMenuOpen(false);
    };
    desktopQuery.addEventListener("change", closeOnDesktop);
    return () => desktopQuery.removeEventListener("change", closeOnDesktop);
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => setMenuOpen(false), 0);
    return () => window.clearTimeout(timer);
  }, [pathname]);

  const changeLanguage = (nextLanguage) => {
    setLanguage(nextLanguage);
    setMenuOpen(false);
  };

  return (
    <header className={`site-header${scrolled ? " is-scrolled" : ""}`}>
      <Brand />
      <button
        className="menu-toggle"
        type="button"
        aria-expanded={menuOpen}
        aria-controls="site-nav"
        onClick={() => setMenuOpen((current) => !current)}
      >
        <span />
        <span />
        <span className="sr-only">{t.menu}</span>
      </button>
      <nav className="site-nav" id="site-nav" aria-label={t.navigation}>
        {navigation.map((item) => {
          const active = normalizedPathname === item.href;
          return (
            <Link
              className={active ? "is-active" : ""}
              href={item.href}
              key={item.href}
              aria-current={active ? "page" : undefined}
              onClick={() => setMenuOpen(false)}
            >
              {t[item.key]}
            </Link>
          );
        })}
      </nav>
      <div className="header-actions">
        <div className="language-switch" role="group" aria-label="Language">
          {[
            ["mk", "MK"],
            ["en", "EN"],
          ].map(([code, label], index) => (
            <span className="language-option" key={code}>
              {index > 0 && <span aria-hidden="true">/</span>}
              <button
                className={`lang-btn${language === code ? " is-active" : ""}`}
                type="button"
                aria-pressed={language === code}
                onClick={() => changeLanguage(code)}
              >
                {label}
              </button>
            </span>
          ))}
        </div>
        <a className="header-call" href="tel:+38970476287">
          {t.callShort}
        </a>
      </div>
    </header>
  );
}

export function SiteFooter() {
  const { t } = useLanguage();
  return (
    <footer className="site-footer">
      <Brand footer />
      <p>
        © 2026 {t.footerRights}
        <span className="footer-credit">
          {t.footerDevelopedBy}{" "}
          <a href="https://oninova.net" target="_blank" rel="noreferrer">
            ONINOVA
          </a>
          .
        </span>
      </p>
      <div className="footer-actions">
        <Link className="footer-contact-link" href="/contact">
          {t.navContact} <span aria-hidden="true">↗</span>
        </Link>
        <SocialLinks />
      </div>
    </footer>
  );
}

export function RouteEffects() {
  const pathname = usePathname();

  useEffect(() => {
    const elements = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -32px" },
    );
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
