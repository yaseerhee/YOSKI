package bd

import (
	"context"
	"fmt"
	"time"

	"github.com/yaseerhee/YOSKI/yoskiBack/models"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo/options"
)

// obtiene todos los negocio. Si ponems una "seguidores" devuelve los que sigo o me siguen
func ObtengoTodosNegocios(ID string, pagina int64, buscador string, tipo string) ([]*models.Negocio, bool) {
	// Creamos un contexto. Traemos el contexto en Background de la bd, le agregamos un parametro que es el tiempo del TimeOut (15 seg)
	contexto, cancel := context.WithTimeout(context.Background(), 15*time.Second)
	// Defer Es una instruccion que la puedes poner donde quieras que se va a ejecutar como ultima instancia
	defer cancel()

	// Nos conectamos a la BD
	db := MongoC.Database("yoski")
	//cOGEMOS LA COLECCION NEGOCIO
	col := db.Collection("negocio")

	// el resultado lo devolvemos en formatpo modelo
	var resultados []*models.Negocio
	// usamos el find para pasar varias condiciones
	busca := options.Find()
	busca.SetSkip((pagina - 1) * 20)
	busca.SetLimit(20) // para paginarlo de 20 en 20
	// ?i : es para que coja mayusculas como minusculas
	consulta := bson.M{
		"nombre": bson.M{"$regex": `(?i)` + buscador},
	}
	// Buscamos en la coleccion un grupo de registros que cumpla la condicion
	tabla, err := col.Find(contexto, consulta, busca)
	if err != nil {
		fmt.Println("Fallo aca" + err.Error())
		return resultados, false
	}

	var encontrado bool
	var incluir bool
	// Recorremos la coleccion que cumple la condicion
	for tabla.Next(contexto) {
		var s models.Negocio
		//grabamos en cada posicion de la tabla y lo guardamos en modelo negocio para obtener su info
		err := tabla.Decode(&s)
		if err != nil {
			fmt.Println("Tira fallo" + err.Error())
			return resultados, false
		}

		// ---------------Hasta aqui ningun fallo ---
		var r models.Relacion
		r.NegocioID = ID
		r.NegocioRelacionID = s.ID.Hex() // dE CADA NEGOCIO EXTRAIGO EL ID
		// sirve para saber si tenemos que incluir el usuario por defecto no
		incluir = false
		// comprobamos si no lo encuentra lo añade
		encontrado, _ = ComprobarRelacionNegocios(r)
		if tipo == "new" {
			if !encontrado {
				incluir = true
			}
		}
		// solo quiero listado de los que sigo
		if tipo == "follow" {
			if encontrado {
				incluir = true
			}
		}
		// Para evitar seguirme a mi mismo
		if r.NegocioRelacionID == ID {
			incluir = false
		}

		if incluir {
			// Campos que no quiero que muestre los blanqueo
			s.Password = ""
			s.Biografia = ""
			s.SitioWeb = ""
			s.Ubicacion = ""
			s.Banner = ""
			s.Email = ""
			// Cogemos los datos y los añadimos anuestro resultadp
			resultados = append(resultados, &s)
		}
	}
	// comprobamos si hay error
	err = tabla.Err()
	if err != nil {
		fmt.Println(err.Error())
		return resultados, false
	}
	// si no hya error dejamos de añadir y devolvemos el resultado con true
	tabla.Close(contexto)
	return resultados, true
}
