package models

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type DevuelvoPublicacion struct {
	ID        primitive.ObjectID `bson:"_id" json:"_id,omitempty"`
	NegocioID string             `bson:"companyId" json:"negocioId,omitempty"`
	Mensaje   string             `bson:"mensaje" json:"mensaje,omitempty"`
	Fecha     time.Time          `bson:"fecha" json:"fecha,omitempty"`
}
