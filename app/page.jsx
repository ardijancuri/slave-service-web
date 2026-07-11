"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { useLanguage } from "../components/LanguageProvider";
import { SocialLinks } from "../components/SiteChrome";

const pageLinks = [
  ["01", "/services", "navServices", "homeServicesDescription"],
  ["02", "/about", "navAbout", "homeAboutDescription"],
  ["03", "/equipment", "navEquipment", "homeEquipmentDescription"],
  ["04", "/gallery", "navGallery", "homeGalleryDescription"],
  ["05", "/contact", "navContact", "homeContactDescription"],
];

export default function Home() {
  const { t } = useLanguage();
  const heroImageRef = useRef(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const onScroll = () => {
      if (heroImageRef.current && !reduceMotion) {
        heroImageRef.current.style.translate = `0 ${Math.min(window.scrollY * 0.08, 48)}px`;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
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
            <Link className="text-link" href="/services">
              <span>{t.exploreServices}</span>
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
        <div className="hero-index" aria-hidden="true">
          <span>42.0007° N</span>
          <span>21.5017° E</span>
        </div>
      </section>

      <section className="proof" aria-label={t.homeProofLabel}>
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

      <section className="section home-pages">
        <div className="section-heading reveal">
          <div>
            <p className="eyebrow">{t.homeExploreEyebrow}</p>
            <h2>{t.homeExploreTitle}</h2>
          </div>
          <p>{t.homeExploreLead}</p>
        </div>
        <div className="page-link-list">
          {pageLinks.map(([number, href, titleKey, descriptionKey]) => (
            <Link className="page-link-row reveal" href={href} key={href}>
              <span>{number}</span>
              <h3>{t[titleKey]}</h3>
              <p>{t[descriptionKey]}</p>
              <b aria-hidden="true">↗</b>
            </Link>
          ))}
        </div>
      </section>

      <section className="about section home-about">
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
          <Link className="inline-arrow" href="/about">
            {t.readOurStory} <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>

      <section className="contact home-contact section-dark">
        <div className="contact-intro reveal">
          <p className="eyebrow light">{t.contactEyebrow}</p>
          <h2>
            {t.contactTitleA}
            <br />
            {t.contactTitleB}
          </h2>
        </div>
        <div className="home-contact-actions reveal">
          <div className="home-contact-socials">
            <span>{t.socialMedia}</span>
            <SocialLinks presentation="buttons" />
          </div>
          <a className="button button-primary home-contact-phone" href="tel:+38970476287">
            <span>+389 70 476 287</span>
            <span aria-hidden="true">↗</span>
          </a>
          <Link className="text-link" href="/contact">
            {t.allContactDetails} <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>
    </main>
  );
}
