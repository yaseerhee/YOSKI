import React from 'react';
import Avatar from "../../../img/perfil-by-default.png";
import {HOST} from "../../../api/variablesGlobales";
import "./BannerAvatar.scss";
import {Button} from "react-bootstrap";


export default function BannerAvatar(props) {
    const {negocio, negocioActual} = props;
    // Si negocio tiene contenido me devuelves el banner /ENDPOINT si no no me devuelves nada
    const bannerUrl = negocio?.banner ? `${HOST}/obtenerBanner?id=${negocio.id}` : null;
    const avatarUrl = negocio?.avatar ? `${HOST}/obtenerAvatar?id=${negocio.id}` : Avatar;
    console.log(negocioActual);
    return (
        <div className="banner-avatar" style={{backgroundImage: `url('${bannerUrl}')`}}>
           <div className="avatar" style={{backgroundImage: `url('${avatarUrl}')`}}></div>
            {/* Si el negocio existe permite editar sitiene el mismo id */}
            {negocio && (
            <div className="editar">
                {/* Comprobamos que es el usuario el que edita su prpia info */}
                {/* Si me encuentro en mi perfil si puedo ver el boton en caso contrario no */}
                {negocioActual._id === negocio.id && <Button>Editar</Button>}  
                {/* //Comprobar que el negocio que estoy viendo no es el mío y si es así mostramos el boton de Seguir */}
                {negocioActual._id !== negocio.id && (<Button> Seguir</Button>)}
                </div>
                )}   
        </div>
    )
}
