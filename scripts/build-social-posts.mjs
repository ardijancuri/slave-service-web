import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const outputDir = path.join(root, "output", "social-posts-2026-07-16");
const photoDir = "C:/Users/PC/Downloads/wetransfer_pxl_20260716_122223067-jpg_2026-07-16_1436";
const mediaDir = path.join(root, ".next", "dev", "static", "media");

const W = 1080;
const H = 1080;
const palette = {
  ink: "#121414",
  paper: "#EEECE6",
  paperDeep: "#DFDCD4",
  red: "#DF3F28",
  muted: "#777771",
  white: "#FFFFFF",
};

const contact = {
  phone1: "+389 70 476 287",
  phone2: "+389 71 398 355",
  email: "dizelservisslave@gmail.com",
  location: "ЧЕНТО · СКОПЈЕ",
  website: "dizelservisslave.com.mk",
};

const posts = [
  {
    id: "01",
    slug: "01-precizna-dijagnostika",
    source: "PXL_20260716_122200040.jpg",
    title: "ПРЕЦИЗНА ДИЈАГНОСТИКА",
    purpose: "Brand and location introduction",
    layout: "storefront",
    sourceOverride: path.join(outputDir, "source-storefront-cleaned.png"),
  },
  {
    id: "02",
    slug: "02-sigurna-popravka",
    source: "PXL_20260716_121400220.jpg",
    title: "ТОЧНА ДИЈАГНОСТИКА. ЈАСЕН РЕЗУЛТАТ.",
    purpose: "Precision diagnostic equipment",
    layout: "diagnostics",
  },
  {
    id: "03",
    slug: "03-komtest-cr1100",
    source: "PXL_20260716_121704374.jpg",
    sourceOverride: path.join(outputDir, "source-komtest-cleaned.png"),
    title: "KOMTEST CR1100",
    purpose: "Common rail testing capability",
    layout: "komtest",
  },
  {
    id: "04",
    slug: "04-elektronski-injektori",
    source: "PXL_20260716_121808912.jpg",
    sourceOverride: path.join(outputDir, "source-injectors-cables-cleaned.png"),
    title: "ЕЛЕКТРОНСКИ ИНЈЕКТОРИ",
    purpose: "Injector repair and testing",
    layout: "injectors",
  },
  {
    id: "05",
    slug: "05-pumpi-visok-pritisok",
    source: "PXL_20260716_121846489.jpg",
    title: "ПУМПИ ЗА ВИСОК ПРИТИСОК",
    purpose: "High-pressure pump service",
    layout: "pumps",
  },
  {
    id: "06",
    slug: "06-kompjuterska-dijagnostika",
    source: "PXL_20260716_122024763.jpg",
    sourceOverride: path.join(outputDir, "source-bosch-diagnostics-cleaned.png"),
    title: "КОМПЈУТЕРСКА ДИЈАГНОСТИКА",
    purpose: "BOSCH computer diagnostics",
    layout: "bosch",
  },
];

const escapeXml = (value) =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");

const dataUri = (buffer, mime) => `data:${mime};base64,${buffer.toString("base64")}`;

const fontFace = (family, weight, cyrillic, latin) => `
  @font-face {
    font-family: '${family}';
    font-style: normal;
    font-weight: ${weight};
    src: url('${cyrillic}') format('woff2');
    unicode-range: U+0301, U+0400-052F, U+1C80-1C8A, U+2116;
  }
  @font-face {
    font-family: '${family}';
    font-style: normal;
    font-weight: ${weight};
    src: url('${latin}') format('woff2');
    unicode-range: U+0000-02FF, U+2000-206F, U+20AC, U+2122, U+2190-21FF, U+2212, U+2215, U+FEFF, U+FFFD;
  }`;

