package main

import (
	"log"

	"github.com/yaseerhee/YOSKI/bd"
	"github.com/yaseerhee/YOSKI/handlers"
)

func main() {
	// Revisamos que hay conexion con la BD
	if bd.ObtenerConexion() == 0 {
		log.Fatal("Sin Conxion a la BD")
		return
	}

	handlers.Controladores()
}
