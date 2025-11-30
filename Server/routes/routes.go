package routes

import (
	"Server/database"
	"Server/handlers"

	"github.com/gin-gonic/gin"
)

func RegisterRoutes(r *gin.Engine) {
	r.GET("/", func(c *gin.Context) {
		c.JSON(200, gin.H{"message": "Velkommen til APIet!"})
	})

	// Auth-ruter
	r.POST("/auth/login", handlers.LoginHandler(database.DB))
	r.POST("/register", handlers.Register)

	// Medlemskap
	r.POST("/medlemskap", handlers.CreateMedlemskapHandler(database.DB))
	r.GET("/medlemskap", handlers.GetMedlemskapHandler(database.DB))

	// Kunde
	r.POST("/kunde", handlers.CreateKundeHandler(database.DB))
	r.GET("/kunde", handlers.GetKundeHandler(database.DB))

	// Betaling
	r.POST("/betaling", handlers.CreateBetalingHandler(database.DB))
	r.GET("/betaling", handlers.GetBetalingHandler(database.DB))

	// Treningsprogram
	r.POST("/treningsprogram", handlers.CreateTreningsprogramHandler(database.DB))
	r.GET("/treningsprogram", handlers.GetTreningsprogramHandler(database.DB))

	// KundeProgram
	r.POST("/kundeprogram", handlers.CreateKundeProgramHandler(database.DB))
	r.GET("/kundeprogram", handlers.GetKundeProgramHandler(database.DB))

	// Treningstime
	r.POST("/treningstime", handlers.CreateTreningstimeHandler(database.DB))
	r.GET("/treningstime", handlers.GetTreningstimeHandler(database.DB))

	// Ansatt
	r.POST("/ansatt", handlers.CreateAnsattHandler(database.DB))
	r.GET("/ansatt", handlers.GetAnsattHandler(database.DB))

	// Kundefeedback
	r.POST("/kundefeedback", handlers.CreateKundefeedbackHandler(database.DB))
	r.GET("/kundefeedback", handlers.GetKundefeedbackHandler(database.DB))
}
