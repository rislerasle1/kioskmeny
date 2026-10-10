# Kioskmeny med Google Sheets

CSV-lenkene er ferdig lagt inn i `sheets-config.js`.

## Filer
- index.html
- sidea.html
- sideb.html
- sidec.html
- sided.html
- google-sheets-loader.js
- sheets-config.js

## Test
Åpne `https://rislerasle1.github.io/kioskmeny/`.

## Dynamisk meny
- Maksimalt fire kategoribokser og 16 produkter per menyside.
- Flere menysider opprettes automatisk.
- Data hentes på nytt ved hver sidevisning.
- Rotasjonen bygges på nytt hvert femte minutt.
- Klokkesiden (sidea) hoppes over mens kiosken er åpen.

## Rekvisita (side 2)
Rekvisita-siden (`sided.html`) vises etter menysidene, med én boks per kategori (f.eks. Rekvisita og Supporter).

- Varene redigeres i fanen **Rekvisita** i regnearket: `Aktiv`, `Kategori`, `Produkt`, `Pris`, `Beskrivelse`, `Tag`, `Rekkefølge`.
- Ny kategori = skriv et nytt navn i Kategori-kolonnen. Maks fire kategorier og 16 varer per side; flere sider lages automatisk.
- Tom pris gjør at prisen ikke vises. Tag bruker de samme taggene som Meny-fanen.
- Tekster-fanen: `rekvisitaIntro` (tekst i sidepanelet) og `rekvisitaNotice` (kort merknad øverst).
