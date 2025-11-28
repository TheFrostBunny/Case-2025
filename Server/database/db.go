package database

import (
	"Server/models"
	"database/sql"
	"fmt"
	"log"
	"os"

	_ "github.com/go-sql-driver/mysql"
)

var DB *sql.DB

func Connect() {
	dbUser := os.Getenv("DB_USER")
	dbPass := os.Getenv("DB_PASSWORD")
	dbHost := os.Getenv("DB_HOST")
	dbName := os.Getenv("DB_NAME")
	dbPort := os.Getenv("DB_PORT")

	dsn := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s",
		dbUser, dbPass, dbHost, dbPort, dbName)

	var err error
	DB, err = sql.Open("mysql", dsn)
	if err != nil {
		log.Fatal("Feil ved DB-tilkobling:", err)
	}
	err = DB.Ping()
	if err != nil {
		log.Fatal("Kan ikke koble til DB:", err)
	}
	fmt.Println("Database tilkoblet!")
}

// Medlemskap
func CreateMedlemskap(db *sql.DB, m models.Medlemskap) (int, error) {
	res, err := db.Exec("INSERT INTO Medlemskap (TypeMedlemskap, Pris) VALUES (?, ?)", m.TypeMedlemskap, m.Pris)
	if err != nil {
		return 0, err
	}
	id, err := res.LastInsertId()
	return int(id), err
}

func GetMedlemskap(db *sql.DB, id int) (*models.Medlemskap, error) {
	row := db.QueryRow("SELECT MedlemskapID, TypeMedlemskap, Pris FROM Medlemskap WHERE MedlemskapID = ?", id)
	var m models.Medlemskap
	if err := row.Scan(&m.MedlemskapID, &m.TypeMedlemskap, &m.Pris); err != nil {
		return nil, err
	}
	return &m, nil
}

// Kunde
func CreateKunde(db *sql.DB, k models.Kunde) (int, error) {
	res, err := db.Exec("INSERT INTO Kunder (Navn, Epost, Telefon, MedlemskapID, Utløpsdato) VALUES (?, ?, ?, ?, ?)", k.Navn, k.Epost, k.Telefon, k.MedlemskapID, k.Utlopsdato)
	if err != nil {
		return 0, err
	}
	id, err := res.LastInsertId()
	return int(id), err
}

func GetKunde(db *sql.DB, id int) (*models.Kunde, error) {
	row := db.QueryRow("SELECT Kundenummer, Navn, Epost, Telefon, MedlemskapID, Utløpsdato FROM Kunder WHERE Kundenummer = ?", id)
	var k models.Kunde
	if err := row.Scan(&k.Kundenummer, &k.Navn, &k.Epost, &k.Telefon, &k.MedlemskapID, &k.Utlopsdato); err != nil {
		return nil, err
	}
	return &k, nil
}

// Betaling
func CreateBetaling(db *sql.DB, b models.Betaling) (int, error) {
	res, err := db.Exec("INSERT INTO Betalinger (Kundenummer, Beløp, Betalingsdato) VALUES (?, ?, ?)", b.Kundenummer, b.Belop, b.Betalingsdato)
	if err != nil {
		return 0, err
	}
	id, err := res.LastInsertId()
	return int(id), err
}

func GetBetaling(db *sql.DB, id int) (*models.Betaling, error) {
	row := db.QueryRow("SELECT BetalingID, Kundenummer, Beløp, Betalingsdato FROM Betalinger WHERE BetalingID = ?", id)
	var b models.Betaling
	if err := row.Scan(&b.BetalingID, &b.Kundenummer, &b.Belop, &b.Betalingsdato); err != nil {
		return nil, err
	}
	return &b, nil
}

// Treningsprogram
func CreateTreningsprogram(db *sql.DB, t models.Treningsprogram) (int, error) {
	res, err := db.Exec("INSERT INTO Treningsprogrammer (Navn, Beskrivelse, Varighet, MedlemskapID) VALUES (?, ?, ?, ?)", t.Navn, t.Beskrivelse, t.Varighet, t.MedlemskapID)
	if err != nil {
		return 0, err
	}
	id, err := res.LastInsertId()
	return int(id), err
}

