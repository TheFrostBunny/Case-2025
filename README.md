# Treningssenter Webapp

Dette prosjektet er en fullstack webapplikasjon for treningssenter, med Go backend (Gin), MySQL/MariaDB database og React frontend (Vite + Tailwind CSS).

## Mappestruktur

- `Server/` — Go backend (API, database, ruter)
- `Web/` — React frontend

## Forutsetninger
- Go 1.20+
- Node.js 18+
- pnpm
- MySQL/MariaDB

## Oppsett

### 1. Klargjør database
- Opprett en database i MySQL/MariaDB
- Opprett nødvendige tabeller (se SQL-skjema eller Go-modeller)
- Legg inn en `.env`-fil i rotmappen med:
  ```env
  DB_USER=brukernavn
  DB_PASSWORD=passord
  DB_HOST=localhost
  DB_PORT=3306
  DB_NAME=treningssenter
  SERVER_PORT=3000
  ```

### 2. Backend (Go)
- Gå til `Server`-mappen:
  ```sh
  cd Server
  go mod tidy
  go run main.go
  ```
- API kjører på `http://localhost:3000`

### 3. Frontend (React)
- Gå til `Web`-mappen:
  ```sh
  cd Web
  pnpm install
  pnpm run dev
  ```
- Frontend kjører på `http://localhost:5000` (eller port du har satt)

## Bruk
- Registrer og logg inn brukere via frontend
- API-endepunkter: `/register`, `/auth/login`, `/kunde`, `/medlemskap`, osv.
- Se og administrer brukere, medlemskap, betalinger, treningsprogrammer

## Utvikling
- Endre backend i `Server/`
- Endre frontend i `Web/src/`
- Endre design-system i `Web/src/index.css` og `Web/tailwind.config.js`

## Feilsøking
- Sjekk at .env er riktig og at database kjører
- Sjekk at alle avhengigheter er installert
- Sjekk terminal for feilmeldinger

## Lisens
MIT
