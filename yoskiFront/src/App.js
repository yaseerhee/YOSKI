import React, { useState } from "react";

function App() {
  const [negocio, setNegocio] = useState(null);
  return (
    <div>
      {negocio ? <h1>Sesion iniciada</h1> : <h1>Sesion no iniciada</h1>}
    </div>
  );
}

export default App;
