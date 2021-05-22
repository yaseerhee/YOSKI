package jwt

import (
	"time"

	jwt "github.com/dgrijalva/jwt-go"
	"github.com/yaseerhee/YOSKI/models"
)

// GeneroJWT genera el encriptado con JWT
func GeneroJWT(t models.Negocio) (string, error) {
	miClave := []byte("trabajandoConJWT")
	// Area PAYLOAD
	payload := jwt.MapClaims{
		"email":         t.Email,
		"nombre":        t.Nombre,
		"industria":     t.Industria,
		"fechaCreacion": t.FechaCreacion,
		"biografia":     t.Biografia,
		"ubicacion":     t.Ubicacion,
		"sitioweb":      t.SitioWeb,
		"_id":           t.ID.Hex(),
		"exp":           time.Now().Add(time.Hour * 24).Unix(),
	}
	//Area Header // Elegimos el algoritmo que tien que tener en cuenta
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, payload)
	tokenStr, err := token.SignedString(miClave) //Firmamos el token

	if err != nil {
		return tokenStr, err
	}

	return tokenStr, nil
}
