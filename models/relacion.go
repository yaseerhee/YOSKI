package models

type Relacion struct {
	NegocioID         string `bson:"negocioId" json:"negocioId"`
	NegocioRelacionID string `bson:"negociorelacionId" json:"negociorelacionId"`
}
