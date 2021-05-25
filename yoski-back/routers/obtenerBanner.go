package routers

import (
	"io"
	"net/http"
	"os"

	"github.com/yaseerhee/YOSKI/bd"
)

func ObtenerBanner(w http.ResponseWriter, r *http.Request) {
	// Obtenemos el id del negocio
	ID := r.URL.Query().Get("id")
	// Miramos que el id es mayor a 0
	if len(ID) < 1 {
		http.Error(w, "Debe enviar un id en la peticion", http.StatusBadRequest)
		return
	}
	//BUSCAMOS EL PERFIL AL QUE QUEREMOS RECIBIR SU AVATAR
	perfil, err := bd.BuscoPerfil(ID)

	if err != nil {
		http.Error(w, "Negocio no encontrado", http.StatusBadRequest)
		return
	}

	// abrimos la img en la ruta
	arch, err := os.Open("uploads/banners/" + perfil.Banner)
	if err != nil {
		http.Error(w, "Imagen no encontrado", http.StatusBadRequest)
		return
	}

	//copiamos la img
	_, err = io.Copy(w, arch)
	if err != nil {
		http.Error(w, "Fallo al copiar la img", http.StatusBadRequest)
		return
	}

}
