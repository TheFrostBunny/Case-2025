package models

import "time"

// Medlemskap representerer medlemskapstyper
// TypeMedlemskap: Standard, Premium, Familie, Student

type Medlemskap struct {
	MedlemskapID   int     `json:"medlemskap_id"`
	TypeMedlemskap string  `json:"type_medlemskap"`
	Pris           float64 `json:"pris"`
}

type Kunde struct {
	Kundenummer      int       `json:"kundenummer"`
	Navn             string    `json:"navn"`
	Epost            string    `json:"epost"`
	Telefon          string    `json:"telefon"`
	Passord          string    `json:"passord"`
	MedlemskapID     int       `json:"medlemskap_id"`
	Utlopsdato       time.Time `json:"utlopsdato"`
	HarTreningstimer bool      `json:"harTreningstimer"`
}

type Betaling struct {
	BetalingID    int       `json:"betaling_id"`
	Kundenummer   int       `json:"kundenummer"`
	Belop         float64   `json:"belop"`
	Betalingsdato time.Time `json:"betalingsdato"`
}

type Treningsprogram struct {
	ProgramID    int    `json:"program_id"`
	Navn         string `json:"navn"`
	Beskrivelse  string `json:"beskrivelse"`
	Varighet     int    `json:"varighet"` // dager
	MedlemskapID int    `json:"medlemskap_id"`
}

type KundeProgram struct {
	KundeProgramID int       `json:"kunde_program_id"`
	Kundenummer    int       `json:"kundenummer"`
	ProgramID      int       `json:"program_id"`
	StartDato      time.Time `json:"startdato"`
}

type Treningstime struct {
	TimeID      int    `json:"time_id"`
	ProgramID   int    `json:"program_id"`
	Dato        string `json:"dato"`
	Klokkeslett string `json:"klokkeslett"`
	Varighet    int    `json:"varighet"`
}

type Ansatt struct {
	AnsattID int    `json:"ansatt_id"`
	Navn     string `json:"navn"`
	Rolle    string `json:"rolle"`
	Telefon  string `json:"telefon"`
	Epost    string `json:"epost"`
}

type Kundefeedback struct {
	FeedbackID     int       `json:"feedback_id"`
	Kundenummer    int       `json:"kundenummer"`
	Tilbakemelding string    `json:"tilbakemelding"`
	Dato           time.Time `json:"dato"`
}
