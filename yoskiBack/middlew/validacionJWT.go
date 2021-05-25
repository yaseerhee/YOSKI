package middlew

import (
	"net/http"

	"github.com/yaseerhee/YOSKI/yoskiBack/routers"
)

// ValidacionJWT sirve para validar el token que nois viene en lqa peticion
func ValidacionJWT(next http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		_, _, _, err := routers.ProcesoToken(r.Header.Get("Authorization")) // variable del Header que nos envia el token
		if err != nil {
			http.Error(w, "Error en el token JWT"+err.Error(), http.StatusBadRequest)
			return
		}
		next.ServeHTTP(w, r)

	}
}
