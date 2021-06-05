import React, {useState, useEffect} from 'react';
// Contenido de toda web
import Contenido from '../../componentes/Contenido/Contenido';
import ListPublicaciones from '../../componentes/ListarPublicaciones/ListarPublicaciones';
import {obtenerPublicacionSeguidoresApi} from '../../api/publicaciones';
import {} from "react-bootstrap";
// estilos
import './Home.scss';


export default function Home(props) {
    const {} = props;
    const [publicaciones, setPublicaciones] = useState(null);
    const [pagina, setPagina] = useState(1);
    useEffect(() => {
        obtenerPublicacionSeguidoresApi(pagina).then(response => {
            // console.log(response);
            setPublicaciones(formatModel(response));
        })
    }, [pagina]);
    return (
            <Contenido clasName="home">
                <div className="titulo-home">
                    <h2>Inicio</h2>
                    <hr />
                </div>
                {publicaciones && <ListPublicaciones />}
                <p>Cargar más opublicaciones</p>
            </Contenido>
    )
}


function formatModel (publicaciones){
    const publica = [];
    // const publicacion ={
    //     _id: "",
    //     negocioId: "",
    //     mensaje: "",
    //     fecha:"",
    // }
    // Bucle de todo lo que nos llega
    publicaciones.forEach(publicacion => {
        publica.push({
            _id: publicacion._id,
            negocioId: publicacion.negocioRelationId,
            mensaje: publicacion.Publicacion.mensaje,
            fecha:publicacion.Publicacion.fecha,
        })
    });

    return publica;
}