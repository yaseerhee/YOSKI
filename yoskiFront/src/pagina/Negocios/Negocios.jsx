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
    const {location} = props;
    const [negocios, setNegocios] = useState(null);
    const params = negocioUrl(location);
    // console.log(params);
    // console.log(props);
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
        })
    }, [])
    const {} = props;
    return (
            <Contenido className="negocios-todos" title="Negocios" >
                <div className="negocios-title">   
                        <h2>Negocios</h2>
                        <input type="text" placeholder="Busca la empresa" />
                </div>
                <ButtonGroup className="opciones">
                    <Button>Sigo</Button>
                    <Button>No Sigo</Button>
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
