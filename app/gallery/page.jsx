"use client";

import Image from "next/image";
import Link from "next/link";
import PageHero from "../../components/PageHero";
import { useLanguage } from "../../components/LanguageProvider";

const images = [
  ["galery4-hq.jpg", "gallery1", "KOMTEST CR1100", 1511, 1041],
  ["galery2-hq.jpg", "gallery2", "galleryAlt2", 1510, 1042],
  ["galery3-hq.jpg", "gallery3", "galleryAlt3", 1512, 1040],
  ["galery1-hq.jpg", "gallery4", "galleryAlt4", 1512, 1040],
  ["komtest1-hq.jpg", "gallery5", "equipmentAlt", 1254, 1254],
  ["komtest2-hq.jpg", "gallery6", "galleryAlt2", 1254, 1254],
  ["komtest3-hq.jpg", "gallery7", "equipmentAlt", 1254, 1254],
  ["servis2-hq.jpg", "gallery8", "workbenchAlt", 1592, 988],
];

export default function GalleryPage() {
  const { t } = useLanguage();
  return (
    <main id="main">
      <PageHero
        eyebrow={t.galleryPageEyebrow}
        title={t.galleryPageTitle}
        lead={t.galleryPageLead}
        image="/assets/hq/slide3-hq.jpg"
        alt={t.workbenchAlt}
        index="04"
      />

      <section className="section gallery-page-intro">
        <p className="eyebrow reveal">{t.galleryEyebrow}</p>
        <h2 className="reveal">{t.galleryIntroTitle}</h2>
        <p className="reveal">{t.galleryIntro}</p>
      </section>

      <section className="gallery-wall section">
        {images.map(([src, captionKey, altKey, width, height], index) => (
          <figure className="gallery-wall-item reveal" key={src}>
            <Image
              src={`/assets/hq/${src}`}
              alt={t[altKey] || altKey}
              width={width}
              height={height}
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
