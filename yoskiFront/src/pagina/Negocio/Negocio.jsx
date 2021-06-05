import React, {useState, useEffect} from 'react';
import Contenido from "../../componentes/Contenido/Contenido";
// Sirve para sacar todos los datos de esa ruta
import {withRouter} from "react-router-dom";
import {getNegocioApi} from "../../api/negocio";
import {obtenerPublicacionNegocioApi} from "../../api/publicaciones";
import negocioAuth from "../../hooks/negocioAuth";
import {toast} from "react-toastify";
import {Button, Spinner} from 'react-bootstrap';
import BannerAvatar from "../../componentes/Negocio/BannerAvatar/BannerAvatar";
import InfoNegocio from "../../componentes/Negocio/InfoNegocio/InfoNegocio";
import ListarPublicaciones from "../../componentes/ListarPublicaciones/ListarPublicaciones";
import "./Negocio.scss";

function Negocio(props) {
    //console.log(props);
    const {match} = props;
    const [negocio, setnegocio] = useState(null);
    // obtenemos el negocio actual para que el pueda editar su info
    const negocioActual = negocioAuth();
    // const {params} = match;
    useEffect(()=>{
        getNegocioApi(match.params.id).then(response=>{
            // obtenemos el negocio
            setnegocio(response);
            // console.log(negocio);
            // Para cuando no exista por friquear laurl
            if(!response){
                toast.error("El Negocio que buscas no existe");
            }
        }).catch(()=>{
            toast.error("El Negocio que buscas no existe");
        });
        // Se va a ejecutar cada vez que los params cambien
    },[match.params])
    // ------------------publicaciones
    const [publicaciones, setPublicaciones] = useState(null);
    console.log(publicaciones); //publicaciones
    useEffect(() => {
        // EJECUTAMOS LA FUNCION QUE NOS DEVUELVE TWEETS
       obtenerPublicacionNegocioApi(match.params.id, 1).then(response => {
            //PASAMOS RESPUESTA
           setPublicaciones(response);
           console.log(match.params.id);
       }).catch(() => {
        //    Caso de error publicaciones vacias
           setPublicaciones([]);
           console.log("Nada");
       });
    }, [match.params])

    //Para ver mas publicaciones
    const [paginacion, setpaginacion] = useState(1);
    const [loadingPublicacion, setloadingPublicacion] = useState(false);
    const masPublicaciones = () => {
        const paginaActual = paginacion+1;
        // Caragmos nueva pagina
        setloadingPublicacion(true);
        // pedimos a la peticion que nos envie la siguiente pagina
        obtenerPublicacionNegocioApi(match.params.id, paginaActual).then(response => {
            if(!response){
                // CASODE QUE NO HAY RESPUESTA DEVOLVEMOS LA PAGINA ACTUAL Y EL CERO QUITA EL BOTON
                setloadingPublicacion(0);
            }else{
                // mantenemos las publicaciones anterirores y traemos las nuevas
                setPublicaciones([...publicaciones, ...response]);
                // paginamos
                setpaginacion(paginaActual);
                // quitamos el loading ya que esta todo cargado
                setloadingPublicacion(false);
            }
        });
    }
    return (
        <Contenido className="negocio">
           <div className="negocio-titulo">
               <h2>{negocio ? `${negocio.nombre} ${negocio.industria}` : "Este negocio no existe"}</h2>
           </div>
           <BannerAvatar negocio={negocio} negocioActual={negocioActual} />
           <InfoNegocio negocio={negocio} />
           <div className="negocio-publicaciones">
               <h3>Publicaciones</h3>
               {/* Si el negocio tiene publicaciones las muestra y sino  */}
               {publicaciones && <ListarPublicaciones publicaciones={publicaciones} />}
               <Button onClick={masPublicaciones}>{!loadingPublicacion ? (loadingPublicacion !== 0 && 'Ver más...'): (
                   <Spinner as="span" animation="grow" size="sm" role="status" arian-hidden="true"/>
               )}</Button>
           </div>
        </Contenido>
    )
}


export default withRouter(Negocio);