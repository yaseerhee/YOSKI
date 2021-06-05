package bd

import (
	"context"
	"fmt"
	"time"

	"github.com/yaseerhee/YOSKI/yoskiBack/models"
	"go.mongodb.org/mongo-driver/bson"
)

// Sirve para visualizar las publicaciones de mis seguiidores
func VeoPublicacionesSeguidores(ID string, pagina int) ([]models.DevuelvoPublicacionesSeguidores, bool) {
	// Creamos un contexto. Traemos el contexto en Background de la bd, le agregamos un parametro que es el tiempo del TimeOut (15 seg)
	ctx, cancel := context.WithTimeout(context.Background(), 15*time.Second)
	// Defer Es una instruccion que la puedes poner donde quieras que se va a ejecutar como ultima instancia
	defer cancel()
	// Nos conectamos a la BD
	db := MongoC.Database("yoski")
	//cOGEMOS LA COLECCION NEGOCIO
	col := db.Collection("relacion")
	// Obtenemos las primeras 20 páginas
	skip := (pagina - 1) * 20
	// Creamos las consultas
	condiciones := make([]bson.M, 0)
	// Voy a usar un FrameWork de MongoDB aggregate.
	//El comando match se encarga de buscar la relacion del id con mi negocio
	condiciones = append(condiciones, bson.M{"$match": bson.M{"negocioId": ID}})
	// El comando lookup nos ayuda a conectar las colecciones
	condiciones = append(condiciones, bson.M{
		"$lookup": bson.M{
			"from":         "publicacion",
			"localField":   "negociorelacionId",
			"foreignField": "negocioId",
			//"foreignField": "companyId",
			"as": "publicacion",
		}})
	// sirve para procesar bien los resultados (logica)
	condiciones = append(condiciones, bson.M{"$unwind": "$publicacion"})
	// sirve para ordenar los datos de forma descendente
	condiciones = append(condiciones, bson.M{"$sort": bson.M{"publicacion.fecha": -1}})
	// para que los recoja de 20 en 20
	condiciones = append(condiciones, bson.M{"$skip": skip})
	condiciones = append(condiciones, bson.M{"$limit": 20})
	// Esta funcion es de un framework de Mongo
	tabla, err := col.Aggregate(ctx, condiciones)
	var resultado []models.DevuelvoPublicacionesSeguidores
	if err != nil {
		fmt.Println("Test 1: Falla en la consulta" + err.Error())
		return resultado, false
	}
	// Se crea la tabla, creamos un slice con nuestro modelo
	err = tabla.All(ctx, &resultado) // Decodifica todo en formato tabla
	if err != nil {
		fmt.Println("Test 2: Falla en la consulta" + err.Error())
		return resultado, false
	}
	return resultado, true
}
