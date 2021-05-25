package routers

import (
	"net/http"

	"github.com/yaseerhee/YOSKI/bd"
	"github.com/yaseerhee/YOSKI/models"
)

func EliminarRelacion(w http.ResponseWriter, r *http.Request) {
	// OBTENEMOS EL ID
	ID := r.URL.Query().Get("id")
	// le pasamos el objeto relacion a elimiar
	var t models.Relacion
	t.NegocioID = IDNegocio
	t.NegocioRelacionID = ID

	// HACEMOS LA ELIMINACION
	estado, err := bd.BorrarRelacion(t)
	if err != nil {
		http.Error(w, "Error en la eliminacion"+err.Error(), http.StatusBadRequest)
		return
	}
	if !estado {
		http.Error(w, "No se ha eliminado por problemas en el estado"+err.Error(), http.StatusBadRequest)
		return
	}

	w.WriteHeader(http.StatusCreated)
}
