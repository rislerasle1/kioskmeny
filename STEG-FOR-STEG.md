# Kioskmeny med Google Sheets

CSV-lenkene er ferdig lagt inn i `sheets-config.js`.

## Filer
- index.html
- sidea.html
- sideb.html
- sidec.html
- sided.html
- skjerm.html
- begge.html
- marg.js
- google-sheets-loader.js
- sheets-config.js

## Test
Åpne `https://rislerasle1.github.io/kioskmeny/`.

## Dynamisk meny
- Maksimalt fire kategoribokser og 16 produkter per menyside.
- Flere menysider opprettes automatisk.
- Data hentes på nytt ved hver sidevisning.
- Rotasjonen bygges på nytt hvert femte minutt.
- Rotasjonen består bare av matmenyen (sideb, blå) og utstyrsmenyen (sided, rød).
- Klokke, dato og kioskvert vises nederst i margen på begge menyene (`marg.js`). Kioskvert hentes fra fanen Kioskvakter.

## Rekvisita (side 2)
Rekvisita-siden (`sided.html`) vises etter menysidene, med én boks per kategori (f.eks. Rekvisita og Supporter).

- Varene redigeres i fanen **Rekvisita** i regnearket: `Aktiv`, `Kategori`, `Produkt`, `Pris`, `Beskrivelse`, `Tag`, `Rekkefølge`.
- Ny kategori = skriv et nytt navn i Kategori-kolonnen. Maks fire kategorier og 16 varer per side; flere sider lages automatisk.
- Tom pris gjør at prisen ikke vises. Tag bruker de samme taggene som Meny-fanen.
- Tekster-fanen: `rekvisitaIntro` (tekst i sidepanelet) og `rekvisitaNotice` (kort merknad øverst).

## To skjermer (mot vindu / mot bane)
- `index.html` er en valgside med to knapper: **Mot vindu** og **Mot bane**.
- Skjermene kjører `skjerm.html?skjerm=vindu` og `skjerm.html?skjerm=bane`. Mot bane viser alltid neste side i rotasjonen, så skjermene veksler.
- Rotasjonen styres av klokka, så skjermene holder takten uten å være koblet sammen (også på to ulike maskiner).
- Ved hvert sideskifte skyter en puck over begge skjermene, annenhver gang mot høyre og mot venstre, og skyver inn neste side.
- Standard er at mot vindu står til venstre. Står den til høyre, legg til `&side=hoyre` (og `&side=venstre` på mot bane).
- `begge.html` viser begge skjermene side om side for testing.
- Chromebook: slå av speiling under Innstillinger → Enhet → Skjermer, åpne ett vindu per skjerm og trykk F11 (eller dobbeltklikk).

## Åpningstider og kamp
- Boksen i margen viser «Kiosken er åpen til …» eller «Kiosken åpner klokken …».
- Dagens kamper hentes fra istidene i iceice (`ISTIDER_CSV` i `sheets-config.js`). Rader der lag-kolonnen inneholder ordet «kamp» telles, men bare for Hasle-Lørens egne lag. HL2, veteranlag, treningskamper og andre klubber som leier is telles ikke.
- Starter en kamp før stengetid og slutter etter, står det «Kiosken er åpen til kampslutt, ca. …».
- Kommende kamper i dag vises som fotnote. Feiler hentingen, vises teksten `matchNote` fra Tekster-fanen i stedet.
