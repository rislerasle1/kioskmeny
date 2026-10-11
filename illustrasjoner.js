// Illustrasjoner som fyller tomrommet under varene i utstyrsmenyen (sided.html).
// Velges ut fra kategorinavnet; kategorier uten treff får ingen illustrasjon.
const ILLU_NAVY="#0d3b66",ILLU_RED="#c0392b",ILLU_LIGHT="#edf2f7";
const ILLUSTRASJONER={
  // Hockeykølle med tape på bladet, taperull og puck
  rekvisita:`<svg viewBox="0 0 400 260" role="img" aria-label="Hockeykølle, tape og puck">
    <ellipse cx="210" cy="246" rx="170" ry="10" fill="${ILLU_LIGHT}"/>
    <polygon points="118,18 136,10 288,196 270,206" fill="${ILLU_NAVY}"/>
    <rect x="113" y="8" width="26" height="30" rx="4" transform="rotate(-39 126 23)" fill="${ILLU_RED}"/>
    <path d="M270,206 L288,196 Q330,206 372,202 Q382,204 379,218 Q330,228 276,222 Z" fill="${ILLU_NAVY}"/>
    <g stroke="#fff" stroke-width="4" opacity=".85"><line x1="300" y1="203" x2="298" y2="223"/><line x1="315" y1="204" x2="313" y2="224"/><line x1="330" y1="204" x2="328" y2="224"/><line x1="345" y1="203" x2="343" y2="223"/></g>
    <circle cx="82" cy="200" r="38" fill="${ILLU_RED}"/><circle cx="82" cy="200" r="27" fill="none" stroke="#fff" stroke-width="3" opacity=".5"/><circle cx="82" cy="200" r="16" fill="#fff"/>
    <path d="M118,212 Q150,222 172,214" stroke="${ILLU_RED}" stroke-width="10" fill="none" stroke-linecap="round"/>
    <rect x="180" y="226" width="64" height="14" fill="#000"/><ellipse cx="212" cy="240" rx="32" ry="9" fill="#000"/><ellipse cx="212" cy="226" rx="32" ry="9" fill="#2b2f36"/>
  </svg>`,
  // Drakt og skjerf
  supporter:`<svg viewBox="0 0 400 260" role="img" aria-label="Drakt og skjerf">
    <ellipse cx="200" cy="246" rx="170" ry="10" fill="${ILLU_LIGHT}"/>
    <path d="M110,40 L140,26 Q160,40 180,26 L210,40 L248,82 L222,104 L205,88 L205,236 L115,236 L115,88 L98,104 L72,82 Z" fill="${ILLU_NAVY}"/>
    <path d="M140,26 Q160,40 180,26 L174,24 Q160,33 146,24 Z" fill="${ILLU_RED}"/>
    <rect x="115" y="168" width="90" height="12" fill="${ILLU_RED}"/><rect x="115" y="186" width="90" height="5" fill="#fff"/>
    <path d="M232,68 L248,82 L222,104 L206,90 Z" fill="${ILLU_RED}"/><path d="M88,68 L72,82 L98,104 L114,90 Z" fill="${ILLU_RED}"/>
    <text x="160" y="140" text-anchor="middle" font-family="Arial,Helvetica,sans-serif" font-weight="900" font-size="44" fill="#fff">HL</text>
    <g transform="rotate(-28 315 140)">
      <rect x="292" y="22" width="46" height="220" rx="6" fill="${ILLU_RED}"/>
      <g fill="#fff"><rect x="292" y="52" width="46" height="9"/><rect x="292" y="74" width="46" height="9"/><rect x="292" y="182" width="46" height="9"/><rect x="292" y="204" width="46" height="9"/></g>
      <rect x="292" y="112" width="46" height="40" fill="${ILLU_NAVY}"/>
      <g stroke="${ILLU_RED}" stroke-width="4" stroke-linecap="round"><line x1="298" y1="242" x2="298" y2="256"/><line x1="309" y1="242" x2="309" y2="256"/><line x1="320" y1="242" x2="320" y2="256"/><line x1="331" y1="242" x2="331" y2="256"/><line x1="298" y1="8" x2="298" y2="22"/><line x1="309" y1="8" x2="309" y2="22"/><line x1="320" y1="8" x2="320" y2="22"/><line x1="331" y1="8" x2="331" y2="22"/></g>
    </g>
  </svg>`
};
function illustrasjon(kategori){
  const k=String(kategori).toLowerCase();
  const svg=/supporter|fan/.test(k)?ILLUSTRASJONER.supporter:/rekvisita|utstyr/.test(k)?ILLUSTRASJONER.rekvisita:"";
  return svg?`<div class="illu">${svg}</div>`:"";
}
