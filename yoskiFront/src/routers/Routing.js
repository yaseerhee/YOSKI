import React from "react";
// Importamos el modulo de ROUTAS DE REACT
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// importamos el loadas para recorrer la config que hemos hecho
import { map } from "lodash";
import configRouting from "./configRouting";

export default function Routing() {
  return (
    // Para envolver la app
    <Router>
      {/* Sirve para que nos encuentre una pagina y la muestre qpoirque sino nos muestra varias */}
      <Switch>
        {/* Hacemos un bucle para recorrer nuestro fichero de configuracio */}
        {map(configRouting, (route, i) => (
            // Sistema de ruta que devuelve HOME
          <Route key={i} path={route.path} exact={route.exact}>
            <route.page />
          </Route>
        ))}
      </Switch>
    </Router>
  );
}
