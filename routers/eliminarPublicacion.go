package routers

import (
	"net/http"
	"github.com/yaseerhee/YOSKI/bd"
)

func EliminarPublicacion(w http.ResponseWriter, r *http.Request){
	ID := r.URL.Query().Get("id")

	//Comprobamos que el ID ES mayor a uno
	if len(ID) < 1{
		http.Error(w, "Flata el parametro ID", http.StatusBadRequest)
		return
	}
	// Comprobamos si ha salido bien el borrado
	err := bd.BorroPublicacion(ID, IDNegocio)
	if err != nil{
		http.Error(w, "Ocurrio un error al intentar borrar la publicacion" + err.Error(), http.StatusBadRequest)
		return
	}
	// Ejecutamos la peticion si ha salido bien y devolvemos el json con el status 200
	w.Header().Set("Content-Type", "json/application")
	w.WriteHeader(http.StatusCreated)

}