import React, {useState, useEffect} from 'react';
import Contenido from "../../componentes/Contenido/Contenido";
// Sirve para sacar todos los datos de esa ruta
import {withRouter} from "react-router-dom";
import {Button, Spinner} from 'react-bootstrap';
import {getNegocioApi} from "../../api/negocio";
import {toast} from "react-toastify";

import "./Negocio.scss";

function Negocio(props) {
    //console.log(props);
    const {match} = props;
    const [negocio, setnegocio] = useState(null);
    useEffect(()=>{
        getNegocioApi(match.params.id).then(response=>{
            // obtenemos el negocio
            setnegocio(response);
            console.log(negocio)
            // Para cuando no exista por friquear laurl
            if(!response){
                toast.error("El Negocio que buscas no existe");
            }
        }).catch(()=>{
            toast.error("El Negocio que buscas no existe");
        });
        // Se va a ejecutar cada vez que los params cambien
    },[match.params])
    return (
        <Contenido className="negocio">
           <div className="negocio-titulo">
               <h2>{negocio ? `${negocio.nombre} ${negocio.industria}` : "Este negocio no existe"}</h2>
           </div>
           <div className="negocio-banner">
               Banner Negocio
           </div>
           <div className="negocio-info">
               Info Negocio
           </div>
           <div className="negocio-publicaciones">Lista de publicaciones</div>
        </Contenido>
    )
}


export default withRouter(Negocio);