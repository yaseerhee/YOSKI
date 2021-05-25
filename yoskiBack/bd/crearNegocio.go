package bd

import (
	"context"
	"time"

	"github.com/yaseerhee/YOSKI/yoskiBack/models"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

//CrearNegocio se encarga de crear el usuario del negocio en la BD con los datos de ese negocio
func CrearNegocio(n models.Negocio) (string, bool, error) {
	// Creamos un contexto. Traemos el contexto en Background de la bd, le agregamos un parametro que es el tiempo del TimeOut (15 seg)
	contexto, cancel := context.WithTimeout(context.Background(), 15*time.Second)
	// Defer Es una instruccion que la puedes poner donde quieras que se va a ejecutar como ultima instancia
	defer cancel()

	// Nos conectamos a la BD
	db := MongoC.Database("yoski")
	//cOGEMOS LA COLECCION NEGOCIO
	col := db.Collection("negocio")
	// Encriptamos la contraseña que nos llega
	n.Password, _ = EncriptarPassword(n.Password)
	// Insertamos a la bd el registro con el nuevo negocio
	result, err := col.InsertOne(contexto, n)
	if err != nil {
		// En caso de error devolvemos vacío que es el ID
		return "", false, err
	}

	//FORMA DE OBTENER  EL ID QUE SE ACABA DE INSERTAR
	ObjID, _ := result.InsertedID.(primitive.ObjectID)
	return ObjID.String(), true, nil // nil porque no hubo error

}
