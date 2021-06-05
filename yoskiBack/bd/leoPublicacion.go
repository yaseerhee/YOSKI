package bd

import (
	"context"
	"log"
	"time"

	"github.com/yaseerhee/YOSKI/yoskiBack/models"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo/options"
)

//LeoPublicacion sirve para mostrar las publicaciones de un perfil
func LeoPublicacion(ID string, pagina int64) ([]*models.DevuelvoPublicacion, bool) {
	// pagina int64 es para paginar en mongoDb
	// Creamos un contexto. Traemos el contexto en Background de la bd, le agregamos un parametro que es el tiempo del TimeOut (15 seg)
	contexto, cancel := context.WithTimeout(context.Background(), 15*time.Second)
	// Defer Es una instruccion que la puedes poner donde quieras que se va a ejecutar como ultima instancia
	defer cancel()

	// Nos conectamos a la BD
	db := MongoC.Database("yoski")
	//cOGEMOS LA COLECCION NEGOCIO
	col := db.Collection("publicacion")
	// almacenamos el resultado en este slice
	var resultado []*models.DevuelvoPublicacion
	// creamos la consulta
	condicion := bson.M{
		//"companyId": ID,
		"negocioId": ID,
	}
	// nos sirve para darle un comportamiento a nuestra consulta
	opciones := options.Find()
	opciones.SetLimit(20)                               // Me va a traer las publicaciones de 20 en 20
	opciones.SetSort(bson.D{{Key: "fecha", Value: -1}}) // Me los ordenara en fecha y en orden descendente (-1)
	opciones.SetSkip((pagina - 1) * 20)                 // cuando enviemos el primer pedido, llegara la pagina 1le restamos la 1 y la multiplicamos por 20 para los 20 primero, si enviamos la pagina 2 saltaremos a la 1

	tabla, err := col.Find(contexto, condicion, opciones)
	if err != nil {
		log.Fatal(err.Error())
		return resultado, false
	}
	// tabla es un objeto JSON
	for tabla.Next(context.TODO()) {
		var registro models.DevuelvoPublicacion
		err := tabla.Decode(&registro)
		if err != nil {
			return resultado, false
		}
		// Por cada iteracion va a ñadir un registro
		resultado = append(resultado, &registro)
	}

	return resultado, true

}
