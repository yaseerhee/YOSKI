package routers

import (
	"encoding/json"
	"net/http"

	"github.com/yaseerhee/YOSKI/yoskiBack/bd"
	"github.com/yaseerhee/YOSKI/yoskiBack/models"
)

// Modifciar Negocio modifca el perfil del negocio
func ModificarRegistro(w http.ResponseWriter, r *http.Request) {
	var t models.Negocio
	// Recibimos la respuesta
	err := json.NewDecoder(r.Body).Decode(&t)
	if err != nil {
		http.Error(w, "Datos Incorrectos "+err.Error(), 400)
		return
	}
	var estado bool
	estado, err = bd.ModificarPerfilNegocio(t, IDNegocio)
	if err != nil {
		http.Error(w, "Ocurrio un problema al modificar el perfil del negocio. Vuelva a intentarlo"+err.Error(), 400)
		return
	}

	if !estado {
		http.Error(w, "No se ha logrado modificar el registro del usuario", 400)
		return
	}

	w.WriteHeader(http.StatusCreated)

}
