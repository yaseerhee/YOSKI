package handlers

import (
	"log"
	"net/http"
	"os"

	"github.com/gorilla/mux"
	"github.com/rs/cors"
)

// Controladores sirve para crear mi puerto, el controlador y pongo a escuchar al servidor en el 8080
func Controladores() {
	router := mux.NewRouter()

	



	//Miramos si tenemos un puerto
	PORT := os.Getenv("PORT")
	// Si no hay un puerto, vamos a forzar a que salga por el puerot 8080
	if PORT == "" {
		PORT = "8080"
	}
	// Con Cors estamos permitiendo a todo el mundo el acceso desde cualquier lugar
	handler := cors.AllowAll().Handler(router)
	log.Fatal(http.ListenAndServe(":"+PORT, handler))
	// Esto lo que hace es que a la URL que yo ingrese le añade el puerto 8080
	// A partir de este momento cors pasa a tener el control de la web

}
