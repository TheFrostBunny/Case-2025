package handlers

import (
	"Server/database"
	"database/sql"
	"net/http"

	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
)

func Register(c *gin.Context) {
	var body struct {
		Navn             string `json:"navn"`
		Epost            string `json:"epost"`
		Telefon          string `json:"telefon"`
		Passord          string `json:"passord"`
		Utlopsdato       string `json:"utlopsdato"`
		MedlemskapID     int    `json:"medlemskap_id"`
		HarTreningstimer bool   `json:"har_treningstimer"`
	}
	if err := c.BindJSON(&body); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Ugyldig JSON"})
		return
	}
	hash, err := bcrypt.GenerateFromPassword([]byte(body.Passord), bcrypt.DefaultCost)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Feil ved hashing"})
		return
	}
	db := database.DB
	_, err = db.Exec(`INSERT INTO Kunder (Navn, Epost, Telefon, Passord, Utløpsdato, MedlemskapID, HarTreningstimer) VALUES (?, ?, ?, ?, ?, ?, ?)`, body.Navn, body.Epost, body.Telefon, string(hash), body.Utlopsdato, body.MedlemskapID, body.HarTreningstimer)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Feil ved lagring", "details": err.Error(), "data": body})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "Bruker opprettet!"})
}

func LoginHandler(db *sql.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		var body struct {
			Epost   string `json:"epost"`
			Passord string `json:"passord"`
		}

		if err := c.BindJSON(&body); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Ugyldig JSON"})
			return
		}

		var kundenummer int
		var hash string
		err := db.QueryRow("SELECT Kundenummer, Passord FROM Kunder WHERE Epost = ?", body.Epost).Scan(&kundenummer, &hash)
		if err != nil {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Feil epost eller passord"})
			return
		}

		if bcrypt.CompareHashAndPassword([]byte(hash), []byte(body.Passord)) != nil {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Feil epost eller passord"})
			return
		}

		token := "dummy-jwt-token-for-" + body.Epost

		c.JSON(http.StatusOK, gin.H{
			"message":     "Innlogging OK",
			"token":       token,
			"kundenummer": kundenummer,
		})
	}
}
