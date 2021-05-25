package routers

import (
	"encoding/json"
	"net/http"
	"time"

	"github.com/yaseerhee/YOSKI/bd"
	"github.com/yaseerhee/YOSKI/models"
)

// GuardoPublicacion permite guardar la publicacion en la BD
func GuardoPublicacion(w http.ResponseWriter, r *http.Request) {
	// cOGEMOS EL OBJETO PUBLICACION
	var mensaje models.Publicacion
	// DECODIFICAMOS EL JSON
	err := json.NewDecoder(r.Body).Decode(&mensaje)
	if err != nil {
		http.Error(w, "Fallo en la Decodificacion "+err.Error(), 400)
		return
	}
	// sE LO PASAMOS A NUESTRO OBJETO GUARDAPUBLICACION
	registro := models.GuardoPublicacion{
		NegocioID: IDNegocio,
		Mensaje:   mensaje.Mensaje,
		Fecha:     time.Now(),
	}

	// LO CONVERTIMOS A UN BSON.M
	_, estado, err := bd.InsertoPublicacion(registro)
	// controlamos los errores
	if err != nil {
		http.Error(w, "Fallo en la insercion del registro "+err.Error(), 400)
		return
	}

	if !estado {
		http.Error(w, "No ha logrado insertar la publicacion", 400)
		return
	}

	// SI TODO VA BIEN
	w.WriteHeader(http.StatusCreated)

}
