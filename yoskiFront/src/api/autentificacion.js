import { HOST, TOKEN } from "./variablesGlobales";

//IMPORTAMOS DECODIFICADOR DE JWT
import jwtDecode from "jwt-decode";

// Nos ayud a registrar nuestro negocio
export function registroApi(negocio) {
  // console.log(negocio);
  const url = `${HOST}/registro`;
  // Para guardar siempre el email en minusculas
  const negocioTemp = {
    ...negocio,
    email: negocio.email.toLowerCase(),
    fechaCreacion: new Date(),
  };
  // Eliminamos repPassword para evitar problemas con la bd
  delete negocioTemp.repPassword;
  //   Creamos la peticion a nuestra bd
  const params = {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(negocioTemp),
  };
  // Hacemos la peticion para registrar a nuestro negocio
  return fetch(url, params)
    .then((response) => {
      // si devuelve 200, 201, etc..
      if (response.status >= 200 && response.status < 300) {
        //devuelve el json de la respuesta
        return response.json();
      }
      //   sino error 404
      return { code: 404, message: "Email en uso" };
    })
    .then((result) => {
      //Decolvemos el resultado
      return result;
    })
    .catch((err) => {
      //   Capturamos error
      return err;
    });

  //   console.log(negocioTemp);
  //   console.log(url);
}

//Nos ayuda a iniciar sesion enviar los datos nuestro endPoint
export function inicioSesionApi(negocio) {
  const url = `${HOST}/inicioSesion`;

  //Obtenemos los datos que envía el usuario
  const datos = {
    ...negocio,
    email: negocio.email.toLowerCase(),
  };

  // Creamos la peticion
  const params = {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(datos),
  };

  // Hacemos la peticion
  // Hacemos la peticion para registrar a nuestro negocio
  return fetch(url, params)
    .then((response) => {
      // si devuelve 200, 201, etc.. TODO OK
      if (response.status >= 200 && response.status < 300) {
        //devuelve el json de la respuesta
        return response.json();
      }
      //   sino error 404
      return { message: "Usuario o contraseña incorrectos" };
    })
    .then((result) => {
      //Decolvemos el resultado
      return result;
    })
    .catch((err) => {
      //   Capturamos error
      return err;
    });
}

//Se encarga de almacenar nuestra sesion en el localstorgae
export function setTokenApi(token) {
  localStorage.setItem(TOKEN, token);
}

// sE ENCARGA DE OBTENER EL TOKKEN DE LOCALSTORAGE
export function getTokenApi() {
  return localStorage.getItem(TOKEN);
}

// se encarga de eliminar el token para salir del usuario
export function cerrarSesionApi() {
  localStorage.removeItem(TOKEN);
}

// Comprobar que el token no ha caducado
export function tokenCaducadoApi(token) {
  // obtenemos del json solo el exp para saber si ha caducado
  const { exp } = jwtDecode(token);
  const caducado = exp * 1000; //Transformamos a milisegundos par poder trabajar con Date
  const timeout = caducado - Date.now(); // Si sale num neg ha expirado sino true

  if (timeout < 0) {
    return true;
  }
  return false;
}

// Miramos si tiene una sesion iniciada
export function sesionIniciadaApi() {
  const token = getTokenApi();

  //Comprobamos que existe el token
  if (!token) {
    cerrarSesionApi();
    return null;
  }

  //Comprobamos que el token no ha caducado (si es true ha caducado)
  if (tokenCaducadoApi(token)) {
    cerrarSesionApi();
  }

  // devolvemos el decodificado
  return jwtDecode(token);
}
