package routers

import (
	"encoding/json"
	"net/http"
	"time"

	"github.com/yaseerhee/YOSKI/bd"
	"github.com/yaseerhee/YOSKI/jwt"
	"github.com/yaseerhee/YOSKI/models"
)

// inicioSesion sirve para que el negocio pueda acceder a su cuenta
func InicioSesion(w http.ResponseWriter, r *http.Request) {
	w.Header().Add("content-type", "application/json") // seteamos el Header y decimos que va  llegar en formato json

	var t models.Negocio

	err := json.NewDecoder(r.Body).Decode(&t) // Decodificamos el JSON

	//comprobamos que todo esta correcto
	if err != nil {
		http.Error(w, "Nombre de negocio y/o contraseña incorrectas"+err.Error(), 400)
		return
	}
	//comprobamos que el email es mayor que cero
	if len(t.Email) == 0 {
		http.Error(w, "El email del usuario es obligatorio ", 400)
		return
	}

	// llamamos al intento de inicio sesion
	registro, existe := bd.IntentoInicioSesion(t.Email, t.Password)
	if !existe {
		http.Error(w, "Nombre de negocio y/o contraseña incorrectas ", 400)
		return
	}

	// Si existe jwt(JSON WEB TOKEN)
	jwtKey, err := jwt.GeneroJWT(registro)
	if err != nil {
		http.Error(w, "Error al intentar generar el token que corresponde"+err.Error(), 400)
		return
	}

	resp := models.RespuestaInicioSesion{
		Token: jwtKey,
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated) // Va a devolver un status 200
	json.NewEncoder(w).Encode(resp)   // va a devolver un json con un token

	/*GRABAR COOKIES*/
	expirationTime := time.Now().Add(24 * time.Hour)
	http.SetCookie(w, &http.Cookie{
		Name:    "token",
		Value:   jwtKey,
		Expires: expirationTime,
	})

}
