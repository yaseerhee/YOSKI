import React, { useState } from "react";
import AccesoUsuario from "./pagina/AccesoUsuario/AccesoUsuario";

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
    </div>
  );
}

export default App;
