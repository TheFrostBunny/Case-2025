Nettsteder jeg har brukt:
https://daisyui.com/
https://tailwindcss.com/docs/installation/using-vite
https://vite.dev/
https://go.dev/doc/tutorial/database-access
https://dbdiagram.io/home (Brukt for å lage et diagram over databasen)



Bilder hentet fra:
https://www.smp.no/magasin/sprek/i/BWQ9aG/en-vanlig-feil-kan-oedelegge-treningsoekta-her-er-ekspertenes-ni-beste-oppvarmingsoevelser
https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1200&auto=format&fit=crop 
https://iform.nu/trening/styrketrening/3-vanlige-feil-nar-du-trener-armer 

## Universell utforming

Tiltak implementert i appen:
- Språk attributt `lang="no"` i index.html
- Skip-lenke til hovedinnhold (`Hopp til hovedinnhold`)
- Semantisk navigasjon (`<nav>`, `<main>`, `<footer>`)
- Én `h1` per sidevisning (Login, Bli medlem, Profil, Gruppe timer, Tale test)
- Alt-tekster for galleri-bilder (beskrivende norsk tekst)
- Skjema-feilmeldinger med `role="alert"` og `aria-live="assertive` (Login)
- Statusmeldinger med `role="status"` og `aria-live="polite` (påmeldinger, registrering, tale-test)
- Synlige fokusstiler og støtte for `prefers-reduced-motion`
- Karusell-knapper med `aria-label` (forrige/neste)
- Tale-støtte test med fallback
- Flytende "Les side" knapp som leser eller kopierer hovedinnhold

### Tale-støtte (/tale-test)
Komponenten sjekker Web Speech API. Hvis tale ikke støttes kopieres ønsket tekst til utklippstavlen.
Knappen endrer etikett til "Kopier tekst" ved manglende støtte.
Status oppdateres via `aria-live`.

Testscenario:
1. Åpne `/tale-test`.
2. Skriv inn tekst.
3. Aktiver knappen (Les opp / Kopier tekst).
4. Ved tale: bekreft lyd / Ved fallback: lim inn for å verifisere kopi.
5. Bruk Stopp-knapp for å avbryte.

### Les side knapp
Fast plassert nederst til høyre. Leseren:
- Samler tekst fra synlige `h1`, `h2`, `h3`, `p`, `li`.
- Leser første ~800 tegn med norsk stemme hvis tilgjengelig eller kopierer teksten ved manglende støtte.
- Viser status i lite live-område.

Videre forbedringsideer:
1. Høy-kontrast tema toggling.
2. Automatisk fokusstyring til `h1` ved rutenavigasjon.
3. Preferanse-lagring for valgt stemme og hastighet.
4. Integrering av skjema-valideringsmeldinger i `aria-describedby` for mer detaljerte feilmeldinger.
