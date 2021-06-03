import Home from "../pagina/Home/Home";
import Error404 from "../pagina/Error404/Error404";

// aSIGNAMOS UNA RUTA Y UN COMPONENTE A DICHA RUTA
export default [
  {
    path: "/",
    exact: true,
    page: Home,
  },
  {
    path: "*",
    page: Error404,
  }
];
