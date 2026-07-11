"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { translations } from "../lib/translations";

const services = [1, 2, 3, 4];
const navigation = ["Services", "About", "Equipment", "Gallery", "Contact"];

function Brand({ footer = false }) {
  return (
    <a
      className={`brand${footer ? " footer-brand" : ""}`}
      href="#top"
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
    </a>
  );
}

export default function Home() {
  const [language, setLanguage] = useState("mk");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const heroImageRef = useRef(null);
  const t = translations[language];

  useEffect(() => {
    const savedLanguage = window.localStorage.getItem("slave-language");
    const timer = window.setTimeout(() => {
      if (savedLanguage === "en") setLanguage("en");
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
    document.title = t.metaTitle;
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute("content", t.metaDescription);
    window.localStorage.setItem("slave-language", language);
  }, [language, t.metaDescription, t.metaTitle]);

  useEffect(() => {
    document.body.classList.toggle("nav-open", menuOpen);
    return () => document.body.classList.remove("nav-open");
  }, [menuOpen]);

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const updateHeader = () => {
      setScrolled(window.scrollY > 24);
      if (heroImageRef.current && !reduceMotion) {
        heroImageRef.current.style.translate = `0 ${Math.min(window.scrollY * 0.08, 48)}px`;
      }
    };
    window.addEventListener("scroll", updateHeader, { passive: true });
    updateHeader();
    return () => window.removeEventListener("scroll", updateHeader);
  }, []);

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
      { threshold: 0.12, rootMargin: "0px 0px -40px" },
    );
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  const switchLanguage = (nextLanguage) => {
    setLanguage(nextLanguage);
    setMenuOpen(false);
  };

  return (
    <>
      <a className="skip-link" href="#main">
        {t.skip}
      </a>

      <header
        className={`site-header${scrolled ? " is-scrolled" : ""}`}
        id="site-header"
      >
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
          {navigation.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              onClick={() => setMenuOpen(false)}
            >
              {t[`nav${item}`]}
            </a>
          ))}
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
                  onClick={() => switchLanguage(code)}
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

      <main id="main">
        <section className="hero" id="top" aria-labelledby="hero-title">
          <div className="hero-media" aria-hidden="true">
            <Image
              ref={heroImageRef}
              src="/assets/slide2.jpg"
              alt=""
              fill
              priority
              sizes="100vw"
            />
          </div>
          <div className="hero-shade" aria-hidden="true" />
          <div className="hero-content">
            <p className="eyebrow hero-eyebrow">{t.heroEyebrow}</p>
            <h1 id="hero-title">
              {t.heroTitleA}
              <br />
              {t.heroTitleB}
            </h1>
            <p className="hero-lead">{t.heroLead}</p>
            <div className="hero-actions">
              <a className="button button-primary" href="tel:+38970476287">
                <span>{t.bookCall}</span>
                <span aria-hidden="true">↗</span>
              </a>
              <a className="text-link" href="#services">
                <span>{t.exploreServices}</span>
                <span aria-hidden="true">↓</span>
              </a>
            </div>
          </div>
          <div className="hero-index" aria-hidden="true">
            <span>42.0007° N</span>
            <span>21.5017° E</span>
          </div>
        </section>

        <section className="proof" aria-label={t.navigation}>
          <div className="proof-item reveal">
            <strong>26+</strong>
            <span>{t.proofExperience}</span>
          </div>
          <div className="proof-item reveal">
            <strong>KOMTEST</strong>
            <span>{t.proofEquipment}</span>
          </div>
          <div className="proof-item reveal">
            <strong>BOSCH · DELPHI</strong>
            <span>{t.proofSystems}</span>
          </div>
        </section>

        <section className="services section" id="services">
          <div className="section-heading reveal">
            <div>
              <p className="eyebrow">{t.servicesEyebrow}</p>
              <h2>
                {t.servicesTitleA}
                <br />
                {t.servicesTitleB}
              </h2>
            </div>
            <p>{t.servicesIntro}</p>
          </div>

          <div className="service-list">
            {services.map((number) => (
              <article className="service-row reveal" key={number}>
                <span className="service-number">
                  {String(number).padStart(2, "0")}
                </span>
                <h3>{t[`service${number}Title`]}</h3>
                <p>{t[`service${number}Text`]}</p>
                <span className="service-arrow" aria-hidden="true">
                  ↗
                </span>
              </article>
            ))}
          </div>
        </section>

        <section className="about section" id="about">
          <div className="about-photo reveal">
            <Image
              src="/assets/slide3.jpg"
              alt={t.workbenchAlt}
              fill
              sizes="(max-width: 820px) 100vw, 55vw"
            />
            <span className="photo-caption">{t.photoCaption}</span>
          </div>
          <div className="about-copy reveal">
            <p className="eyebrow">{t.aboutEyebrow}</p>
            <h2>{t.aboutTitle}</h2>
            <p className="about-lead">{t.aboutLead}</p>
            <p>{t.aboutText}</p>
            <blockquote>{t.mission}</blockquote>
          </div>
        </section>

        <section className="equipment section-dark" id="equipment">
          <div className="equipment-copy reveal">
            <p className="eyebrow light">{t.equipmentEyebrow}</p>
            <p className="equipment-kicker">KOMTEST</p>
            <h2>CR1100</h2>
            <p>{t.equipmentText}</p>
            <ul className="equipment-tags" aria-label="Supported systems">
              <li>BOSCH</li>
              <li>DELPHI</li>
              <li>DENSO</li>
              <li>SIEMENS</li>
            </ul>
            <p className="equipment-note">{t.equipmentNote}</p>
          </div>
          <figure className="equipment-figure reveal">
            <Image
              src="/assets/slide1.jpg"
              alt={t.equipmentAlt}
              width={960}
              height={400}
              sizes="(max-width: 820px) 100vw, 65vw"
            />
            <figcaption>
              <span>{t.equipmentCaption}</span>
              <span>01 / 01</span>
            </figcaption>
          </figure>
        </section>

        <section className="gallery section" id="gallery">
          <div className="section-heading compact reveal">
            <div>
              <p className="eyebrow">{t.galleryEyebrow}</p>
              <h2>{t.galleryTitle}</h2>
            </div>
            <p>{t.galleryIntro}</p>
          </div>
          <div className="gallery-grid">
            <GalleryItem
              className="gallery-wide"
              number="01"
              src="/assets/galery4.jpg"
              alt="KOMTEST CR1100"
              caption={t.gallery1}
            />
            <GalleryItem
              number="02"
              src="/assets/galery2.jpg"
              alt={t.galleryAlt2}
              caption={t.gallery2}
            />
            <GalleryItem
              number="03"
              src="/assets/galery3.jpg"
              alt={t.galleryAlt3}
              caption={t.gallery3}
            />
            <GalleryItem
              className="gallery-tall"
              number="04"
              src="/assets/galery1.jpg"
              alt={t.galleryAlt4}
              caption={t.gallery4}
            />
          </div>
        </section>

        <section className="guarantee section">
          <div className="guarantee-number reveal" aria-hidden="true">
            ✓
          </div>
          <div className="guarantee-copy reveal">
            <p className="eyebrow">{t.guaranteeEyebrow}</p>
            <h2>{t.guaranteeTitle}</h2>
            <p>{t.guaranteeText}</p>
          </div>
          <p className="guarantee-aside reveal">{t.discount}</p>
        </section>

        <section className="contact section-dark" id="contact">
          <div className="contact-intro reveal">
            <p className="eyebrow light">{t.contactEyebrow}</p>
            <h2>
              {t.contactTitleA}
              <br />
              {t.contactTitleB}
            </h2>
            <a className="button button-light" href="tel:+38970476287">
              <span>+389 70 476 287</span>
              <span aria-hidden="true">↗</span>
            </a>
          </div>
          <div className="contact-details reveal">
            <div className="contact-row">
              <span>{t.addressLabel}</span>
              <p>
                {t.addressA}
                <br />
                {t.addressB}
              </p>
            </div>
            <div className="contact-row">
              <span>{t.emailLabel}</span>
              <a href="mailto:dizelservisslave@gmail.com">
                dizelservisslave@gmail.com
              </a>
            </div>
            <div className="contact-row">
              <span>{t.locationLabel}</span>
              <a
                href="https://www.google.com/maps?q=42.000670,21.501745"
                target="_blank"
                rel="noreferrer"
              >
                <span>{t.directions}</span>
                <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <Brand footer />
        <p>
          © {new Date().getFullYear()} {t.footerRights}
        </p>
        <a href="#top">
          {t.backTop} <span aria-hidden="true">↑</span>
        </a>
      </footer>
    </>
  );
}

function GalleryItem({ className = "", number, src, alt, caption }) {
  return (
    <figure className={`gallery-item ${className} reveal`}>
      <Image
        src={src}
        alt={alt}
        width={270}
        height={186}
        sizes="(max-width: 560px) 100vw, (max-width: 820px) 60vw, 50vw"
      />
      <figcaption>
        <span>{number}</span>
        <p>{caption}</p>
      </figcaption>
    </figure>
  );
}
