package bd

import (
	"context"
	"time"

	"github.com/yaseerhee/YOSKI/yoskiBack/models"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

//ModificarPerfilNegocio permite modificar la info del negocio
func ModificarPerfilNegocio(n models.Negocio, ID string) (bool, error) {
	// Creamos un contexto. Traemos el contexto en Background de la bd, le agregamos un parametro que es el tiempo del TimeOut (15 seg)
	contexto, cancel := context.WithTimeout(context.Background(), 15*time.Second)
	// Defer Es una instruccion que la puedes poner donde quieras que se va a ejecutar como ultima instancia
	defer cancel()

	// Nos conectamos a la BD
	db := MongoC.Database("yoski")
	//cOGEMOS LA COLECCION NEGOCIO
	col := db.Collection("negocio")

	//Creamos un mapa que va a almacenar los cambvios que nos lleguen
	registro := make(map[string]interface{})
	if len(n.Nombre) > 0 {
		registro["nombre"] = n.Nombre
	}
	if len(n.Industria) > 0 {
		registro["industria"] = n.Industria
	}
	registro["fechaCreacion"] = n.FechaCreacion

	if len(n.Avatar) > 0 {
		registro["avatar"] = n.Avatar
	}

	if len(n.Banner) > 0 {
		registro["banner"] = n.Banner
	}

	if len(n.Biografia) > 0 {
		registro["biografia"] = n.Biografia
	}

	if len(n.Ubicacion) > 0 {
		registro["ubicacion"] = n.Ubicacion
	}

	if len(n.SitioWeb) > 0 {
		registro["sitioWeb"] = n.SitioWeb
	}

	// $SET NOS SIRVE PARA DECIRLE A MONGO QUE LO QUE VIENE A CONTINUACION ES PARA MODIFICAR LOS DATOS
	actCambios := bson.M{
		"$set": registro,
	}

	objID, _ := primitive.ObjectIDFromHex(ID) //cONVIERTE MI id EN UN FORMATO STRING
	//cONSULTA PARA OBTENER EL FILA DE MI TABLA CON ESE ID
	filtro := bson.M{
		"_id": bson.M{
			"$eq": objID,
		},
	}
	//Buscamos si se ha actualizado
	_, err := col.UpdateOne(contexto, filtro, actCambios)
	if err != nil {
		return false, err
	}
	return true, nil
}
