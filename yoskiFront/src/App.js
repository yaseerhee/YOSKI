import React, { useState } from "react";
import AccesoUsuario from "./pagina/AccesoUsuario/AccesoUsuario";
// Funcion que llama al contenedor para que se muestre
import {ToastContainer} from 'react-toastify';

function App() {
  const [negocio, setNegocio] = useState({ nombre: "Yaser" });
  return (
    <div>
      {negocio ? (
        <div>
          <AccesoUsuario />
        </div>
      ) : (
        <h1>Sesion no iniciada</h1>
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
    </div>
  );
}

export default App;
