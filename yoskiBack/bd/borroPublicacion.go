package bd

import (
	"context"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func BorroPublicacion(ID string, NegocioID string) error {
	// Creamos un contexto. Traemos el contexto en Background de la bd, le agregamos un parametro que es el tiempo del TimeOut (15 seg)
	contexto, cancel := context.WithTimeout(context.Background(), 15*time.Second)
	// Defer Es una instruccion que la puedes poner donde quieras que se va a ejecutar como ultima instancia
	defer cancel()

	// Nos conectamos a la BD
	db := MongoC.Database("yoski")
	//cOGEMOS LA COLECCION NEGOCIO
	col := db.Collection("publicacion")

	//Esto me convierte mi ID en un OBJid
	objID, _ := primitive.ObjectIDFromHex(ID)
	// OBTENEMOS ESA PUBLICACION
	condicion := bson.M{
		"_id":       objID,
		"negocioId": NegocioID,
	}
	// Eliminamos la publicacion
	_, err := col.DeleteOne(contexto, condicion)
	// err = nil (Devolvemos el no error = delete) o err != nil (Devolvemos el error)
	return err

}
