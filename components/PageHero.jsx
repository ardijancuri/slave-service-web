import Image from "next/image";

export default function PageHero({ eyebrow, title, lead, image, alt, index }) {
  return (
    <section className="page-hero" aria-labelledby="page-title">
      <Image src={image} alt={alt} fill priority sizes="100vw" />
      <div className="page-hero-shade" aria-hidden="true" />
      <div className="page-hero-content">
        <p className="eyebrow hero-eyebrow">{eyebrow}</p>
        <h1 id="page-title">{title}</h1>
        <p>{lead}</p>
      </div>
      <span className="page-index" aria-hidden="true">
        {index} / 05
      </span>
    </section>
  );
}
