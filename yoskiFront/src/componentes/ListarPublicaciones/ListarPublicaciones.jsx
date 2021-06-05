import React, {useState, useEffect} from 'react';
import {Image} from "react-bootstrap";
import {map} from"lodash";
import moment from "moment";

import {getNegocioApi} from "../../api/negocio";
import SinAvatar from "../../img/perfil-by-default.png";
import {HOST} from "../../api/variablesGlobales";


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
    // Guardamos en un estado la info del negocio
    const [negocioInfo, setnegocioInfo] = useState(null);
    // Guardamos la info del avatar
    const [avatarUrl, setavatarUrl] = useState(null);
    const {publicacion } = props;
    // console.log(avatarUrl);
    useEffect(() => {
       getNegocioApi(publicacion.negocioId).then((response) => {
           //console.log(response);
           setnegocioInfo(response);
           setavatarUrl(response?.avatar ? `${HOST}/obtenerAvatar?id=${response.id}` : SinAvatar);
       })
        // siempre que sea una publicacion distinta se ejecuta
    }, [publicacion])
    // Obtenemos cad apublicacion denuestra bd
    // mostramos la publicaciones para asegurarme
    // console.log(props);
    return (
        <div className="publicacion">
            <Image className="avatar" src={avatarUrl} roundedCircle />
            <div>
                <div className="name">
                    {negocioInfo?.nombre}
                    <span>{moment(publicacion.fecha).calendar()}</span>
                </div>
                <div>
                    {publicacion.mensaje}
                </div>
            </div>
        </div>
    )
}