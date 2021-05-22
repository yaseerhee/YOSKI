package models

import (
	"time"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

// Negocio es el modelo de negocio de la base de MongoDB
type Negocio struct {
	ID					primitive.ObjectID	 	`bson:"_id,omitempty" json:"id"`
	Nombre				string					`bson:"nombre" json:"nombre,omitempty"`
	Industria			string					`bson:"industria" json:"industria,omitempty"`
	FechaCreación		time.Time				`bson:"fechaCreacion" json:"fechaCreacion,omitempty"`
	Email				string					`bson:"email" json:"email"`
	Password			string					`bson:"password" json:"password,omitempty"`
	Avatar				string					`bson:"avatar" json:"avatar,omitempty"`
	Banner				string					`bson:"banner" json:"banner,omitempty"`			
	Biografia			string					`bson:"biografia" json:"biografia,omitempty"`			
	Ubicacion			string					`bson:"ubicacion" json:"ubicacion,omitempty"`			
	SitioWeb			string					`bson:"sitioweb" json:"sitioweb,omitempty"`			
}