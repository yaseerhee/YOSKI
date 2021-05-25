package models

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

// eS EL MODELO DE DATOS QUE RECIBIMOS DE UN APUBLICACION
type DevuelvoPublicacionesSeguidores struct {
	ID                primitive.ObjectID `bson:"_id" json:"_id,omitempty"`
	NegocioID         string             `bson:"negocioid" json:"negocioId,omitempty"`
	NegocioRelacionID string             `bson:"negociorelacionId" json:"negocioRelationId,omitempty"`
	Publicacion       struct {
		Mensaje string    `bson:"mensaje" json:"mensaje,omitempty"`
		Fecha   time.Time `bson:"fecha" json:"fecha,omitempty"`
		ID      string    `bson:"_id" json:"_id,omitempty"`
	}
}
