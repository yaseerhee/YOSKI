package bd

import (
	"github.com/yaseerhee/YOSKI/models"
	"golang.org/x/crypto/bcrypt"
)

// IntentoInicioSesion comprueba la sesion en BD
func IntentoInicioSesion(email string, password string) (models.Negocio, bool) {
	// revisamos si existe el usuario
	neg, encontrado, _ := NegocioYaExiste(email)
	if !encontrado {
		return neg, false
	}
	passwordBytes := []byte(password)                               //password introducida por el usuario
	passwordBD := []byte(neg.Password)                              // password de la bd encriptad
	err := bcrypt.CompareHashAndPassword(passwordBD, passwordBytes) // funcion que comprueba si es la misma
	if err != nil {
		return neg, false
	}
	return neg, true
}
