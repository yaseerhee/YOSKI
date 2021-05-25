package bd

import (
	"context"
	"fmt"
	"time"

	"github.com/yaseerhee/YOSKI/yoski-back/models"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

//BuscoPerfil es
func BuscoPerfil(ID string) (models.Negocio, error) {
	contexto, cancel := context.WithTimeout(context.Background(), time.Second*15)
	defer cancel()
	// Conexion BD TABLA
	db := MongoC.Database("yoski")
	col := db.Collection("negocio")

	var perfil models.Negocio
	objID, _ := primitive.ObjectIDFromHex(ID) //nOS DEVUELVE UN OBJETO id
	// Vamos a buscar POR UN PARAMETRO _ID QUE ESTA IGUALADO A NUESTRO OBJID
	condicion := bson.M{
		"_id": objID,
	}
	// COnsultamos a nuestra collection por el perfil con ese id
	err := col.FindOne(contexto, condicion).Decode(&perfil)
	perfil.Password = "" //Nos sirve para limpiar el valor internamente al tener un omitempty deolvera un vacio
	if err != nil {
		fmt.Println("Registro no encontrado" + err.Error())
		return perfil, err
	}
	// Todo fue bien nos devuelkve el perfil
	return perfil, nil
}
