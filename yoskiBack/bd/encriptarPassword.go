package bd

import (
	"golang.org/x/crypto/bcrypt"
)

func EncriptarPassword(pass string) (string, error) {
	// El costo algoritmo (el numero es al que se eleva el 2) se encripta el numero veces igual al costo
	costo := 8
	// Esta funcion sirve para encriptar nuestra password con una 
	bytes, err := bcrypt.GenerateFromPassword([]byte(pass), costo)
	return string(bytes), err

}