const fontCss = async () => {
  const files = {
    robotoCyr: "537f068cf010a382-s.p.2zhn7sxq2ls8-.woff2",
    robotoLatin: "ef1484efef1c9752-s.p.0vtrapzs99yg4.woff2",
    ibmCyr: "1bcd0e671759a44c-s.p.2qt3tdwt-y9x_.woff2",
    ibmLatin: "03fc1b4a8d284b5e-s.p.0wiir8udbzjvx.woff2",
  };
  const loaded = {};
  for (const [key, filename] of Object.entries(files)) {
    loaded[key] = dataUri(await fs.readFile(path.join(mediaDir, filename)), "font/woff2");
  }
  return [500, 600, 700].map((weight) => fontFace("Roboto Condensed", weight, loaded.robotoCyr, loaded.robotoLatin)).join("\n")
    + [400, 500, 600].map((weight) => fontFace("IBM Plex Sans", weight, loaded.ibmCyr, loaded.ibmLatin)).join("\n");
};

const text = ({ x, y, lines, size, lineHeight = 1.02, fill = palette.ink, weight = 700, family = "Arial Narrow", anchor = "start", letterSpacing = 0 }) => {
  const tspans = lines.map((line, index) => `<tspan x="${x}" dy="${index === 0 ? 0 : Math.round(size * lineHeight)}">${escapeXml(line)}</tspan>`).join("");
  return `<text x="${x}" y="${y}" fill="${fill}" font-family="${family}" font-size="${size}" font-weight="${weight}" text-anchor="${anchor}" letter-spacing="${letterSpacing}">${tspans}</text>`;
};

const smallCaps = ({ x, y, value, fill = palette.ink, size = 20, anchor = "start", spacing = 1.8 }) =>
  `<text x="${x}" y="${y}" fill="${fill}" font-family="IBM Plex Sans" font-size="${size}" font-weight="600" text-anchor="${anchor}" letter-spacing="${spacing}">${escapeXml(value)}</text>`;

const footer = ({ y = 1014, dark = false, compact = false }) => {
  const fg = dark ? palette.paper : palette.ink;
  const rule = dark ? palette.red : palette.ink;
  const size = compact ? 17 : 18;
  return `
    <rect x="64" y="${y - 30}" width="952" height="2" fill="${rule}"/>
    ${smallCaps({ x: 64, y, value: `${contact.phone1}  ·  ${contact.phone2}`, fill: fg, size, spacing: 0.6 })}
    ${smallCaps({ x: 1016, y, value: `${contact.location}  ·  ${contact.website}`, fill: fg, size, spacing: 0.45, anchor: "end" })}
  `;
};

const topLogo = ({ uri, x = 64, y = 48, w = 280, h = 86 }) =>
  `<image href="${uri}" x="${x}" y="${y}" width="${w}" height="${h}" preserveAspectRatio="xMinYMid meet"/>`;

const photoImage = ({ uri, x, y, w, h }) =>
  `<image href="${uri}" x="${x}" y="${y}" width="${w}" height="${h}" preserveAspectRatio="none"/>`;

const svgDoc = ({ css, body, background = palette.paper }) => `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <style>
    ${css}
    text { text-rendering: geometricPrecision; }
  </style>
  <rect width="${W}" height="${H}" fill="${background}"/>
  ${body}
</svg>`;

async function cropPhoto(sourcePath, width, height, position = "centre", shiftX = 0) {
  let image;

  if (shiftX !== 0) {
    const resized = await sharp(sourcePath)
      .rotate()
      .resize({ height })
      .toBuffer({ resolveWithObject: true });
    const maxLeft = Math.max(0, resized.info.width - width);
    const baseLeft = position === "right"
      ? maxLeft
      : position === "left"
        ? 0
        : Math.round(maxLeft / 2);
    const left = Math.max(0, Math.min(maxLeft, baseLeft - shiftX));
    image = sharp(resized.data).extract({ left, top: 0, width, height });
  } else {
    image = sharp(sourcePath)
      .rotate()
      .resize(width, height, { fit: "cover", position });
  }

  return image
    .modulate({ brightness: 1.015, saturation: 0.93 })
    .sharpen({ sigma: 0.65 })
    .jpeg({ quality: 92, chromaSubsampling: "4:4:4" })
    .toBuffer();
}

