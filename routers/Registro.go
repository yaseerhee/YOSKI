package routers

import (
	"encoding/json"
	"net/http"

	"github.com/yaseerhee/YOSKI/models"
	"github.com/yaseerhee/YOSKI/bd"
)

//Registro es la funcion para crear en la BD el registro de los negocios
func Registro(w http.ResponseWriter, r *http.Request) {
	//Creo modelo de negocio
	var t models.Negocio
	// Lugo le pido al Body que lo decodifique en ese modelo
	err := json.NewDecoder(r.Body).Decode(&t)

	if err != nil {
		http.Error(w, "Error en los datos recibidos " + err.Error(), 400 )
		return
	}

	// Si pudo decodificar lo que llego
	// Controlamos que este el email en el registro
	if len(t.Email) == 0{
		http.Error(w, "El Email de negocio es obligatorio", 400)
		return
	}
	// Nos aseguramos de que la password es mayor a 6
	if len(t.Password) < 6{
		http.Error(w, "La contraseña de la cuenta del negocio edebe tener mas de 6 caracteres", 400)
		return
	}
	// En Go cuando nos interesa procear solo uno de los valores, donde deben ir el resto de valores que no nos interesan ponemos guion bajo
	_,encontrado,_ := bd.NegocioYaExiste(t.Email)
	// Controlamos que el email no exista en la bd
	if encontrado == true {
		http.Error(w, "Ya existe un Negocio registrado con ese Email", 400)
		return
	}

	_,estado,err := bd.CrearNegocio()
	if err != nil{
		http.Error(w, "Ocurrió un error al intentar analizar el registro del negocio"+err.Error(), 400)
		return
	}

	if estado == false {
		http.Error(w, "No se ha conseguido la insercion del registro del negocio", 400)
		return
	}
	//Devolvemos el estado con writeHeader
	w.WriteHeader(http.StatusCreated)

}
