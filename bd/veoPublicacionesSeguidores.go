package bd

import (
	"context"
	"time"

	"github.com/yaseerhee/YOSKI/models"
	"go.mongodb.org/mongo-driver/bson"
)

// Sirve para visualizar las publicaciones de mis seguiidores
func VeoPublicacionesSeguidores(ID string, pagina int) ([]models.DevuelvoPublicacionesSeguidores, bool) {
	// Creamos un contexto. Traemos el contexto en Background de la bd, le agregamos un parametro que es el tiempo del TimeOut (15 seg)
	contexto, cancel := context.WithTimeout(context.Background(), 15*time.Second)
	// Defer Es una instruccion que la puedes poner donde quieras que se va a ejecutar como ultima instancia
	defer cancel()
	// Nos conectamos a la BD
	db := MongoC.Database("yoski")
	//cOGEMOS LA COLECCION NEGOCIO
	col := db.Collection("relacion")
	// Obtenemos las primeras 20 páginas
	pasoPagina := (pagina - 1) * 20
	// Creamos las consultas
	consulta := make([]bson.M, 0)
	// Voy a usar un FrameWork de MongoDB aggregate.
	//El comando match se encarga de buscar la relacion del id con mi negocio
	consulta = append(consulta, bson.M{"$match": bson.M{"negocioId": ID}})
	// El comando lookup nos ayuda a conectar las colecciones
	consulta = append(consulta, bson.M{
		"$lookup": bson.M{
			"from":         "publicacion",
			"localField":   "negociorelacionId",
			"foreignField": "negocioid",
			"as":           "publica",
		},
	})
	// sirve para procesar bien los resultados (logica)
	consulta = append(consulta, bson.M{"$unwind": "$publicacion"})
	// sirve para ordenar los datos de forma descendente
	consulta = append(consulta, bson.M{"$sort": bson.M{"publicacion.fecha": -1}})
	// para que los recoja de 20 en 20
	consulta = append(consulta, bson.M{"$skip": pasoPagina})
	consulta = append(consulta, bson.M{"$limit": 20})
	// Esta funcion es de un framework de Mongo
	tabla, err := col.Aggregate(contexto, consulta)
	// Se crea la tabla, creamos un slice con nuestro modelo
	var resultado []models.DevuelvoPublicacionesSeguidores
	err = tabla.All(contexto, &resultado) // Decodifica todo en formato tabla
	if err != nil {
		return resultado, false
	}
	return resultado, true
}
