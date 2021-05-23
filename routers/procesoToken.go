package routers

import (
	"errors"
	"strings"

	jwt "github.com/dgrijalva/jwt-go"
	"github.com/yaseerhee/YOSKI/bd"
	"github.com/yaseerhee/YOSKI/models"
)

//Valor del email que usamos en los endPOints
var Email string

// id del negocio que usara en los endPoints
var IDNegocio string

// ProcesoToken para extraer los valores del TOKEN
func ProcesoToken(tk string) (*models.Claim, bool, string, error) {
	//Cogenos la clave del token que hemos creado
	miClave := []byte("YaserElEncriptador")
	claims := &models.Claim{}
	//Cividimos el token debido a que nos interesa la parte desde el bearer
	splitToken := strings.Split(tk, "Bearer")
	// Si nuestro vector es distinto de 2 ha habido un fallo
	if len(splitToken) != 2 {
		return claims, false, string(""), errors.New("formato de token invalido")
	}
	// tk almacena en formato string la posicion 1 de la variable donde hemos almacenado el token
	tk = strings.TrimSpace(splitToken[1])
	//Parseamos el token con una funcion de jwt
	tkn, err := jwt.ParseWithClaims(tk, claims, func(token *jwt.Token) (interface{}, error) {
		return miClave, nil
	})
	// una vez el token es valido tenemos que verificar que el negocio es valido
	if err == nil {
		_, encontrado, _ := bd.NegocioYaExiste(claims.Email)
		if encontrado == true {
			// token valido y negocxio existe
			Email = claims.Email
			IDNegocio = claims.ID.Hex() //cONEVRTIMOS id EN sTRING
		}
		return claims, encontrado, IDNegocio, nil
	}
	//Si token no es valido
	if !tkn.Valid {
		return claims, false, string(""), errors.New("TOKEN INVÁLIDO")
	}
	//TODO FUE BIEN
	return claims, false, string(""), err
}
