package routers

import (
	"encoding/json"
	"net/http"
	"strconv"

	"github.com/yaseerhee/YOSKI/bd"
)

// Lista de negocios sirve para ver los negocios
func ListaNegocios(w http.ResponseWriter, r *http.Request) {
	// Capturamos los parametros a buscar
	tipoNegocio := r.URL.Query().Get("tipo")
	pagina := r.URL.Query().Get("pagina")
	buscador := r.URL.Query().Get("buscador")

	// PASAMOS LA INFO A ENTERO DE 64
	pagtemp, err := strconv.Atoi(pagina)
	if err != nil {
		http.Error(w, "Debe poner una pagina mayor a 0", http.StatusBadRequest)
		return
	}
	// tRANSFORMAMOS LA PAGINA A INT
	paginacion := int64(pagtemp)
	// Ejecutamos nuestra consulta
	resultado, estado := bd.ObtengoTodosNegocios(IDNegocio, paginacion, buscador, tipoNegocio)

	if !estado {
		http.Error(w, "Fallo al obtener negocios", http.StatusBadRequest)
		return
	}
	// todo ok
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(resultado)

}
