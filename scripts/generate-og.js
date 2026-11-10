const fs = require('fs');
const path = require('path');

// Dynamically locate sharp from backend or frontend
let sharp;
try {
  sharp = require('sharp');
} catch {
  try {
    sharp = require(path.resolve(__dirname, '../../hapua-vientien-backend/node_modules/sharp'));
  } catch {
    sharp = require('d:/HAPUA-VIENTIEN/hapua-vientien-backend/node_modules/sharp');
  }
}

const WIDTH = 1200;
const HEIGHT = 630;

async function generateOgImage() {
  console.log('Generating PDF-Accurate Royal Deep Blue Open Graph Image (1200x630)...');

  const frontendPublic = path.resolve(__dirname, '../public');
  const assetPath = path.join(frontendPublic, 'OG/asset/asset.jpg');
  const hapuaLogoPath = path.join(frontendPublic, 'images/hapua_logo.webp');
  const edlLogoPath = path.join(frontendPublic, 'logo_organization/EDL.webp');
  const aceLogoPath = path.join(frontendPublic, 'logo_organization/ACE.webp');
  const asecLogoPath = path.join(frontendPublic, 'logo_organization/ASEC.webp');

  // Base asset cropped to 1200x630
  const assetCropped = await sharp(assetPath)
    .resize(1200, 675)
    .extract({ left: 0, top: 40, width: WIDTH, height: HEIGHT })
    .toBuffer();

  // Top Logos: HAPUA and EDL side-by-side as in the PDF header
  const topHapua = await sharp(hapuaLogoPath)
    .resize({ width: 220, height: 56, fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();

  const topEdl = await sharp(edlLogoPath)
    .resize({ width: 56, height: 52, fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();

  // Footer partner logos
  const footerEdl = await sharp(edlLogoPath)
    .resize({ width: 54, height: 50, fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();

  const footerHapua = await sharp(hapuaLogoPath)
    .resize({ width: 140, height: 36, fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();

  const footerAce = await sharp(aceLogoPath)
    .resize({ width: 48, height: 48, fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();

  const footerAsec = await sharp(asecLogoPath)
    .resize({ width: 48, height: 48, fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();

  const svg = `
  <svg width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <!-- Spotlights -->
      <linearGradient id="spotLightConeB" x1="50%" y1="0%" x2="50%" y2="100%">
        <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.85" />
        <stop offset="25%" stop-color="#93C5FD" stop-opacity="0.3" />
        <stop offset="100%" stop-color="#3B82F6" stop-opacity="0" />
      </linearGradient>

      <!-- Soft gradient overlay over top half to make typography razor-sharp -->
      <linearGradient id="topVignette" x1="50%" y1="0%" x2="50%" y2="100%">
        <stop offset="0%" stop-color="#021136" stop-opacity="0.84" />
        <stop offset="50%" stop-color="#041B4E" stop-opacity="0.68" />
        <stop offset="85%" stop-color="#07225C" stop-opacity="0.15" />
        <stop offset="100%" stop-color="#07225C" stop-opacity="0" />
      </linearGradient>

      <!-- Bottom gradient over floor to host the partner logos cleanly -->
      <linearGradient id="bottomVignette" x1="50%" y1="0%" x2="50%" y2="100%">
        <stop offset="0%" stop-color="#02102E" stop-opacity="0" />
        <stop offset="35%" stop-color="#02102E" stop-opacity="0.65" />
        <stop offset="100%" stop-color="#010A1F" stop-opacity="0.95" />
      </linearGradient>

      <!-- Corner Wings -->
      <linearGradient id="wingGradLeft" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#00184A" />
        <stop offset="60%" stop-color="#002D80" />
        <stop offset="100%" stop-color="#0055D4" />
      </linearGradient>

      <linearGradient id="wingGradRight" x1="100%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#00184A" />
        <stop offset="60%" stop-color="#002D80" />
        <stop offset="100%" stop-color="#0055D4" />
      </linearGradient>

      <linearGradient id="neonCyanB" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#00F0FF" />
        <stop offset="100%" stop-color="#0099FF" />
      </linearGradient>

      <linearGradient id="textElectricBlue" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#38BDF8" />
        <stop offset="50%" stop-color="#FFFFFF" />
        <stop offset="100%" stop-color="#38BDF8" />
      </linearGradient>

      <filter id="cardShadowB" x="-10%" y="-20%" width="120%" height="160%">
        <feDropShadow dx="0" dy="6" stdDeviation="12" flood-color="#00F0FF" flood-opacity="0.25" />
        <feDropShadow dx="0" dy="3" stdDeviation="6" flood-color="#000000" flood-opacity="0.5" />
      </filter>

      <filter id="textGlowB" x="-10%" y="-20%" width="120%" height="150%">
        <feDropShadow dx="0" dy="2" stdDeviation="6" flood-color="#001F5C" flood-opacity="0.9" />
      </filter>
    </defs>

    <!-- Top Vignette -->
    <rect x="0" y="0" width="${WIDTH}" height="325" fill="url(#topVignette)" />

    <!-- 5 Stage Spotlights -->
    <polygon points="120,0 25,270 215,270" fill="url(#spotLightConeB)" opacity="0.65" />
    <rect x="105" y="0" width="30" height="7" rx="3.5" fill="#FFFFFF" stroke="#93C5FD" stroke-width="1" />

    <polygon points="360,0 245,320 475,320" fill="url(#spotLightConeB)" opacity="0.8" />
    <rect x="345" y="0" width="30" height="7" rx="3.5" fill="#FFFFFF" stroke="#93C5FD" stroke-width="1" />

    <circle cx="600" cy="0" r="380" fill="#FFFFFF" fill-opacity="0.1" />
    <polygon points="600,0 445,350 755,350" fill="url(#spotLightConeB)" opacity="0.95" />
    <rect x="583" y="0" width="34" height="8" rx="4" fill="#FFFFFF" stroke="#93C5FD" stroke-width="1" />

    <polygon points="840,0 725,320 955,320" fill="url(#spotLightConeB)" opacity="0.8" />
    <rect x="825" y="0" width="30" height="7" rx="3.5" fill="#FFFFFF" stroke="#93C5FD" stroke-width="1" />

    <polygon points="1080,0 985,270 1175,270" fill="url(#spotLightConeB)" opacity="0.65" />
    <rect x="1065" y="0" width="30" height="7" rx="3.5" fill="#FFFFFF" stroke="#93C5FD" stroke-width="1" />

    <!-- Top Pill: Holds BOTH HAPUA + EDL Logos as in the PDF header -->
    <g transform="translate(600, 50)">
      <rect x="-195" y="-32" width="390" height="64" rx="32" 
            fill="#FFFFFF" fill-opacity="0.97" stroke="#BAE6FD" stroke-width="1.5"
            filter="url(#cardShadowB)" />
      <!-- Subtle vertical divider between HAPUA and EDL in the top pill -->
      <line x1="45" y1="-18" x2="45" y2="18" stroke="#CBD5E1" stroke-width="1.2" stroke-linecap="round" />
    </g>

    <!-- Year Divider & Sub-tag -->
    <g transform="translate(600, 108)">
      <line x1="-165" y1="0" x2="-50" y2="0" stroke="#38BDF8" stroke-width="2.5" stroke-linecap="round" />
      <text x="0" y="8" font-family="'Segoe UI', -apple-system, BlinkMacSystemFont, 'Inter', Roboto, sans-serif" 
            font-size="25" font-weight="900" fill="#FFFFFF" text-anchor="middle" letter-spacing="3.5" filter="url(#textGlowB)">
        2026
      </text>
      <line x1="50" y1="0" x2="165" y2="0" stroke="#38BDF8" stroke-width="2.5" stroke-linecap="round" />

      <text x="0" y="27" font-family="'Segoe UI', -apple-system, BlinkMacSystemFont, 'Inter', Roboto, sans-serif" 
            font-size="11.5" font-weight="800" fill="#BAE6FD" text-anchor="middle" letter-spacing="4" filter="url(#textGlowB)">
        VIENTIANE CAPITAL, LAO PDR
      </text>
    </g>

    <!-- Main Conference Title Block (Exact from PDF) -->
    <g transform="translate(600, 180)">
      <!-- Line 1: 14th MEETING OF THE HEADS OF ASEAN POWER UTILITIES / AUTHORITIES -->
      <text x="0" y="0" font-family="'Segoe UI', -apple-system, BlinkMacSystemFont, 'Inter', Roboto, sans-serif" 
            font-size="18" font-weight="800" fill="#F1F5F9" text-anchor="middle" letter-spacing="2.2" filter="url(#textGlowB)">
        14th MEETING OF THE HEADS OF ASEAN POWER UTILITIES / AUTHORITIES
      </text>

      <!-- Line 2: (HAPUA) WORKING GROUP NO. 5 -->
      <text x="0" y="46" font-family="'Segoe UI', -apple-system, BlinkMacSystemFont, 'Inter', Roboto, sans-serif" 
            font-size="44" font-weight="900" fill="url(#textElectricBlue)" text-anchor="middle" letter-spacing="3" filter="url(#textGlowB)">
        (HAPUA) WORKING GROUP NO. 5
      </text>

      <!-- Line 3: Official Theme from PDF -->
      <text x="0" y="74" font-family="'Segoe UI', -apple-system, BlinkMacSystemFont, 'Inter', Roboto, sans-serif" 
            font-size="14.5" font-weight="700" fill="#E0F2FE" text-anchor="middle" letter-spacing="0.8" filter="url(#textGlowB)">
        &quot;Human Capital in the Age of Intelligence: Unlocking Skills, Innovation and Resilience&quot;
      </text>
    </g>

    <!-- Date & Venue Pill Badge (Exact from PDF: Crowne Plaza Hotel, Vientiane Capital, Lao PDR) -->
    <g transform="translate(600, 286)">
      <!-- Pill Container: width 720, rx 21, perfectly centered -->
      <rect x="-360" y="-21" width="720" height="42" rx="21" 
            fill="#FFFFFF" fill-opacity="0.97" stroke="#BAE6FD" stroke-width="1.8" filter="url(#cardShadowB)" />

      <!-- Calendar Section -->
      <g transform="translate(-315, -9)">
        <rect x="0" y="2" width="16" height="15" rx="3" fill="none" stroke="#0284C7" stroke-width="2" />
        <line x1="0" y1="7" x2="16" y2="7" stroke="#0284C7" stroke-width="2" />
        <line x1="4" y1="0" x2="4" y2="3" stroke="#0284C7" stroke-width="2" stroke-linecap="round" />
        <line x1="12" y1="0" x2="12" y2="3" stroke="#0284C7" stroke-width="2" stroke-linecap="round" />
      </g>
      <text x="-289" y="6" font-family="'Segoe UI', -apple-system, BlinkMacSystemFont, 'Inter', Roboto, sans-serif" 
            font-size="13" font-weight="800" fill="#0A1D45" letter-spacing="0.5">
        25 - 27 NOVEMBER 2026
      </text>

      <!-- Center Divider Line -->
      <line x1="-85" y1="-11" x2="-85" y2="11" stroke="#CBD5E1" stroke-width="1.5" stroke-linecap="round" />

      <!-- Venue Section (Exact from PDF: Crowne Plaza Hotel, Vientiane Capital, Lao PDR) -->
      <g transform="translate(-61, -10)">
        <path d="M 8,0 C 3.6,0 0,3.6 0,8 C 0,13.8 8,20 8,20 C 8,20 16,13.8 16,8 C 16,3.6 12.4,0 8,0 Z" fill="#0284C7" />
        <circle cx="8" cy="7.5" r="2.6" fill="#FFFFFF" />
      </g>
      <text x="-35" y="5.5" font-family="'Segoe UI', -apple-system, BlinkMacSystemFont, 'Inter', Roboto, sans-serif" 
            font-size="12.5" font-weight="800" fill="#0A1D45" letter-spacing="0.3">
        CROWNE PLAZA HOTEL, VIENTIANE CAPITAL, LAO PDR
      </text>
    </g>

    <!-- Bottom Vignette for Floor Logos -->
    <rect x="0" y="475" width="${WIDTH}" height="155" fill="url(#bottomVignette)" />

    <!-- Corner Wings -->
    <polygon points="0,460 0,630 190,630 80,525" fill="url(#wingGradLeft)" />
    <line x1="0" y1="460" x2="80" y2="525" stroke="url(#neonCyanB)" stroke-width="4.5" stroke-linecap="round" />
    <line x1="80" y1="525" x2="190" y2="630" stroke="url(#neonCyanB)" stroke-width="4.5" stroke-linecap="round" />

    <polygon points="${WIDTH},460 ${WIDTH},630 ${WIDTH-190},630 ${WIDTH-80},525" fill="url(#wingGradRight)" />
    <line x1="${WIDTH}" y1="460" x2="${WIDTH-80}" y2="525" stroke="url(#neonCyanB)" stroke-width="4.5" stroke-linecap="round" />
    <line x1="${WIDTH-80}" y1="525" x2="${WIDTH-190}" y2="630" stroke="url(#neonCyanB)" stroke-width="4.5" stroke-linecap="round" />

    <!-- Footer Logos Container Card -->
    <g transform="translate(600, 526)">
      <text x="0" y="-8" font-family="'Segoe UI', -apple-system, BlinkMacSystemFont, 'Inter', Roboto, sans-serif" 
            font-size="11" font-weight="800" fill="#93C5FD" text-anchor="middle" letter-spacing="3.5">
        HOSTED &amp; ORGANIZED BY
      </text>

      <rect x="-270" y="4" width="540" height="66" rx="33" 
            fill="#FFFFFF" fill-opacity="0.95" stroke="#BAE6FD" stroke-width="1.5" filter="url(#cardShadowB)" />

      <!-- Divider 1 -->
      <line x1="-138" y1="18" x2="-138" y2="56" stroke="#CBD5E1" stroke-width="1.2" stroke-linecap="round" />

      <!-- Divider 2 -->
      <line x1="68" y1="18" x2="68" y2="56" stroke="#CBD5E1" stroke-width="1.2" stroke-linecap="round" />

      <!-- Divider 3 -->
      <line x1="168" y1="18" x2="168" y2="56" stroke="#CBD5E1" stroke-width="1.2" stroke-linecap="round" />
    </g>
  </svg>
  `;

  // Composites: Top Pill with HAPUA at left and EDL at right, plus footer logos
  const composites = [
    { input: Buffer.from(svg), top: 0, left: 0 },
    // Top HAPUA Logo
    { input: topHapua, top: 22, left: 430 },
    // Top EDL Logo
    { input: topEdl, top: 24, left: 690 },
    // Footer Logos
    { input: footerEdl, top: 538, left: 380 },
    { input: footerHapua, top: 545, left: 485 },
    { input: footerAce, top: 539, left: 693 },
    { input: footerAsec, top: 539, left: 793 },
  ];

  const finalImage = await sharp(assetCropped).composite(composites);

  const ogJpegBuffer = await finalImage
    .jpeg({ quality: 96, chromaSubsampling: '4:4:4' })
    .toBuffer();

  const ogPngBuffer = await sharp(ogJpegBuffer)
    .png({ compressionLevel: 9 })
    .toBuffer();

  const outputPaths = [
    path.join(frontendPublic, 'OG/og-image.jpg'),
    path.join(frontendPublic, 'OG/og-image.png'),
    path.join(frontendPublic, 'images/og-image.jpg'),
    path.join(frontendPublic, 'og-image.jpg'),
    path.join(frontendPublic, 'og-image.png'),
    path.resolve(__dirname, '../src/app/opengraph-image.jpg'),
    path.resolve(__dirname, '../src/app/twitter-image.jpg'),
  ];

  for (const p of outputPaths) {
    const dir = path.dirname(p);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(p, p.endsWith('.png') ? ogPngBuffer : ogJpegBuffer);
    console.log(`Saved: ${p} (${fs.statSync(p).size} bytes)`);
  }

  console.log('SUCCESS: PDF-accurate Royal Deep Blue Open Graph images generated and saved across all paths!');
}

generateOgImage().catch(console.error);
