import React, { useState, useEffect } from "react";
import AccesoUsuario from "./pagina/AccesoUsuario/AccesoUsuario";
// Funcion que llama al contenedor para que se muestre
import { ToastContainer } from "react-toastify";
// Imporamos el contexto
import { AuthContext } from "./componentes/Context/contexts";
import { sesionIniciadaApi } from "./api/autentificacion";

//iMPORTAMOS SISTEMA DE RUTAS
import Routing from "./routers/Routing";

function App() {
  const [negocio, setNegocio] = useState(null);
  const [negocioLoad, setNegocioLoad] = useState(false);
  //Comprueba la sesion apra enviar al estado que toca
  const [compSesion, setCompSesion] = useState(false);
  useEffect(() => {
    //Le pasamos como parametro la info del negoco que esta logeado y que tiene sus datos en el localstroage
    setNegocio(sesionIniciadaApi());
    //console.log(sesionIniciadaApi());
    // Para que se vuelva a ejecutar
    setCompSesion(false);
    //Para que cuando se actuialice muestre lo que toque
    setNegocioLoad(true);
    // Sise actualiza vuelve a ejecutar [compSesion]
    // Con esto accedemos a nuestro HOME DE LA APP
  }, [compSesion]);

  // Para que se actualice
  if (!negocioLoad) {
    return null;
  }

  return (
    <AuthContext.Provider value={negocio}>
      {negocio ? (
        <Routing />
      ) : (
        <div>
          <AccesoUsuario setCompSesion={setCompSesion} />
        </div>
      )}
      {/* info-demo: https://fkhadra.github.io/react-toastify/introduction */}
      <ToastContainer
        position="top-right"
        autoClose={5000} //Para que se cierre cada 5 seg que se muestre
        hideProgressBar // Para que la bara se oculñte
        newestOnTop={false} //
        closeOnClick // Para que cuando se haga click se cierre
        rtl={false}
        pauseOnVisibilityChange
        draggable
        pauseOnHover
      />
    </AuthContext.Provider>
  );
}

export default App;
