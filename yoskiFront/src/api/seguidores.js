import { HOST } from "./variablesGlobales";
import { getTokenApi } from "./autentificacion";

// EXISTE UNA RELACION
export function existeRelacionApi(idNegocio) {
  //Ponemos el endPoint al que consultaremos los datos
  const url = `${HOST}/existeRelacion?id=${idNegocio}`;
  // Parametros
  const params = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${getTokenApi()}`,
    },
  };

  // Hacemos la peticionç

  return fetch(url, params)
    .then((response) => {
      // si devuelve 400, 401, etc..
      // if (response.status >= 400) throw null;
      return response.json();
    })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err;
    });
}

// sEGU9IR AL NEGOCIO
export function seguirNegocioApi(idNegocio) {
  //Ponemos el endPoint al que consultaremos los datos
  const url = `${HOST}/crearRelacion?id=${idNegocio}`;
  // Parametros
  const params = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${getTokenApi()}`,
    },
  };

  // Hacemos la peticionç

  return fetch(url, params)
    .then((response) => {
      // si devuelve 400, 401, etc..
      // if (response.status >= 400) throw null;
      return response.json();
    })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err;
    });
}

// DEJAR DE SEGUIR AL NEGOCIO
export function dejarSeguirNegocioApi(idNegocio) {
  //Ponemos el endPoint al que consultaremos los datos
  const url = `${HOST}/borrarRelacion?id=${idNegocio}`;
  // Parametros
  const params = {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${getTokenApi()}`,
    },
  };

  // Hacemos la peticionç
  return fetch(url, params)
    .then((response) => {
      // si devuelve 400, 401, etc..
      // if (response.status >= 400) throw null;
      return response.json();
    })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err;
    });
}
