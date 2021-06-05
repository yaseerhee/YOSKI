import React from 'react';
import {map, isEmpty} from "lodash";
import Negocio from "./Negocio";

import "./ListNegocios.scss";

export default function ListNegocios(props) {
    // Listado de negocios
    const {negocios} = props;
    // Controlamos por si no hay negocios
    if(isEmpty(negocios)){
        return <h2>No hay resultados</h2>
    }
    return (
        <ul className="list-negocios">
            {/* Bucle que nois devuelva todos los negocios */}
            {map(negocios, negocio => (
                <Negocio key={negocio.id} negocio={negocio}/>
            ))}
        </ul>
    )
}
