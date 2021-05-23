package bd

import (
	"context"
	"time"

	"github.com/yaseerhee/YOSKI/models"
)

//InsertarRelacion guarda la relacion en la bd
func InsertarRelacion(t models.Relacion) (bool, error) {
	// Creamos un contexto. Traemos el contexto en Background de la bd, le agregamos un parametro que es el tiempo del TimeOut (15 seg)
	contexto, cancel := context.WithTimeout(context.Background(), 15*time.Second)
	// Defer Es una instruccion que la puedes poner donde quieras que se va a ejecutar como ultima instancia
	defer cancel()

	// Nos conectamos a la BD
	db := MongoC.Database("yoski")
	//cOGEMOS LA COLECCION NEGOCIO
	col := db.Collection("relacion")

	// Hacemos una insercion de la relacion
	_, err := col.InsertOne(contexto, t)
	// Comprobamos que no hay error
	if err != nil {
		return false, err
	}

	return true, nil

}
