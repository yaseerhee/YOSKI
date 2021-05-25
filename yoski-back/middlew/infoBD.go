package middlew

import (
	"net/http"

	"github.com/yaseerhee/YOSKI/bd"
)

//InfoBD me permite conocer el estado de la BD
func InfoBD(next http.HandlerFunc) http.HandlerFunc {
	// Le pasamos como parametro la respuesta y la peticion
	return func(w http.ResponseWriter, r *http.Request) {
		//Si hubo un errro a la hora de conectar, devolvemos un error en la respuesta
		if bd.ObtenerConexion() == 0 {
			http.Error(w, "Conexión perdida con la Base de Datos", 500)
			// salimos de la cadena de llamada
			return
		}
		// sino ocurre esto
		next.ServeHTTP(w, r)
		// Le pasamos los objetos de Response y Request
	}
}