async function prepareLogo(filename, width = 520) {
  return sharp(path.join(root, "public", "assets", filename))
    .rotate()
    .trim({ background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .resize({ width })
    .png()
    .toBuffer();
}

function storefront({ css, photo, logo }) {
  return svgDoc({ css, body: `
    <rect x="0" y="0" width="18" height="1080" fill="${palette.red}"/>
    ${topLogo({ uri: logo, x: 64, y: 46, w: 300, h: 92 })}
    ${smallCaps({ x: 1016, y: 71, value: "СПЕЦИЈАЛИЗИРАН ДИЗЕЛ СЕРВИС", fill: palette.red, anchor: "end", size: 19 })}
    ${text({ x: 1016, y: 126, lines: ["ПРЕЦИЗНА ДИЈАГНОСТИКА"], size: 46, fill: palette.ink, anchor: "end", letterSpacing: -1.2 })}
    ${photoImage({ uri: photo, x: 64, y: 176, w: 952, h: 614 })}
    <rect x="64" y="726" width="292" height="222" fill="${palette.red}"/>
    ${text({ x: 91, y: 844, lines: ["30+"], size: 122, fill: palette.white, weight: 700, letterSpacing: -4 })}
    ${smallCaps({ x: 94, y: 901, value: "ГОДИНИ ИСКУСТВО", fill: palette.white, size: 20, spacing: 1.1 })}
    <rect x="388" y="790" width="628" height="158" fill="${palette.paper}"/>
    ${text({ x: 424, y: 849, lines: ["СИГУРНА ПОПРАВКА."], size: 44, fill: palette.ink })}
    ${smallCaps({ x: 424, y: 891, value: "БОШ ПУМПИ · ИНЈЕКТОРИ · COMMON RAIL", fill: palette.muted, size: 18, spacing: 0.8 })}
    ${smallCaps({ x: 424, y: 924, value: "ЈАВЕТЕ СЕ ПРЕД ДА ДОЈДЕТЕ.", fill: palette.red, size: 18, spacing: 1.0 })}
    ${footer({ y: 1020 })}
  ` });
}

function diagnostics({ css, photo, logo }) {
  return svgDoc({ css, background: palette.ink, body: `
    <rect x="0" y="0" width="18" height="1080" fill="${palette.red}"/>
    <rect x="18" y="0" width="1062" height="126" fill="${palette.paper}"/>
    ${topLogo({ uri: logo, x: 64, y: 24, w: 274, h: 82 })}
    ${smallCaps({ x: 1016, y: 78, value: "ДИЈАГНОСТИКА · ТЕСТИРАЊЕ · РЕПАРИРАЊЕ", fill: palette.ink, anchor: "end", size: 18, spacing: 1.1 })}
    ${photoImage({ uri: photo, x: 64, y: 154, w: 952, h: 592 })}
    <rect x="826" y="154" width="190" height="118" fill="${palette.red}"/>
    ${text({ x: 921, y: 238, lines: ["02"], size: 76, fill: palette.white, anchor: "middle", letterSpacing: -2 })}
    ${text({ x: 64, y: 829, lines: ["ТОЧНА ДИЈАГНОСТИКА.", "ЈАСЕН РЕЗУЛТАТ."], size: 57, lineHeight: 0.96, fill: palette.paper, letterSpacing: -1.1 })}
    ${smallCaps({ x: 672, y: 831, value: "ПРЕЦИЗНО ОТКРИВАЊЕ", fill: palette.red, size: 18, spacing: 1.4 })}
    ${smallCaps({ x: 672, y: 868, value: "НА ГРЕШКИ И НИВНО", fill: palette.paperDeep, size: 18, spacing: 1.4 })}
    ${smallCaps({ x: 672, y: 905, value: "СИГУРНО РЕШАВАЊЕ.", fill: palette.paperDeep, size: 18, spacing: 1.4 })}
    ${footer({ y: 1020, dark: true })}
  ` });
}

function komtest({ css, photo, logo }) {
  return svgDoc({ css, body: `
    <rect x="0" y="0" width="1080" height="16" fill="${palette.red}"/>
    ${topLogo({ uri: logo, x: 64, y: 42, w: 265, h: 82 })}
    ${smallCaps({ x: 1016, y: 67, value: "COMMON RAIL СИСТЕМИ", fill: palette.red, anchor: "end", size: 19 })}
    ${text({ x: 1016, y: 119, lines: ["KOMTEST CR1100"], size: 52, fill: palette.ink, anchor: "end", letterSpacing: -1.2 })}
    <rect x="64" y="160" width="952" height="582" fill="${palette.ink}"/>
    ${photoImage({ uri: photo, x: 72, y: 168, w: 936, h: 566 })}
    <rect x="64" y="742" width="952" height="68" fill="${palette.ink}"/>
    ${smallCaps({ x: 92, y: 786, value: "ПРЕЦИЗНО ТЕСТИРАЊЕ ПОД РЕАЛНИ РАБОТНИ УСЛОВИ", fill: palette.paper, size: 20, spacing: 0.65 })}
    <rect x="64" y="852" width="292" height="106" fill="${palette.red}"/>
    ${smallCaps({ x: 86, y: 888, value: "03 / ТЕСТИРАЊЕ", fill: palette.white, size: 17, spacing: 1.0 })}
    ${text({ x: 86, y: 936, lines: ["COMMON RAIL"], size: 34, fill: palette.white, letterSpacing: -0.5 })}
    <rect x="388" y="852" width="628" height="106" fill="${palette.paperDeep}"/>
    ${smallCaps({ x: 420, y: 891, value: "BOSCH  ·  DELPHI  ·  DENSO  ·  SIEMENS", fill: palette.ink, size: 19, spacing: 0.9 })}
    ${smallCaps({ x: 420, y: 928, value: "CDI  ·  HDI  ·  CDTI", fill: palette.red, size: 19, spacing: 1.7 })}
    ${footer({ y: 1020 })}
  ` });
}

function injectors({ css, photo, logo }) {
  return svgDoc({ css, body: `
    <rect x="0" y="0" width="480" height="1080" fill="${palette.paper}"/>
    ${photoImage({ uri: photo, x: 480, y: 0, w: 600, h: 1080 })}
    <rect x="460" y="0" width="20" height="1080" fill="${palette.red}"/>
    ${topLogo({ uri: logo, x: 58, y: 52, w: 300, h: 92 })}
    ${smallCaps({ x: 60, y: 212, value: "04 / COMMON RAIL", fill: palette.red, size: 18 })}
    ${text({ x: 58, y: 310, lines: ["ЕЛЕКТРОНСКИ", "ИНЈЕКТОРИ"], size: 56, lineHeight: 0.96, fill: palette.ink, letterSpacing: -1.25 })}
    <rect x="60" y="452" width="286" height="3" fill="${palette.ink}"/>
    ${text({ x: 60, y: 510, lines: ["ПОПРАВКА,", "ТЕСТИРАЊЕ И", "РЕПАРИРАЊЕ."], size: 34, lineHeight: 1.14, fill: palette.muted, weight: 600, letterSpacing: -0.5 })}
    ${smallCaps({ x: 60, y: 686, value: "BOSCH · DELPHI", fill: palette.ink, size: 18, spacing: 1.2 })}
    ${smallCaps({ x: 60, y: 723, value: "DENSO · SIEMENS", fill: palette.ink, size: 18, spacing: 1.2 })}
    <rect x="58" y="808" width="300" height="108" fill="${palette.ink}"/>
    ${smallCaps({ x: 82, y: 852, value: "ЈАВЕТЕ СЕ ПРЕД", fill: palette.paper, size: 17, spacing: 1.2 })}
    ${smallCaps({ x: 82, y: 886, value: "ДА ДОЈДЕТЕ.", fill: palette.red, size: 17, spacing: 1.2 })}
    ${smallCaps({ x: 58, y: 984, value: contact.phone1, fill: palette.ink, size: 18, spacing: 0.8 })}
    ${smallCaps({ x: 58, y: 1018, value: contact.phone2, fill: palette.ink, size: 18, spacing: 0.8 })}
    ${smallCaps({ x: 1016, y: 1020, value: contact.website, fill: palette.white, anchor: "end", size: 17, spacing: 0.5 })}
  ` });
}

function pumps({ css, photo, logo }) {
  return svgDoc({ css, background: palette.ink, body: `
    ${photoImage({ uri: photo, x: 0, y: 0, w: 650, h: 1080 })}
    <rect x="650" y="0" width="430" height="1080" fill="${palette.ink}"/>
    <rect x="650" y="0" width="20" height="1080" fill="${palette.red}"/>
    ${topLogo({ uri: logo, x: 718, y: 52, w: 300, h: 92 })}
    ${smallCaps({ x: 720, y: 214, value: "05 / ДИЗЕЛ СЕРВИС", fill: palette.red, size: 18 })}
    ${text({ x: 718, y: 316, lines: ["ПУМПИ ЗА", "ВИСОК", "ПРИТИСОК"], size: 61, lineHeight: 0.94, fill: palette.paper, letterSpacing: -1.7 })}
    <rect x="720" y="495" width="296" height="3" fill="${palette.paper}"/>
    ${text({ x: 720, y: 554, lines: ["МЕРЕЊЕ,", "СЕРВИСИРАЊЕ И", "ПРОВЕРКА ПОД", "РЕАЛНИ УСЛОВИ."], size: 30, lineHeight: 1.18, fill: palette.paperDeep, weight: 600, letterSpacing: -0.2 })}
    <rect x="718" y="780" width="298" height="112" fill="${palette.red}"/>
    ${smallCaps({ x: 743, y: 826, value: "ВАШИОТ ДИЗЕЛ", fill: palette.white, size: 18, spacing: 1.5 })}
    ${smallCaps({ x: 743, y: 863, value: "ВО СИГУРНИ РАЦЕ.", fill: palette.white, size: 18, spacing: 1.2 })}
    ${smallCaps({ x: 718, y: 976, value: contact.phone1, fill: palette.paper, size: 18, spacing: 0.65 })}
    ${smallCaps({ x: 718, y: 1009, value: contact.phone2, fill: palette.paper, size: 18, spacing: 0.65 })}
    ${smallCaps({ x: 34, y: 1032, value: `${contact.location}  ·  ${contact.website}`, fill: palette.paper, size: 17, spacing: 0.45 })}
  ` });
}

function bosch({ css, photo, logo }) {
  return svgDoc({ css, body: `
    <rect x="0" y="0" width="1080" height="122" fill="${palette.ink}"/>
    ${topLogo({ uri: logo, x: 64, y: 22, w: 278, h: 82 })}
    <rect x="780" y="0" width="300" height="122" fill="${palette.red}"/>
    ${smallCaps({ x: 930, y: 73, value: "06 / BOSCH ДИЈАГНОСТИКА", fill: palette.white, anchor: "middle", size: 18, spacing: 1.0 })}
    ${photoImage({ uri: photo, x: 64, y: 154, w: 952, h: 594 })}
    <rect x="64" y="154" width="10" height="594" fill="${palette.red}"/>
    ${text({ x: 64, y: 833, lines: ["КОМПЈУТЕРСКА", "ДИЈАГНОСТИКА"], size: 61, lineHeight: 0.93, fill: palette.ink, letterSpacing: -1.7 })}
    ${text({ x: 690, y: 827, lines: ["ЗА СИТЕ ВИДОВИ", "НА ВОЗИЛА."], size: 36, lineHeight: 1.04, fill: palette.red, weight: 700, letterSpacing: -0.6 })}
    ${smallCaps({ x: 690, y: 928, value: "ПРЕЦИЗНО ОТКРИВАЊЕ НА ГРЕШКИ", fill: palette.muted, size: 17, spacing: 0.6 })}
    ${smallCaps({ x: 690, y: 961, value: "И НИВНО СИГУРНО РЕШАВАЊЕ.", fill: palette.muted, size: 17, spacing: 0.6 })}
    ${footer({ y: 1020, compact: true })}
  ` });
}

const builders = { storefront, diagnostics, komtest, injectors, pumps, bosch };

async function main() {
  await fs.mkdir(outputDir, { recursive: true });
  const css = await fontCss();
  const logoBlack = dataUri(await prepareLogo("dizel-servis-slave-logo-black.svg"), "image/png");
  const logoWhite = dataUri(await prepareLogo("dizel-servis-slave-logo-white.svg"), "image/png");

  const cropSettings = {
    storefront: { width: 952, height: 614, position: "centre" },
    diagnostics: { width: 952, height: 592, position: "centre" },
    komtest: { width: 936, height: 566, position: "centre" },
    injectors: { width: 600, height: 1080, position: "right", shiftX: 48 },
    pumps: { width: 650, height: 1080, position: "centre" },
    bosch: { width: 952, height: 594, position: "centre" },
  };

  const rendered = [];
  for (const post of posts) {
    const crop = cropSettings[post.layout];
    const originalSourcePath = path.join(photoDir, post.source);
    const sourcePath = post.sourceOverride && await fs.stat(post.sourceOverride).then(() => post.sourceOverride).catch(() => null)
      ? post.sourceOverride
      : originalSourcePath;
    const photo = dataUri(await cropPhoto(sourcePath, crop.width, crop.height, crop.position, crop.shiftX), "image/jpeg");
    const darkLogo = post.layout === "pumps" || post.layout === "bosch";
    const svg = builders[post.layout]({ css, photo, logo: darkLogo ? logoWhite : logoBlack });
    const svgPath = path.join(outputDir, `${post.slug}.svg`);
    const pngPath = path.join(outputDir, `${post.slug}.png`);
    await fs.writeFile(svgPath, svg, "utf8");
    await sharp(Buffer.from(svg)).png({ compressionLevel: 9, palette: false }).toFile(pngPath);
    rendered.push({ ...post, originalSourcePath, sourcePath, crop, svgPath, pngPath, dimensions: "1080x1080" });
  }

  const thumbSize = 340;
  const gap = 20;
  const sheetWidth = thumbSize * 3 + gap * 4;
  const sheetHeight = thumbSize * 2 + gap * 3;
  const thumbnails = await Promise.all(rendered.map((post) => sharp(post.pngPath).resize(thumbSize, thumbSize).png().toBuffer()));
  await sharp({ create: { width: sheetWidth, height: sheetHeight, channels: 4, background: palette.ink } })
    .composite(thumbnails.map((input, index) => ({
      input,
      left: gap + (index % 3) * (thumbSize + gap),
      top: gap + Math.floor(index / 3) * (thumbSize + gap),
    })))
    .png({ compressionLevel: 9 })
    .toFile(path.join(outputDir, "contact-sheet.png"));

  const manifest = {
    project: "Дизел Сервис Славе — Instagram/Facebook square posts",
    generatedAt: new Date().toISOString(),
    dimensions: { width: W, height: H, unit: "px", aspectRatio: "1:1" },
    platforms: ["Instagram", "Facebook"],
    brand: {
      palette,
      logoSource: path.join(root, "public", "assets", "dizel-servis-slave-logo.svg"),
      fonts: ["Roboto Condensed", "IBM Plex Sans"],
      websiteSource: root,
    },
    contact,
    sourcePreservation: "All workshop imagery is user-supplied photography or a user-supplied cleaned replacement derived from it. Edits are limited to crop, resize, modest color correction, deterministic branded overlays, a cleaned KOMTEST replacement, a user-requested cleanup of the storefront foreground, a user-requested cleanup of loose wall-side cables in the injector photo, and a user-requested organization and cleanup of the BOSCH diagnostics bench. Storefront signage, architecture, vehicles, framing, equipment, labels, and functional hoses were preserved.",
    posts: rendered,
  };
  await fs.writeFile(path.join(outputDir, "manifest.json"), JSON.stringify(manifest, null, 2), "utf8");
  await fs.writeFile(path.join(outputDir, "README.md"), `# Дизел Сервис Славе — Social Posts\n\nSix 1080×1080 square designs for Instagram and Facebook.\n\n- No gradients\n- Exact website logo, colors, Macedonian copy, and contact details\n- Deterministic SVG masters and PNG exports\n- Original user-supplied photography only\n\nSee \`manifest.json\` for the selected source image and provenance of every post.\n`, "utf8");
  console.log(`Rendered ${rendered.length} posts to ${outputDir}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
