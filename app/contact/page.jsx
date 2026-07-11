"use client";

import Image from "next/image";
import PageHero from "../../components/PageHero";
import { useLanguage } from "../../components/LanguageProvider";

export default function ContactPage() {
  const { t } = useLanguage();
  return (
    <main id="main">
      <PageHero
        eyebrow={t.contactPageEyebrow}
        title={t.contactPageTitle}
        lead={t.contactPageLead}
        image="/assets/slide2.jpg"
        alt={t.aboutHeroAlt}
        index="05"
      />

      <section className="contact-page section">
        <div className="contact-page-intro reveal">
          <p className="eyebrow">{t.contactEyebrow}</p>
          <h2>{t.contactIntroTitle}</h2>
          <p>{t.contactIntroText}</p>
          <a className="button button-primary" href="tel:+38970476287">
            <span>+389 70 476 287</span>
            <span aria-hidden="true">↗</span>
          </a>
        </div>
        <div className="contact-details contact-details-light reveal">
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
            <span>{t.phoneLabel}</span>
            <a href="tel:+38970476287">+389 70 476 287</a>
          </div>
          <div className="contact-row">
            <span>{t.landmarkLabel}</span>
            <p>{t.landmark}</p>
          </div>
        </div>
      </section>

      <section className="location-section section-dark">
        <div className="location-photo reveal">
          <Image
            src="/assets/servisslave.jpg"
            alt={t.workshopExteriorAlt}
            width={200}
            height={265}
            sizes="(max-width: 820px) 100vw, 42vw"
          />
        </div>
        <div className="location-copy reveal">
          <p className="eyebrow light">{t.locationLabel}</p>
          <p className="coordinates">42.000670<br />21.501745</p>
          <h2>{t.locationTitle}</h2>
          <p>{t.locationText}</p>
          <a
            className="button button-light"
            href="https://www.google.com/maps?q=42.000670,21.501745"
            target="_blank"
            rel="noreferrer"
          >
            <span>{t.directions}</span>
            <span aria-hidden="true">↗</span>
          </a>
        </div>
      </section>
    </main>
  );
}
