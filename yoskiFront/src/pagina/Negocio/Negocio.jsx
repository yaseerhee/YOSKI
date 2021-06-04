import React, {useState, useEffect} from 'react';
import Contenido from "../../componentes/Contenido/Contenido";
// Sirve para sacar todos los datos de esa ruta
import {withRouter} from "react-router-dom";
import {getNegocioApi} from "../../api/negocio";
import negocioAuth from "../../hooks/negocioAuth";
import {toast} from "react-toastify";
import {Button, Spinner} from 'react-bootstrap';
import BannerAvatar from "../../componentes/Negocio/BannerAvatar/BannerAvatar";
import InfoNegocio from "../../componentes/Negocio/InfoNegocio/InfoNegocio";

import "./Negocio.scss";

function Negocio(props) {
    //console.log(props);
    const {match} = props;
    const [negocio, setnegocio] = useState(null);
    // obtenemos el negocio actual para que el pueda editar su info
    const negocioActual = negocioAuth();
    // console.log(negocioActual);
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
           <BannerAvatar negocio={negocio} negocioActual={negocioActual} />
           <InfoNegocio negocio={negocio} />
           <div className="negocio-publicaciones">Lista de publicaciones</div>
        </Contenido>
    )
}


export default withRouter(Negocio);