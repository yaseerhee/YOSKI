import React, {useState, useEffect} from 'react';
import {Spinner, ButtonGroup, Button, Row, Col, Form} from "react-bootstrap";
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
    const [btnLoading, setBtnLoading] = useState(false);
    const params = negocioUrl(location);
    //Identifica entre news y follow
    const [tipo, setTipo] = useState(params.tipo || "follow"); //En caso de que el tipo no tenga valor, mostramos el siguiendo
    // console.log(params);
    // console.log(props);
    useEffect(() => {
        //follow o new
        // Le pasamo sla url en formato string
        mostrarNegociosApi(queryString.stringify(params)).then(response => {
            //console.log(response);
            if(params.pagina == 1){
                if(isEmpty(response)){
                    // PARA CUANDO NOE NCUENTRE RESULTADOS
                    setNegocios([]);     
                }else{
                    setNegocios(response);
                }
            }else{
                if(!response){
                    // Si no hay valor que no ejecvute el spinner
                    setBtnLoading(0);
                }else{
                    //Nos traemos los negocios anteriores y los nuevos
                    setNegocios([...negocios, ...response]);
                    // Para que le boton no aparezca
                    setBtnLoading(false);
                }
            }

        }).catch(err => {
            setNegocios([]);
        });

        // Cuando location cambie vuelkve a ejecutar
    }, [location]);

    // funciona que gestiona a los nuevos y a los que sigo
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
        // //Sirve para pasar al history los parametros de nuestra url, Esto apoya a los botones y hace que sea dinamico
        history.push(
           { search: queryString.stringify({tipo: tipo, pagina:1, buscando: "",})}
        )
    }

    // ver MAS NEGOCIOS
    const masDatos = () => {
        console.log("buscando negocios");
        setBtnLoading(true);
        // params es un string
        const nuevaPagina = parseInt(params.pagina)+1;
        //pasamos al history la nueva pagina
        history.push({search: queryString.stringify({...params, pagina: nuevaPagina})})
    }

    return (
            <Contenido className="negocios-todos" title="Negocios" >
                <div className="negocios-title">   
                        <h2>Negocios</h2>
                        {/* Cada vez que cambie el valor del input enviamos los datos al history que se encarga de pasarlospor url */}
                        <Form.Control type="text" placeholder="Busca la empresa" onChange={(e) => history.push({search: queryString.stringify({...params, buscando: e.target.value})})}/>
                </div>
                <ButtonGroup className="opciones">
                    {/* Para que al pinchar en cada boton se nos filtren */}
                    <Button onClick={() => cambioTipo("follow")} className={tipo==="follow" && "active"}>Sigo</Button>
                    <Button onClick={() => cambioTipo("new")} className={tipo==="new" && "active"}>No Sigo</Button>
                </ButtonGroup>
                {!negocios ? (
                <div className="neg-loading">
                    <Spinner animation="border" variant="info" />
                    Cargando...
                </div>
                ):(
                    // Porque no permite devolver dos compoennetes
                    <>
                    <ListNegocios negocios={negocios} />
                    <Button onClick={() => masDatos()} className="mas-negocios">{!btnLoading ? (
                        btnLoading !== 0 && "Ver más..."
                    ):(
                        <Spinner as="span" animation="grow" size="sm" role="status" aria-hidden="true" />
                    )}
                    </Button>
                    </>
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
