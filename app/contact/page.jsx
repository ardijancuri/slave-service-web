"use client";

import PageHero from "../../components/PageHero";
import { useLanguage } from "../../components/LanguageProvider";
import { SocialLinks } from "../../components/SiteChrome";

const mapsUrl =
  "https://www.google.com/maps/search/?api=1&query=2G22%2BHVM%20Disel%20Service%20Slave%2C%20%C4%8Cento";
const mapsEmbedUrl =
  "https://maps.google.com/maps?q=2G22%2BHVM%20Disel%20Service%20Slave%2C%20%C4%8Cento&output=embed";

export default function ContactPage() {
  const { t } = useLanguage();
  return (
    <main id="main">
      <PageHero
        eyebrow={t.contactPageEyebrow}
        title={t.contactPageTitle}
        lead={t.contactPageLead}
        image="/assets/hq/slide2-hq.jpg"
        alt={t.aboutHeroAlt}
        index="05"
      />

      <section className="contact-page section">
        <div className="contact-page-intro reveal">
          <p className="eyebrow">{t.contactEyebrow}</p>
          <h2>{t.contactIntroTitle}</h2>
          <p>{t.contactIntroText}</p>
          <div className="contact-phone-actions">
            <a className="button button-primary" href="tel:+38970476287">
              <span>+389 70 476 287</span>
              <span aria-hidden="true">↗</span>
            </a>
            <a className="button button-primary" href="tel:+38971398355">
              <span>+389 71 398 355</span>
              <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
        <div className="contact-details contact-details-light reveal">
          <div className="contact-row">
            <span>{t.addressLabel}</span>
            <a href={mapsUrl} target="_blank" rel="noreferrer">
              <span>{t.addressValue}</span>
              <span aria-hidden="true">↗</span>
            </a>
          </div>
          <div className="contact-row">
            <span>{t.emailLabel}</span>
            <a href="mailto:dizelservisslave@gmail.com">
              dizelservisslave@gmail.com
            </a>
          </div>
          <div className="contact-row">
            <span>{t.phoneLabel}</span>
            <div className="contact-phone-list">
              <a href="tel:+38970476287">
                <span>+389 70 476 287</span>
                <span aria-hidden="true">↗</span>
              </a>
              <a href="tel:+38971398355">
                <span>+389 71 398 355</span>
                <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
          <div className="contact-row">
            <span>{t.socialMedia}</span>
            <SocialLinks variant="light" />
          </div>
        </div>
      </section>

      <section className="location-section section-dark">
        <div className="map-embed reveal">
          <iframe
            src={mapsEmbedUrl}
            title={t.mapTitle}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>
        <div className="location-copy reveal">
          <p className="eyebrow light">{t.locationLabel}</p>
          <h2>{t.locationTitle}</h2>
          <p>{t.locationText}</p>
          <a
            className="button button-light"
            href={mapsUrl}
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
