import React, {useState, useEffect} from 'react';
import {Spinner, ButtonGroup, Button, Row, Col} from "react-bootstrap";
import {withRouter} from "react-router-dom";
import { isEmpty} from "lodash";
import queryString from "query-string";
import Contenido from "../../componentes/Contenido/Contenido";
import ListNegocios from "../../componentes/ListNegocios/ListNegocios";
import {mostrarNegociosApi} from  "../../api/seguidores";

import "./Negocios.scss";

function Negocios(props) {
    const {location, history} = props;
    const [negocios, setNegocios] = useState(null);
    const params = negocioUrl(location);
    //Identifica entre news y follow
    const [tipo, setTipo] = useState(params.tipo || "follow"); //En caso de que el tipo no tenga valor, mostramos el siguiendo
    // console.log(params);
    console.log(props);
    useEffect(() => {
        //follow o new
        // Le pasamo sla url en formato string
        mostrarNegociosApi(queryString.stringify(params)).then(response => {
            //console.log(response);

            if(isEmpty(response)){
                // PARA CUANDO NOE NCUENTRE RESULTADOS
                setNegocios([]);     
            }else{
                setNegocios(response);
            }
        }).catch(err => {
            setNegocios([]);
        });

        // Cuando location cambie vuelkve a ejecutar
    }, [location]);
    const cambioTipo = (tipo) =>{
        // boramos los negocios para volver a caragr los nuevos
        setNegocios(null);
        if(tipo === "new"){
            // Adjudicamos
            setTipo("new");
        }else{
            // Adjudicamos
            setTipo("follow");
        }

        history.push(
           { search: queryString.stringify({tipo: tipo, pagina:1, buscando: "",})}
        )
    }
    return (
            <Contenido className="negocios-todos" title="Negocios" >
                <div className="negocios-title">   
                        <h2>Negocios</h2>
                        <input type="text" placeholder="Busca la empresa" />
                </div>
                <ButtonGroup className="opciones">
                    {/* Para que al pinchar en cada boton se nos filtren */}
                    <Button onClick={() => cambioTipo("follow")}>Sigo</Button>
                    <Button onClick={() => cambioTipo("new")}>No Sigo</Button>
                </ButtonGroup>
                {!negocios ? (
                <div className="neg-loading">
                    <Spinner animation="border" variant="info" />
                    Cargando...
                </div>
                ):(
                    <ListNegocios negocios={negocios} />
                )
            }
            </Contenido>
    )
}


function negocioUrl(location){
    // Nos sirve para recoger de la url los datos de busqueda que vamos a pasar a nuestro backend
    const {pagina=1,tipo="new", buscando} = queryString.parse(location.search);
    return {pagina, tipo, buscando};
}

export default withRouter(Negocios);
