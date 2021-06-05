import { HOST } from "./variablesGlobales";
import { getTokenApi } from "./autentificacion";

// EXISTE UNA RELACION
export function realizarPublicacionApi(mensaje) {
  //Ponemos el endPoint al que consultaremos los datos
  const url = `${HOST}/publicacion`;
  const data = {
    mensaje,
  };
  // Parametros
  const params = {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${getTokenApi()}`,
    },
    body: JSON.stringify(data),
  };

  // Hacemos la peticionç

  return fetch(url, params)
    .then((response) => {
      // si devuelve 200, 201, etc..
      if (response.status >= 200 && response.status < 300) {
        return { code: response.status, message: "Publicacion Enviada" };
      }
      return { code: 500, message: "Error al enviar" };
    })
    .catch((err) => {
      return err;
    });
}

// EXISTE UNA RELACION
export function obtenerPublicacionNegocioApi(idNegocio, pagina) {
  //Ponemos el endPoint al que consultaremos los datos
  const url = `${HOST}/leoPublicacion?id=${idNegocio}&pagina=${pagina}`;
  // Parametros
  const params = {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${getTokenApi()}`,
    },
  };

  // Hacemos la peticionç

  return fetch(url, params)
    .then((response) => {
      // console.log("Api: " + response.json());
      return response.json();
    })
    .catch((err) => {
      return err;
    });
}


