package routers

import (
	"encoding/json"
	"net/http"

	"github.com/yaseerhee/YOSKI/bd"
	"github.com/yaseerhee/YOSKI/models"
)

// comprobamo si hay una relacion entre dosnegocios
func ComprobarRelacionNegocios(w http.ResponseWriter, r *http.Request) {
	ID := r.URL.Query().Get("id")

	// le pasamos el objeto relacion
	var t models.Relacion
	t.NegocioID = IDNegocio
	t.NegocioRelacionID = ID
	// obtenemos el objeto
	var resp models.ComprobarRelacion
	// ejecutamos la comprobacion
	estado, err := bd.ComprobarRelacionNegocios(t)
	if err != nil || !estado {
		//No existe la relacion
		resp.Estado = false
	} else {
		// Si exuiste la relacion
		resp.Estado = true
	}
	// todo okey
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	//Enviamos la respuesta
	json.NewEncoder(w).Encode(resp)
}
