"use client";

import Image from "next/image";
import Link from "next/link";
import PageHero from "../../components/PageHero";
import { useLanguage } from "../../components/LanguageProvider";

const images = [
  ["galery4.jpg", "gallery1", "KOMTEST CR1100"],
  ["galery2.jpg", "gallery2", "galleryAlt2"],
  ["galery3.jpg", "gallery3", "galleryAlt3"],
  ["galery1.jpg", "gallery4", "galleryAlt4"],
  ["komtest1.jpg", "gallery5", "equipmentAlt"],
  ["komtest2.jpg", "gallery6", "galleryAlt2"],
  ["komtest3.jpg", "gallery7", "equipmentAlt"],
  ["servis2.jpg", "gallery8", "workbenchAlt"],
];

export default function GalleryPage() {
  const { t } = useLanguage();
  return (
    <main id="main">
      <PageHero
        eyebrow={t.galleryPageEyebrow}
        title={t.galleryPageTitle}
        lead={t.galleryPageLead}
        image="/assets/slide3.jpg"
        alt={t.workbenchAlt}
        index="04"
      />

      <section className="section gallery-page-intro">
        <p className="eyebrow reveal">{t.galleryEyebrow}</p>
        <h2 className="reveal">{t.galleryIntroTitle}</h2>
        <p className="reveal">{t.galleryIntro}</p>
      </section>

      <section className="gallery-wall section">
        {images.map(([src, captionKey, altKey], index) => (
          <figure className="gallery-wall-item reveal" key={src}>
            <Image
              src={`/assets/${src}`}
              alt={t[altKey] || altKey}
              width={index < 4 ? 270 : 190}
              height={index < 4 ? 186 : 190}
              sizes="(max-width: 620px) 100vw, 50vw"
            />
            <figcaption>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <p>{t[captionKey]}</p>
            </figcaption>
          </figure>
        ))}
      </section>

      <section className="simple-cta section-dark">
        <h2 className="reveal">{t.galleryCtaTitle}</h2>
        <Link className="button button-light reveal" href="/contact">
          <span>{t.visitWorkshop}</span>
          <span aria-hidden="true">↗</span>
        </Link>
      </section>
    </main>
  );
}
