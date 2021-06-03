import Home from "../pagina/Home/Home";
import Error404 from "../pagina/Error404/Error404";
import Negocio from "../pagina/Negocio/Negocio";

// aSIGNAMOS UNA RUTA Y UN COMPONENTE A DICHA RUTA
export default [
  {
    path: "/:id",
    exact: true,
    page: Negocio,
  },
  {
    path: "/",
    exact: true,
    page: Home,
  },
  {
    path: "*",
    page: Error404,
  },
];
