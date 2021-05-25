package bd

import (
	"context"
	"time"

	"github.com/yaseerhee/YOSKI/yoski-back/models"
)

// BorrarRelacion dejar de seguir un usuario a otro
func BorrarRelacion(t models.Relacion) (bool, error) {
	// Creamos un contexto. Traemos el contexto en Background de la bd, le agregamos un parametro que es el tiempo del TimeOut (15 seg)
	contexto, cancel := context.WithTimeout(context.Background(), 15*time.Second)
	// Defer Es una instruccion que la puedes poner donde quieras que se va a ejecutar como ultima instancia
	defer cancel()

	// Nos conectamos a la BD
	db := MongoC.Database("yoski")
	//cOGEMOS LA COLECCION NEGOCIO
	col := db.Collection("relacion")

	//eJECUTAMOS LA ELIMINACION DE LA RELACION
	_, err := col.DeleteOne(contexto, t)
	if err != nil {
		return false, err
	}
	// todo ok
	return true, nil

}
