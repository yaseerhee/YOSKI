import React, {useState, useEffect} from 'react';
import Avatar from "../../../img/perfil-by-default.png";
import {HOST} from "../../../api/variablesGlobales";
import ConfigNegocio from "../../ConfigNegocio/ConfigNegocio";
import EditNegocioFrom from"../../EditNegocioForm/EditNegocio";
import {existeRelacionApi, seguirNegocioApi, dejarSeguirNegocioApi} from"../../../api/seguidores";
import {toast} from "react-toastify";
import "./BannerAvatar.scss";
import {Button} from "react-bootstrap";


export default function BannerAvatar(props) {
    const {negocio, negocioActual} = props;
    const [abrirModal, setAbrirModal] = useState(false);
    // Si negocio tiene contenido me devuelves el banner /ENDPOINT si no no me devuelves nada
    const bannerUrl = negocio?.banner ? `${HOST}/obtenerBanner?id=${negocio.id}` : null;
    const avatarUrl = negocio?.avatar ? `${HOST}/obtenerAvatar?id=${negocio.id}` : Avatar;
    console.log(negocioActual);
    // estado que nos dice si seguimos o no seguimos a otro usuario
    const [siguiendo, setSiguiendo] = useState(null);
    //Para que se muestre el estado de la relacion en tiempo real
    const [loading, setloading] = useState(false);

    useEffect(() => {
        // EN CASO DE QUE EXISTE EL UNEGOCIO EJECUTAME ESTO SINO NAFDA
      if(negocio){
        existeRelacionApi(negocio?.id).then(response => {
          console.log(response);
          if(response?.estado){
            setSiguiendo(true);
          }else
            setSiguiendo(false);
        });
    }
      setloading(false);
    //   Cada vez que cambie la pagina de negocio, Recgarga la funcion
    }, [negocio, loading]);

    // Seguir
    const seguirNegocio = () =>{
        seguirNegocioApi(negocio.id).then(()=>{
            toast.success("Ahora sigues a " + negocio.nombre);
            // PARA QU ECOMPRUEBE QUE SEGUIMOS AL NEGOCIO
            setloading(true);
        });
    }

    //Dejar de seguir
    const dejarSeguirNegocio = () =>{
        dejarSeguirNegocioApi(negocio.id).then(()=>{
            toast.success("Has dejado de seguir a " + negocio.nombre);
            // PARA QU ECOMPRUEBE QUE SEGUIMOS AL NEGOCIO
            setloading(true);
        });
    }
    return (
        <div className="banner-avatar" style={{backgroundImage: `url('${bannerUrl}')`}}>
           <div className="avatar" style={{backgroundImage: `url('${avatarUrl}')`}}></div>
            {/* Si el negocio existe permite editar sitiene el mismo id */}
            {negocio && (
            <div className="editar">
                {/* Comprobamos que es el usuario el que edita su prpia info */}
                {/* Si me encuentro en mi perfil si puedo ver el boton en caso contrario no */}
                {negocioActual._id === negocio.id && <Button onClick={() => setAbrirModal(true)}>Editar</Button>}  
                {/* //Comprobar que el negocio que estoy viendo no es el mío y si es así mostramos el boton de Seguir */}
                {negocioActual._id !== negocio.id && (
                    siguiendo !== null && (
                        (siguiendo ? <Button className="dejar" onClick={dejarSeguirNegocio}> Siguiendo</Button> : <Button onClick={seguirNegocio}>Seguir</Button>)
                    )
                    )}
            </div>
            )}   
                <ConfigNegocio show={abrirModal} setShow={setAbrirModal} title="Modificar Perfil">
                    {/* Modificar le negocio que estamos viendo */}
                    <EditNegocioFrom negocio={negocio} setAbrirModal={setAbrirModal}/>   
                </ConfigNegocio>
        </div>
    )
}
