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

// subir banner
export function subirBannerApi(file) {
  //Ponemos el endPoint al que consultaremos los datos
  const url = `${HOST}/subirBanner`;
  // Creamos el objeto y le añadimos el archivo: Esto es para que nos coja bien el body de nuestra peticion
  const formData = new FormData();
  console.log(formData);
  formData.append("banner", file);
  // Parametros
  const params = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${getTokenApi()}`,
    },
    body: formData,
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

// Subir avatar
export function subirAvatarApi(file) {
  //Ponemos el endPoint al que consultaremos los datos
  const url = `${HOST}/subirAvatar`;
  // Creamos el objeto y le añadimos el archivo: Esto es para que nos coja bien el body de nuestra peticion
  const formData = new FormData();
  console.log(formData);
  formData.append("avatar", file);
  // Parametros
  const params = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${getTokenApi()}`,
    },
    body: formData,
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
