"use client";

import Link from "next/link";
import PageHero from "../../components/PageHero";
import { useLanguage } from "../../components/LanguageProvider";

const serviceItems = [1, 2, 3, 4, 5, 6];

export default function ServicesPage() {
  const { t } = useLanguage();
  return (
    <main id="main">
      <PageHero
        eyebrow={t.servicesPageEyebrow}
        title={t.servicesPageTitle}
        lead={t.servicesPageLead}
        image="/assets/slide3.jpg"
        alt={t.workbenchAlt}
        index="01"
      />

      <section className="section page-intro">
        <p className="eyebrow reveal">{t.servicesIntroEyebrow}</p>
        <h2 className="reveal">{t.servicesIntroTitle}</h2>
        <p className="page-intro-lead reveal">{t.servicesIntroText}</p>
      </section>

      <section className="section service-catalog">
        <div className="service-list">
          {serviceItems.map((number) => (
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

      <section className="section process-section">
        <div className="section-heading compact reveal">
          <div>
            <p className="eyebrow">{t.processEyebrow}</p>
            <h2>{t.processTitle}</h2>
          </div>
          <p>{t.processLead}</p>
        </div>
        <div className="process-list">
          {[1, 2, 3].map((number) => (
            <article className="process-step reveal" key={number}>
              <span>0{number}</span>
              <h3>{t[`process${number}Title`]}</h3>
              <p>{t[`process${number}Text`]}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="page-cta section-dark">
        <div className="reveal">
          <p className="eyebrow light">{t.guaranteeEyebrow}</p>
          <h2>{t.guaranteeTitle}</h2>
          <p>{t.guaranteeText}</p>
        </div>
        <div className="page-cta-action reveal">
          <p>{t.discount}</p>
          <Link className="button button-light" href="/contact">
            <span>{t.requestService}</span>
            <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>
    </main>
  );
}
