// importamos componentes
import React, {useState} from 'react';
import {Container, Row, Col, Button} from 'react-bootstrap';
import VentanaForm from "../../componentes/VentanaAccesoUsuario/VentanaAccesoUsuario";
import FormRegistro from "../../componentes/FormRegistro/FormRegistro";
import FormInicio from "../../componentes/FormInicio/FormInicio";
// importamos img
import Fondo from "../../img/FondoInicioYoski.png";
import Logo from "../../img/logo_yoski_verde_claro.png";
// importamos estiilos
import "./AccesoUsuario.scss";

export default function AccesoUsuario(props){
    //console.log(props);
    //Recuperamos la funcion de props
    const {setCompSesion} = props;
    // Usamos estos estados para visualizar la ventana del formulario
    const [mostrarVentana, setmostrarVentana] = useState(false);
    const [contVentana, setContVentana] = useState(false);
    // funcion que abre la ventana
    const abrirVent = cont =>{
        setmostrarVentana(true);
        setContVentana(cont);
    }
        // Despliegue
        return (
            <>
            <Container className="acceso-usuario" fluid>
                <Row>
                    <ComponentIzq abrirVent={abrirVent} setmostrarVentana={setmostrarVentana} setCompSesion={setCompSesion}/>
                    <ComponentDrch />
                </Row>
            </Container>
            <VentanaForm show={mostrarVentana} setShow={setmostrarVentana}> 
            {/* Ventana de registro  o inicio */}
               {contVentana}
            </VentanaForm>
            </>
        )
}

// Parte de la izquierda
function ComponentDrch() {
    return (
        <Col className="acceso-usuario-drch" xs={6}>
            <img src={Fondo} alt="Yoski" />
            <div>
            </div>
        </Col>
    );
}

// Parte de la derecha
function ComponentIzq(props) {
    // rECIBIMOS LOS ATRIBUTOSQUE VANA DAR LA FUNCIONALIDAD 
    const {abrirVent, setmostrarVentana, setCompSesion} = props;
    return (
        <Col className="acceso-usuario-izq" xs={6}>
           <div>
               <img src={Logo} alt="logo" />
               <h2>Por un crecimiento de los pequeños negocios!</h2>
               <h3>Vamos a ayudarnos! ~ YASER HADDAD</h3>
               <Button onClick={() => {abrirVent(<FormRegistro setmostrarVentana={setmostrarVentana} />)}} variant="primary">Regístrate</Button>
               <Button onClick={() => {abrirVent(<FormInicio setCompSesion={setCompSesion}/>)}}variant="outline-light">Iniciar Sesión</Button>
           </div>
        </Col>
    );
}
