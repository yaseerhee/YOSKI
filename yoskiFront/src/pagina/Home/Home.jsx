import React, {useState, useEffect} from 'react';
// Contenido de toda web
import Contenido from '../../componentes/Contenido/Contenido';
import ListPublicaciones from '../../componentes/ListarPublicaciones/ListarPublicaciones';
import {obtenerPublicacionSeguidoresApi} from '../../api/publicaciones';
import {Button, Spinner} from "react-bootstrap";
// estilos
import './Home.scss';


export default function Home(props) {
    // eslint-disable-next-line no-empty-pattern
    const {} = props;
    // obtenemos las publicaciones
    const [publicaciones, setPublicaciones] = useState(null);
    // Obtenemos la pagina y la guardamos
    const [pagina, setPagina] = useState(1);
    //cargamos = false
    const [loading, setloading] = useState(false);
    useEffect(() => {
        obtenerPublicacionSeguidoresApi(pagina).then(response => {
            // console.log(response);
            if(!publicaciones && response){
                setPublicaciones(formatModel(response));
            }else{
                if(response){
                    const data = formatModel(response);
                    setPublicaciones([...publicaciones, ...data]);
                    setloading(false);
                }else{
                    setloading(0);
                }
            }

        }).catch(() => {});
    }, [pagina]);

    // FUNCION VERMAS
    const masDatos = () =>{
        // cargamos en busqueda
        setloading(true);
        // cogemos pagina actual y le hacemos un mas 1
        setPagina(pagina+1);
    }

    return (
            <Contenido clasName="home">
                <div className="titulo-home">
                    <h2>Inicio</h2>
                    <hr />
                </div>
                {publicaciones && <ListPublicaciones publicaciones={publicaciones} />}
                <Button onClick={masDatos} className="mas-publicaciones" >
                    {!loading ? (
                        loading !== 0 ? "Ver más.." : "No tienes publicaciones..."
                    ):(
                        <Spinner as="span" animation="grow" size="sm" role="status" aria-hidden="true" />
                    )}    
                </Button>
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