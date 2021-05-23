package models

import (
	"time"
)

type GuardoPublicacion struct {
	NegocioID string    `bson:"negocioId" json:"negocioId,omitempty"`
	Mensaje   string    `bson:"mensaje" json:"mensaje,omitempty"`
	Fecha     time.Time `bson:"fecha" json:"fecha,omitempty"`
}
