package main

import (
	"log"

	"github.com/yaseerhee/YOSKI/bd"
	"github.com/yaseerhee/YOSKI/handlers"
)

func main() {
	// Revisamos que hay conexion con la BD, si devuelve 1 abre la conexion sino devuelve error
	if bd.ObtenerConexion() == 0 {
		log.Fatal("Sin Conxion a la BD")
		return
	}

	// Abrimos el puerto 8080 y creamos un servidor para nuestra app
	handlers.Controladores()
}
