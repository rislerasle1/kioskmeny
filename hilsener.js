// Korte hilsener under tittelen på matmenyen (sideb.html).
// Vanlige hilsener byttes én gang i døgnet. Har dagen en egen hilsen, vises den i stedet.
// Rediger fritt: legg til, fjern eller endre tekstene under.
const HILSENER = [
  "Ha en strålende dag!",
  "Heia Hasle-Løren!",
  "Kald hall, varm kaffe.",
  "Varme hender heier bedre.",
  "Dommeren har alltid rett. Det har kaffen også.",
  "Heia begge lag.",
  "Sukker er også energi. Det sier i hvert fall U10.",
  "Hver krone her går rett til klubben.",
  "Skudd som ikke tas, går ikke inn. Det samme gjelder vafler.",
  "En pølse i hånda er bedre enn ti på grillen.",
  "Takk til dagens kioskvert!"
];

// Hilsener låst til dato. fn(dato) returnerer true de dagene hilsenen skal vises.
// Månedene telles fra 0: januar = 0, oktober = 9, november = 10, desember = 11.
const erDato = (d, dag, mnd) => d.getMonth() === mnd && d.getDate() === dag;
const mellom = (d, mnd, fra, til) => d.getMonth() === mnd && d.getDate() >= fra && d.getDate() <= til;
const nteSondag = (d, mnd, n) => d.getMonth() === mnd && d.getDay() === 0 && Math.ceil(d.getDate() / 7) === n;
const tilbud = navn => `${navn}: prisene er like gode som i går.`;
const DATOHILSENER = [
  { tekst: "Trick or treat?",                                          fn: d => erDato(d, 31, 9) },
  { tekst: "Gratulerer med farsdagen! Kaffe på pappa?",                fn: d => nteSondag(d, 10, 2) },
  { tekst: tilbud("Singles Day"),                                      fn: d => erDato(d, 11, 10) },
  // Black Friday: fredagen etter fjerde torsdag i november (23.–29. nov)
  { tekst: tilbud("Black Friday"),                                     fn: d => d.getDay() === 5 && mellom(d, 10, 23, 29) },
  // 1. søndag i advent: søndagen mellom 27. november og 3. desember
  { tekst: "Første søndag i advent.",                                  fn: d => d.getDay() === 0 && (mellom(d, 10, 27, 30) || mellom(d, 11, 1, 3)) },
  // Cyber Monday: mandagen etter Black Friday (26. nov – 2. des)
  { tekst: tilbud("Cyber Monday"),                                     fn: d => d.getDay() === 1 && (mellom(d, 10, 26, 30) || mellom(d, 11, 1, 2)) },
  { tekst: "God Lucia!",                                               fn: d => erDato(d, 13, 11) },
  { tekst: "God jul fra alle oss i Hasle-Løren!",                      fn: d => mellom(d, 11, 23, 30) },
  { tekst: d => `Godt nyttår! Siste vaffel i ${d.getFullYear()}?`,     fn: d => erDato(d, 31, 11) },
  { tekst: "Nyttårsforsett: flere vafler, færre utvisninger.",         fn: d => mellom(d, 0, 1, 5) },
  { tekst: "Trettende dag jul. Julen er over – sesongen er ikke det.", fn: d => erDato(d, 6, 0) },
  // Etter 15. januar
  { tekst: "Gratulerer med morsdagen! Vaffel på mamma?",               fn: d => nteSondag(d, 1, 2) },
  { tekst: "Valentinsdag – kjærlighet på pinne, selvsagt.",            fn: d => erDato(d, 14, 1) }
];

// Samme tekst på begge skjermene hele dagen: valget avhenger bare av datoen.
function dagensHilsen(now = new Date()) {
  const dato = DATOHILSENER.find(h => h.fn(now));
  if (dato) return typeof dato.tekst === "function" ? dato.tekst(now) : dato.tekst;
  const dagNr = Math.floor(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()) / 86400000);
  return HILSENER[dagNr % HILSENER.length];
}
