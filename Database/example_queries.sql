-- Eksempel SQL-spørringer for kunder og medlemskontingent
-- Viser kobling mellom `kunder`, `medlemskap` og `betalinger`

-- 1. Enkel oversikt: Kunde med type medlemskap og pris
SELECT k.Kundenummer,
       k.Navn,
       k.Epost,
       m.TypeMedlemskap,
       m.Pris AS StandardPris,
       k.Utløpsdato
FROM kunder k
JOIN medlemskap m ON k.MedlemskapID = m.MedlemskapID
ORDER BY k.Kundenummer;

-- 2. Utvidet oversikt: Inkluderer sum betalt, siste betaling og status
SELECT k.Kundenummer,
       k.Navn,
       m.TypeMedlemskap,
       m.Pris AS StandardPris,
       COALESCE(SUM(b.`Beløp`), 0) AS SumBetalt,
       MAX(b.Betalingsdato) AS SisteBetaling,
       CASE
         WHEN CURDATE() <= k.Utløpsdato THEN 'Aktiv'
         ELSE 'Utløpt'
       END AS Medlemsstatus,
       DATEDIFF(k.Utløpsdato, CURDATE()) AS DagerTilUtløp
FROM kunder k
JOIN medlemskap m ON k.MedlemskapID = m.MedlemskapID
LEFT JOIN betalinger b ON b.Kundenummer = k.Kundenummer
GROUP BY k.Kundenummer, k.Navn, m.TypeMedlemskap, m.Pris, k.Utløpsdato
ORDER BY k.Kundenummer;

-- 3. Finn kunder hvor medlemskap utløper innen 30 dager
SELECT k.Kundenummer,
       k.Navn,
       m.TypeMedlemskap,
       k.Utløpsdato,
       DATEDIFF(k.Utløpsdato, CURDATE()) AS DagerTilUtløp
FROM kunder k
JOIN medlemskap m ON k.MedlemskapID = m.MedlemskapID
WHERE k.Utløpsdato BETWEEN CURDATE() AND DATE_ADD(CURDATE(), INTERVAL 30 DAY)
ORDER BY k.Utløpsdato;

-- 4. Kunder uten noen registrerte betalinger
SELECT k.Kundenummer,
       k.Navn,
       m.TypeMedlemskap,
       m.Pris AS StandardPris
FROM kunder k
JOIN medlemskap m ON k.MedlemskapID = m.MedlemskapID
LEFT JOIN betalinger b ON b.Kundenummer = k.Kundenummer
WHERE b.Kundenummer IS NULL;
