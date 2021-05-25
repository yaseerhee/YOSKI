package handlers

import (
	"log"
	"net/http"
	"os"

	"github.com/gorilla/mux"
	"github.com/rs/cors"
	"github.com/yaseerhee/YOSKI/yoski-back/middlew"
	"github.com/yaseerhee/YOSKI/yoski-back/routers"
)

// Controladores sirve para crear mi puerto, el controlador y pongo a escuchar al servidor en el 8080
func Controladores() {
	router := mux.NewRouter()
	// endPoints Negocio
	router.HandleFunc("/registro", middlew.InfoBD(routers.Registro)).Methods("POST")
	router.HandleFunc("/inicioSesion", middlew.InfoBD(routers.InicioSesion)).Methods("POST")
	router.HandleFunc("/verPerfil", middlew.InfoBD(middlew.ValidacionJWT(routers.VerPerfil))).Methods("GET")
	router.HandleFunc("/modificarPerfilNegocio", middlew.InfoBD(middlew.ValidacionJWT(routers.ModificarRegistro))).Methods("PUT")
	// endPoints Publicacion
	router.HandleFunc("/publicacion", middlew.InfoBD(middlew.ValidacionJWT(routers.GuardoPublicacion))).Methods("POST")
	router.HandleFunc("/leoPublicacion", middlew.InfoBD(middlew.ValidacionJWT(routers.LeoPublicaciones))).Methods("GET")
	router.HandleFunc("/eliminarPublicacion", middlew.InfoBD(middlew.ValidacionJWT(routers.EliminarPublicacion))).Methods("DELETE")
	// endPoints imagenes
	router.HandleFunc("/subirAvatar", middlew.InfoBD(middlew.ValidacionJWT(routers.SubirAvatar))).Methods("POST")
	router.HandleFunc("/subirBanner", middlew.InfoBD(middlew.ValidacionJWT(routers.SubirBanner))).Methods("POST")
	router.HandleFunc("/obtenerAvatar", middlew.InfoBD(routers.ObtenerAvatar)).Methods("GET")
	router.HandleFunc("/obtenerBanner", middlew.InfoBD(routers.ObtenerBanner)).Methods("GET")
	// endPoint visualiza
	router.HandleFunc("/obtenerNegocios", middlew.InfoBD(middlew.ValidacionJWT(routers.ListaNegocios))).Methods("GET")
	router.HandleFunc("/leoPublicacionesSeguidores", middlew.InfoBD(middlew.ValidacionJWT(routers.VeoPublicacionesRelacionadas))).Methods("GET")

	//endPoints Relacion
	router.HandleFunc("/crearRelacion", middlew.InfoBD(middlew.ValidacionJWT(routers.CrearRelacion))).Methods("POST")
	router.HandleFunc("/borrarRelacion", middlew.InfoBD(middlew.ValidacionJWT(routers.EliminarRelacion))).Methods("DELETE")
	router.HandleFunc("/existeRelacion", middlew.InfoBD(middlew.ValidacionJWT(routers.ComprobarRelacionNegocios))).Methods("GET")

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
