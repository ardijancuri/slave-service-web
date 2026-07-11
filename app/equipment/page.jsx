"use client";

import Image from "next/image";
import Link from "next/link";
import PageHero from "../../components/PageHero";
import { useLanguage } from "../../components/LanguageProvider";

export default function EquipmentPage() {
  const { t } = useLanguage();
  return (
    <main id="main">
      <PageHero
        eyebrow={t.equipmentPageEyebrow}
        title={t.equipmentPageTitle}
        lead={t.equipmentPageLead}
        image="/assets/hq/slide1-hq.jpg"
        alt={t.equipmentAlt}
        index="03"
      />

      <section className="equipment section-dark equipment-page-feature">
        <div className="equipment-copy reveal">
          <p className="eyebrow light">{t.equipmentEyebrow}</p>
          <p className="equipment-kicker">KOMTEST</p>
          <h2>CR1100</h2>
          <p>{t.equipmentText}</p>
          <ul className="equipment-tags" aria-label={t.supportedSystems}>
            <li>BOSCH</li>
            <li>DELPHI</li>
            <li>DENSO</li>
            <li>SIEMENS</li>
          </ul>
        </div>
        <figure className="equipment-figure reveal">
          <Image
            src="/assets/hq/galery4-hq.jpg"
            alt={t.equipmentAlt}
            width={1511}
            height={1041}
            sizes="(max-width: 820px) 100vw, 62vw"
          />
          <figcaption>
            <span>{t.equipmentCaption}</span>
            <span>CR / 1100</span>
          </figcaption>
        </figure>
      </section>

      <section className="section equipment-details">
        <div className="equipment-detail reveal">
          <span>01</span>
          <div>
            <p className="eyebrow">COMMON RAIL</p>
            <h2>{t.newGenerationTitle}</h2>
            <p>{t.newGenerationText}</p>
          </div>
        </div>
        <div className="equipment-detail reveal">
          <span>02</span>
          <div>
            <p className="eyebrow">MAYER</p>
            <h2>{t.olderTechnologyTitle}</h2>
            <p>{t.olderTechnologyText}</p>
          </div>
        </div>
      </section>

      <section className="section equipment-proof">
        <Image
          className="reveal"
          src="/assets/hq/galery2-hq.jpg"
          alt={t.galleryAlt2}
          width={1510}
          height={1042}
          sizes="(max-width: 820px) 100vw, 50vw"
        />
        <div className="reveal">
          <p className="eyebrow">{t.precisionEyebrow}</p>
          <h2>{t.precisionTitle}</h2>
          <p>{t.precisionText}</p>
          <Link className="inline-arrow" href="/services">
            {t.viewServices} <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>
    </main>
  );
}
