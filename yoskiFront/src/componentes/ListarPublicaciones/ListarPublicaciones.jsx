import React, {useState, useEffect} from 'react';
import {Image} from "react-bootstrap";
import {map} from"lodash";

import "./ListarPublicaciones.scss";

export default function ListarPublicaciones(props) {
    const {publicaciones} = props;
    return (
        <div className="list-publicaciones">
            {/* Vamos a hacer un bucle que nos devuelva cada publicacion de nuestra lista */}
           {map(publicaciones,  (publicacion, index) => (

               <Publicacion key={index} publicacion={publicacion}/>
               )
            // <h2>Hola</h2>
            )}
        </div>
    )
}


function Publicacion(props){
    const {publicacion } = props;
    console.log(props);
    return <h2>{publicacion.mensaje}</h2>
}