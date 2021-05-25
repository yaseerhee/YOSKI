package bd

import (
	"context"
	"time"

	"github.com/yaseerhee/YOSKI/yoskiBack/models"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

// InsertoPublicacion guarda la publicacion en la bd
func InsertoPublicacion(t models.GuardoPublicacion) (string, bool, error) {
	// Creamos un contexto. Traemos el contexto en Background de la bd, le agregamos un parametro que es el tiempo del TimeOut (15 seg)
	contexto, cancel := context.WithTimeout(context.Background(), 15*time.Second)
	// Defer Es una instruccion que la puedes poner donde quieras que se va a ejecutar como ultima instancia
	defer cancel()

	// Nos conectamos a la BD
	db := MongoC.Database("yoski")
	//cOGEMOS LA COLECCION NEGOCIO
	col := db.Collection("publicacion")

	// objeto de negocio
	registro := bson.M{
		"negocioId": t.NegocioID,
		"mensaje":   t.Mensaje,
		"fecha":     t.Fecha,
	}

	// iNSERTAMOS LOS DATOS DE NUESTRA PUBLICACION
	resultado, err := col.InsertOne(contexto, registro)
	if err != nil {
		return string(""), false, err
	}
	// Obtenemos del json lña clave del ultimo registro insertado
	objID, _ := resultado.InsertedID.(primitive.ObjectID)

	return objID.String(), true, nil
}
