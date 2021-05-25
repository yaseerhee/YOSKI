package routers

import (
	"encoding/json"
	"net/http"
	"strconv"

	"github.com/yaseerhee/YOSKI/yoskiBack/bd"
)

func LeoPublicaciones(w http.ResponseWriter, r *http.Request) {
	// Obtenemos el id del negocio
	ID := r.URL.Query().Get("id")
	// Controlamos los errores:
	//id tiene que ser mayo 1
	if len(ID) < 1 {
		http.Error(w, "Debe enviar el parámetro id", http.StatusBadRequest)
		return
	}
	//pagina tiene que ser mayo 1
	if len(r.URL.Query().Get("pagina")) < 1 {
		http.Error(w, "Debe enviar el parámetro página", http.StatusBadRequest)
		return
	}
	// conversion de un string a un enteroi
	pagina, err := strconv.Atoi(r.URL.Query().Get("pagina"))
	if err != nil {
		http.Error(w, "Debe enviar el parámetro con un valor mayor a 0", http.StatusBadRequest)
		return
	}
	// Lo convertimos a un dato de tipo int
	pag := int64(pagina)
	// OBtenemos una repsuesta
	respuesta, correcto := bd.LeoPublicacion(ID, pag)
	// si no hemos leido nada
	if !correcto {
		http.Error(w, "Error al leer las publicaciones", http.StatusBadRequest)
		return
	}
	//Si nos llega la respuesta Obtenemos este JSON
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(respuesta)
}
