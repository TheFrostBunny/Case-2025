package handlers

import (
	"Server/database"
	"Server/models"
	"database/sql"
	"strconv"

	"github.com/gin-gonic/gin"
)

// Medlemskap
func CreateMedlemskapHandler(db *sql.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		var m models.Medlemskap
		if err := c.BindJSON(&m); err != nil {
			c.JSON(400, gin.H{"error": "Invalid input"})
			return
		}
		id, err := database.CreateMedlemskap(db, m)
		if err != nil {
			c.JSON(500, gin.H{"error": "Database error"})
			return
		}
		c.JSON(201, gin.H{"id": id})
	}
}

func GetMedlemskapHandler(db *sql.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		idStr := c.Query("id")
		id, err := strconv.Atoi(idStr)
		if err != nil {
			c.JSON(400, gin.H{"error": "Invalid ID"})
			return
		}
		m, err := database.GetMedlemskap(db, id)
		if err != nil {
			c.JSON(404, gin.H{"error": "Not found"})
			return
		}
		c.JSON(200, m)
	}
}

// Kunde
func CreateKundeHandler(db *sql.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		var k models.Kunde
		if err := c.BindJSON(&k); err != nil {
			c.JSON(400, gin.H{"error": "Invalid input"})
			return
		}
		id, err := database.CreateKunde(db, k)
		if err != nil {
			c.JSON(500, gin.H{"error": "Database error"})
			return
		}
		c.JSON(201, gin.H{"id": id})
	}
}

func GetKundeHandler(db *sql.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		idStr := c.Query("id")
		id, err := strconv.Atoi(idStr)
		if err != nil {
			c.JSON(400, gin.H{"error": "Invalid ID"})
			return
		}
		k, err := database.GetKunde(db, id)
		if err != nil {
			c.JSON(404, gin.H{"error": "Not found"})
			return
		}
		c.JSON(200, k)
	}
}

// Betaling
func CreateBetalingHandler(db *sql.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		var b models.Betaling
		if err := c.BindJSON(&b); err != nil {
			c.JSON(400, gin.H{"error": "Invalid input"})
			return
		}
		id, err := database.CreateBetaling(db, b)
		if err != nil {
			c.JSON(500, gin.H{"error": "Database error"})
			return
		}
		c.JSON(201, gin.H{"id": id})
	}
}

func GetBetalingHandler(db *sql.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		idStr := c.Query("id")
		id, err := strconv.Atoi(idStr)
		if err != nil {
			c.JSON(400, gin.H{"error": "Invalid ID"})
			return
		}
		b, err := database.GetBetaling(db, id)
		if err != nil {
			c.JSON(404, gin.H{"error": "Not found"})
			return
		}
		c.JSON(200, b)
	}
}

// Treningsprogram
func CreateTreningsprogramHandler(db *sql.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		var tp models.Treningsprogram
		if err := c.BindJSON(&tp); err != nil {
			c.JSON(400, gin.H{"error": "Invalid input"})
			return
		}
		id, err := database.CreateTreningsprogram(db, tp)
		if err != nil {
			c.JSON(500, gin.H{"error": "Database error"})
			return
		}
		c.JSON(201, gin.H{"id": id})
	}
}

func GetTreningsprogramHandler(db *sql.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		idStr := c.Query("id")
		id, err := strconv.Atoi(idStr)
		if err != nil {
			c.JSON(400, gin.H{"error": "Invalid ID"})
			return
		}
		tp, err := database.GetTreningsprogram(db, id)
		if err != nil {
			c.JSON(404, gin.H{"error": "Not found"})
			return
		}
		c.JSON(200, tp)
	}
}

// KundeProgram
func CreateKundeProgramHandler(db *sql.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		var kp models.KundeProgram
		if err := c.BindJSON(&kp); err != nil {
			c.JSON(400, gin.H{"error": "Invalid input"})
			return
		}
		id, err := database.CreateKundeProgram(db, kp)
		if err != nil {
			c.JSON(500, gin.H{"error": "Database error"})
			return
		}
		c.JSON(201, gin.H{"id": id})
	}
}

func GetKundeProgramHandler(db *sql.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		idStr := c.Query("id")
		id, err := strconv.Atoi(idStr)
		if err != nil {
			c.JSON(400, gin.H{"error": "Invalid ID"})
			return
		}
		kp, err := database.GetKundeProgram(db, id)
		if err != nil {
			c.JSON(404, gin.H{"error": "Not found"})
			return
		}
		c.JSON(200, kp)
	}
}

// Treningstime
func CreateTreningstimeHandler(db *sql.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		var tt models.Treningstime
		if err := c.BindJSON(&tt); err != nil {
			c.JSON(400, gin.H{"error": "Invalid input"})
			return
		}
		id, err := database.CreateTreningstime(db, tt)
		if err != nil {
			c.JSON(500, gin.H{"error": "Database error"})
			return
		}
		c.JSON(201, gin.H{"id": id})
	}
}

func GetTreningstimeHandler(db *sql.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		idStr := c.Query("id")
		id, err := strconv.Atoi(idStr)
		if err != nil {
			c.JSON(400, gin.H{"error": "Invalid ID"})
			return
		}
		tt, err := database.GetTreningstime(db, id)
		if err != nil {
			c.JSON(404, gin.H{"error": "Not found"})
			return
		}
		c.JSON(200, tt)
	}
}

// Ansatt
func CreateAnsattHandler(db *sql.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		var a models.Ansatt
		if err := c.BindJSON(&a); err != nil {
			c.JSON(400, gin.H{"error": "Invalid input"})
			return
		}
		id, err := database.CreateAnsatt(db, a)
		if err != nil {
			c.JSON(500, gin.H{"error": "Database error"})
			return
		}
		c.JSON(201, gin.H{"id": id})
	}
}

func GetAnsattHandler(db *sql.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		idStr := c.Query("id")
		id, err := strconv.Atoi(idStr)
		if err != nil {
			c.JSON(400, gin.H{"error": "Invalid ID"})
			return
		}
		a, err := database.GetAnsatt(db, id)
		if err != nil {
			c.JSON(404, gin.H{"error": "Not found"})
			return
		}
		c.JSON(200, a)
	}
}

// Kundefeedback
func CreateKundefeedbackHandler(db *sql.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		var kf models.Kundefeedback
		if err := c.BindJSON(&kf); err != nil {
			c.JSON(400, gin.H{"error": "Invalid input"})
			return
		}
		id, err := database.CreateKundefeedback(db, kf)
		if err != nil {
			c.JSON(500, gin.H{"error": "Database error"})
			return
		}
		c.JSON(201, gin.H{"id": id})
	}
}

func GetKundefeedbackHandler(db *sql.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		idStr := c.Query("id")
		id, err := strconv.Atoi(idStr)
		if err != nil {
			c.JSON(400, gin.H{"error": "Invalid ID"})
			return
		}
		kf, err := database.GetKundefeedback(db, id)
		if err != nil {
			c.JSON(404, gin.H{"error": "Not found"})
			return
		}
		c.JSON(200, kf)
	}
}