func GetTreningsprogram(db *sql.DB, id int) (*models.Treningsprogram, error) {
	row := db.QueryRow("SELECT ProgramID, Navn, Beskrivelse, Varighet, MedlemskapID FROM Treningsprogrammer WHERE ProgramID = ?", id)
	var t models.Treningsprogram
	if err := row.Scan(&t.ProgramID, &t.Navn, &t.Beskrivelse, &t.Varighet, &t.MedlemskapID); err != nil {
		return nil, err
	}
	return &t, nil
}

// KundeProgram
func CreateKundeProgram(db *sql.DB, kp models.KundeProgram) (int, error) {
	res, err := db.Exec("INSERT INTO Kunde_Program (Kundenummer, ProgramID, StartDato) VALUES (?, ?, ?)", kp.Kundenummer, kp.ProgramID, kp.StartDato)
	if err != nil {
		return 0, err
	}
	id, err := res.LastInsertId()
	return int(id), err
}

func GetKundeProgram(db *sql.DB, id int) (*models.KundeProgram, error) {
	row := db.QueryRow("SELECT KundeProgramID, Kundenummer, ProgramID, StartDato FROM Kunde_Program WHERE KundeProgramID = ?", id)
	var kp models.KundeProgram
	if err := row.Scan(&kp.KundeProgramID, &kp.Kundenummer, &kp.ProgramID, &kp.StartDato); err != nil {
		return nil, err
	}
	return &kp, nil
}

// Treningstime
func CreateTreningstime(db *sql.DB, tt models.Treningstime) (int, error) {
	res, err := db.Exec("INSERT INTO Treningstimer (ProgramID, Dato, Klokkeslett, Varighet) VALUES (?, ?, ?, ?)", tt.ProgramID, tt.Dato, tt.Klokkeslett, tt.Varighet)
	if err != nil {
		return 0, err
	}
	id, err := res.LastInsertId()
	return int(id), err
}

func GetTreningstime(db *sql.DB, id int) (*models.Treningstime, error) {
	row := db.QueryRow("SELECT TimeID, ProgramID, Dato, Klokkeslett, Varighet FROM Treningstimer WHERE TimeID = ?", id)
	var tt models.Treningstime
	if err := row.Scan(&tt.TimeID, &tt.ProgramID, &tt.Dato, &tt.Klokkeslett, &tt.Varighet); err != nil {
		return nil, err
	}
	return &tt, nil
}

// Ansatt
func CreateAnsatt(db *sql.DB, a models.Ansatt) (int, error) {
	res, err := db.Exec("INSERT INTO Ansatte (Navn, Rolle, Telefon, Epost) VALUES (?, ?, ?, ?)", a.Navn, a.Rolle, a.Telefon, a.Epost)
	if err != nil {
		return 0, err
	}
	id, err := res.LastInsertId()
	return int(id), err
}

func GetAnsatt(db *sql.DB, id int) (*models.Ansatt, error) {
	row := db.QueryRow("SELECT AnsattID, Navn, Rolle, Telefon, Epost FROM Ansatte WHERE AnsattID = ?", id)
	var a models.Ansatt
	if err := row.Scan(&a.AnsattID, &a.Navn, &a.Rolle, &a.Telefon, &a.Epost); err != nil {
		return nil, err
	}
	return &a, nil
}

// Kundefeedback
func CreateKundefeedback(db *sql.DB, kf models.Kundefeedback) (int, error) {
	res, err := db.Exec("INSERT INTO Kundefeedback (Kundenummer, Tilbakemelding, Dato) VALUES (?, ?, ?)", kf.Kundenummer, kf.Tilbakemelding, kf.Dato)
	if err != nil {
		return 0, err
	}
	id, err := res.LastInsertId()
	return int(id), err
}

func GetKundefeedback(db *sql.DB, id int) (*models.Kundefeedback, error) {
	row := db.QueryRow("SELECT FeedbackID, Kundenummer, Tilbakemelding, Dato FROM Kundefeedback WHERE FeedbackID = ?", id)
	var kf models.Kundefeedback
	if err := row.Scan(&kf.FeedbackID, &kf.Kundenummer, &kf.Tilbakemelding, &kf.Dato); err != nil {
		return nil, err
	}
	return &kf, nil
}
