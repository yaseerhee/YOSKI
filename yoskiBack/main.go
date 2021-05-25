package main

import (
	"log"

	"github.com/yaseerhee/YOSKI/yoskiBack/bd"
	"github.com/yaseerhee/YOSKI/yoskiBack/handlers"
)

func main() {
	// Revisamos que hay conexion con la BD, si devuelve 1 abre la conexion sino devuelve error
	if bd.ObtenerConexion() == 0 {
		log.Fatal("Sin Conexion a la BD")
		return
	}
	// Abrimos el puerto 8080 y creamos un servidor para nuestra app
	handlers.Controladores()
}
