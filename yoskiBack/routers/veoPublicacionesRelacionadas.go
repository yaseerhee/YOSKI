package routers

import (
	"encoding/json"
	"net/http"
	"strconv"

	"github.com/yaseerhee/YOSKI/yoskiBack/bd"
)

// veo publicaciones de todos los seguidores
func VeoPublicacionesRelacionadas(w http.ResponseWriter, r *http.Request) {
	p := r.URL.Query().Get("pagina")
	// revisamos que se pone un valor
	if len(p) < 1 {
		http.Error(w, "Debe pasar el numero de la pagina", http.StatusBadRequest)
		return
	}
	// transformamos el entero a string
	pagina, err := strconv.Atoi(p)
	if err != nil {
		http.Error(w, "Debe ser un número mayor que cero", http.StatusBadRequest)
		return
	}
	// ejecutammos la funcion que visualiza las publicaciones
	respuesta, correcto := bd.VeoPublicacionesSeguidores(IDNegocio, pagina)
	if !correcto {
		http.Error(w, "No podemos visualizar las publicaciones", http.StatusBadRequest)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(respuesta)

}
