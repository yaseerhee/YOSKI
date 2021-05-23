package bd

import (
	"context"
	"fmt"
	"time"

	"github.com/yaseerhee/YOSKI/models"
	"go.mongodb.org/mongo-driver/bson"
)

// Revisamos la relacion que hay entre dos negocios (se siguen o se conocen)
func ComprobarRelacionNegocios(t models.Relacion) (bool, error) {
	// Creamos un contexto. Traemos el contexto en Background de la bd, le agregamos un parametro que es el tiempo del TimeOut (15 seg)
	contexto, cancel := context.WithTimeout(context.Background(), 15*time.Second)
	// Defer Es una instruccion que la puedes poner donde quieras que se va a ejecutar como ultima instancia
	defer cancel()

	// Nos conectamos a la BD
	db := MongoC.Database("yoski")
	//cOGEMOS LA COLECCION NEGOCIO
	col := db.Collection("relacion")
	// creamos la condicion 
	condicion := bson.M{
		"negocioId":         t.NegocioID,
		"negocioRelacionId": t.NegocioRelacionID,
	}
	// objeto relacion
	var resultado models.Relacion
	fmt.Println(resultado)
	// buscamos en nuestra coleccion
	err := col.FindOne(contexto, condicion).Decode(&resultado)
	// si hay error 
	if err != nil {
		fmt.Println(err.Error())
		return false, err
	}
	// todo bien
	return true, nil

}
