package bd

import (
	"context"
	"time"

	"github.com/yaseerhee/YOSKI/yoskiBack/models"
	"go.mongodb.org/mongo-driver/bson"
)

// NegocioYaExiste recibe un email de parametro y revisa si se encuentra en la BD
func NegocioYaExiste(email string) (models.Negocio, bool, string) {
	contexto, cancel := context.WithTimeout(context.Background(), 15*time.Second)
	defer cancel() // Para cuando termine la busqueda en la BD

	db := MongoC.Database("yoski")
	col := db.Collection("negocio")

	condicion := bson.M{"email": email}

	// bUSCAR EN LA VARIABLE RESULTADO UN SOLO REGISTRO CON ESE EMAIL. Si lo encuentra que me lo decodifique
	var resultado models.Negocio
	err := col.FindOne(contexto, condicion).Decode(&resultado)
	// Convertimos en extradecimal en formato String que es lo que queremos devolver en el tercer parametro de esta funcion
	ID := resultado.ID.Hex()
	// nOS DEVUELVE QUE NO EXISTE EL USUARIO
	if err != nil {
		return resultado, false, ID
	}
	// NOS DEVUELVE QUE SI EXISTE EL USUARIO
	return resultado, true, ID
}
