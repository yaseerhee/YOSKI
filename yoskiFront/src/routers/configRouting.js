import Home from "../pagina/Home/Home";
import Error404 from "../pagina/Error404/Error404";
import Negocio from "../pagina/Negocio/Negocio";
import Negocios from "../pagina/Negocios/Negocios";

// aSIGNAMOS UNA RUTA Y UN COMPONENTE A DICHA RUTA
export default [
  {
    path: "/negocios",
    exact: true,
    page: Negocios,
  },
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
