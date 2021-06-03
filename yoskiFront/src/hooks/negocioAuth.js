import { useContext } from "react";

//Vamos a extraer la info del contexto que alli tenemos el negocio logueado
import { AuthContext } from "../componentes/Context/contexts";

export default () => useContext(AuthContext);
