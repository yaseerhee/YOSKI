import { HOST } from "./variablesGlobales";
import { getTokenApi } from "./autentificacion";

export function getNegocioApi(id) {
  //Ponemos el endPoint al que consultaremos los datos
  const url = `${HOST}/verPerfil?id=${id}`;
  const params = {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${getTokenApi()}`,
    },
  };

  return fetch(url, params)
    .then((response) => {
      // si devuelve 400, 401, etc..
      if (response.status >= 400) throw null;
      return response.json();
    })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err;
    });
}
