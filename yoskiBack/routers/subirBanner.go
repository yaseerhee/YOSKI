package routers

import (
	"io"
	"net/http"
	"os"
	"strings"

	"github.com/yaseerhee/YOSKI/yoskiBack/bd"
	"github.com/yaseerhee/YOSKI/yoskiBack/models"
)

// Añade el Banner a nuestrop perfil
func SubirBanner(w http.ResponseWriter, r *http.Request) {
	// cogemos el avatar
	file, handler, err := r.FormFile("banner")
	if err != nil {
		http.Error(w, "Error al coger la img"+err.Error(), http.StatusBadRequest)
		return
	}
	//Separamos el nombre de la extension
	var extension = strings.Split(handler.Filename, ".")[1]
	// pasamos la ruta donde queremos que almacene la imagen
	var archivo string = "uploads/banners/" + IDNegocio + "." + extension
	// ABRIMOS LA RUTA Y CREAMOS UN ARCHIVO CON LOS PERMISOS DE LECTURA ESCRITURA Y EJECUCION
	f, err := os.OpenFile(archivo, os.O_WRONLY|os.O_CREATE, 0666)
	if err != nil {
		http.Error(w, "Error al subir la imagen "+err.Error(), http.StatusBadRequest)
		return
	}
	// Coge el archivo y lo copia donde hemos creado el archivo
	_, err = io.Copy(f, file)
	if err != nil {
		http.Error(w, "Error al copiar la img"+err.Error(), http.StatusBadRequest)
		return
	}

	// Creamos la variable delobjeto
	var negocio models.Negocio
	var estado bool
	// le pasamos al banner el id del negocio y la extension
	negocio.Banner = IDNegocio + "." + extension

	estado, err = bd.ModificarPerfilNegocio(negocio, IDNegocio)
	if err != nil || !estado {
		http.Error(w, "Error al guardar el banner en la bd"+err.Error(), http.StatusBadRequest)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
}
