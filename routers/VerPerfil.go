package routers

import (
	"encoding/json"
	"net/http"

	"github.com/yaseerhee/YOSKI/bd"
)

// VerPerfil permite coger los valores del Perfil
func VerPerfil(w http.ResponseWriter, r http.Request) {
	ID := r.URL.Query().Get("id") // rECOGEMOS EL ID DE LA PETICION
	if len(ID) < 1 {
		// SI ES MENOR A UNO NO ENCONTRO LA VARIABLE
		http.Error(w, "Debe enviar el parametro ID", http.StatusBadRequest)
		return
	}

	// Le pasamos el Id a nuestra funcion BuscoPerfil
	perfil, err := bd.BuscoPerfil(ID)
	if err != nil {
		http.Error(w, "Ocurrió un error al intentar buscar el registro"+err.Error(), 400)
		return
	}
	//En caso de que tengamos respuesta seteamos el header y enviamos en formato json el perfil
	w.Header().Set("Context-Type", "application/json")
	w.WriteHeader(http.StatusCreated) // status 201
	json.NewEncoder(w).Encode(perfil)

}
