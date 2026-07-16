"use client";

import Image from "next/image";
import Link from "next/link";
import PageHero from "../../components/PageHero";
import { useLanguage } from "../../components/LanguageProvider";

export default function AboutPage() {
  const { t } = useLanguage();
  return (
    <main id="main">
      <PageHero
        eyebrow={t.aboutPageEyebrow}
        title={t.aboutPageTitle}
        lead={t.aboutPageLead}
        image="/assets/workshop/home-hero.webp"
        alt={t.aboutHeroAlt}
        index="02"
      />

      <section className="section story-layout">
        <div className="story-copy reveal">
          <p className="eyebrow">{t.aboutEyebrow}</p>
          <h2>{t.aboutStoryTitle}</h2>
          <p className="large-copy">{t.aboutLead}</p>
          <p>{t.aboutText}</p>
        </div>
        <figure className="story-image reveal">
          <Image
            src="/assets/workshop/about-history.webp"
            alt={t.workbenchAlt}
            width={1800}
            height={1355}
            sizes="(max-width: 820px) 100vw, 45vw"
          />
          <figcaption>{t.aboutImageCaption}</figcaption>
        </figure>
      </section>

      <section className="section-dark mission-section">
        <div className="mission-label reveal">
          <span>01</span>
          <p className="eyebrow light">{t.missionEyebrow}</p>
        </div>
        <blockquote className="mission-quote reveal">{t.mission}</blockquote>
      </section>

      <section className="section values-section">
        <div className="section-heading compact reveal">
          <div>
            <p className="eyebrow">{t.valuesEyebrow}</p>
            <h2>{t.valuesTitle}</h2>
          </div>
          <p>{t.valuesLead}</p>
        </div>
        <div className="value-list">
          {[1, 2, 3].map((number) => (
            <article className="value-row reveal" key={number}>
              <span>0{number}</span>
              <h3>{t[`value${number}Title`]}</h3>
              <p>{t[`value${number}Text`]}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="simple-cta section">
        <h2 className="reveal">{t.aboutCtaTitle}</h2>
        <Link className="button button-primary reveal" href="/contact">
          <span>{t.contactUs}</span>
          <span aria-hidden="true">↗</span>
        </Link>
      </section>
    </main>
  );
}
