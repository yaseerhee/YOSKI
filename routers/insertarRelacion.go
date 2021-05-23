package routers

import (
	"net/http"

	"github.com/yaseerhee/YOSKI/bd"
	"github.com/yaseerhee/YOSKI/models"
)

//CrearRelacion crea un registro entre negocio y relacion
func CrearRelacion(w http.ResponseWriter, r *http.Request) {
	// OBTENEMOS EL ID
	ID := r.URL.Query().Get("id")
	if len(ID) < 1 {
		http.Error(w, "El ID es obligatorio", http.StatusBadRequest)
		return
	}

	// le pasamos el objeto relacion con esos parametros que uno es el global y el otro lo cogempos de arrba al crearlo
	var t models.Relacion
	t.NegocioID = IDNegocio
	t.NegocioRelacionID = ID
	// llamamos a nuestar bd
	estado, err := bd.InsertarRelacion(t)
	if err != nil {
		http.Error(w, "Error en la creacion"+err.Error(), http.StatusBadRequest)
		return
	}
	if !estado {
		http.Error(w, "No se ha insertado por problemas en el estado"+err.Error(), http.StatusBadRequest)
		return
	}

	w.WriteHeader(http.StatusCreated)

}
