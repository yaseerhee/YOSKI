package bd

import (
	"context"
	"log"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

//MongoC Variabl global que vamos a usar en el resto de archivos para conectarlos
var MongoC = ConectarBD()
var clientOptions = options.Client().ApplyURI("mongodb+srv://yoski:Yhe2000!@yoski.bbxn4.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")

//ConectarBD ES LA FUNC QUE NOS PERMITE CONECTARNOS A LA BASE DE DATOS
func ConectarBD() *mongo.Client {
	client, err := mongo.Connect(context.TODO(), clientOptions)
	if err != nil {
		log.Fatal(err.Error())
		return client
	}
	err = client.Ping(context.TODO(), nil)
	if err != nil {
		log.Fatal(err.Error())
		return client
	}

	log.Println("Conexión exitosa")
	return client
}

// ObtenerConexion eSTA FUNCION NOS AYUDA A COMPROBAR QUE LA CONEXION ES CORRECTA
func ObtenerConexion() int {
	err := MongoC.Ping(context.TODO(), nil)
	if err != nil {
		return 0
	}
	return 1
}
