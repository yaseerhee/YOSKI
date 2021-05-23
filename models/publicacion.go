package models

// Publicacion obtiene el mensaje de nuestra publicacion
type Publicacion struct {
	Mensaje string `bson:"mensaje" json="mensaje"`
}
