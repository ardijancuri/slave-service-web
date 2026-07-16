"use client";

import Image from "next/image";
import Link from "next/link";
import PageHero from "../../components/PageHero";
import { useLanguage } from "../../components/LanguageProvider";

const images = [
  ["gallery-cr1100.webp", "gallery1", "equipmentAlt", 1600, 2125],
  ["gallery-precision-bench.webp", "gallery2", "galleryAlt2", 1800, 1355],
  ["gallery-pumps.webp", "gallery3", "galleryAlt3", 1600, 2125],
  ["gallery-classic-test-bench.webp", "gallery4", "galleryAlt4", 1800, 1355],
  ["gallery-component-setup.webp", "gallery5", "equipmentAlt", 1600, 2125],
  ["gallery-parameters.webp", "gallery6", "equipmentAlt", 1800, 1355],
  ["gallery-manual-tester.webp", "gallery7", "galleryAlt4", 1600, 2125],
  ["gallery-injectors.webp", "gallery8", "workbenchAlt", 1800, 1355],
];

export default function GalleryPage() {
  const { t } = useLanguage();
  return (
    <main id="main">
      <PageHero
        eyebrow={t.galleryPageEyebrow}
        title={t.galleryPageTitle}
        lead={t.galleryPageLead}
        image="/assets/workshop/gallery-hero.webp"
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
              src={`/assets/workshop/${src}`}
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
