// importamos componentes
import React from 'react';
import {Container, Row, Col, Button} from 'react-bootstrap';
// importamos img
import Fondo from "../../img/FondoInicioYoski.png";
import Logo from "../../img/logo_yoski.png";
// importamos estiilos
import "./AccesoUsuario.scss";

export default function AccesoUsuario(){
        // Despliegue
        return (
            <Container className="acceso-usuario" fluid>
                <Row>
                    <ComponentIzq />
                    <ComponentDrch />
                </Row>
            </Container>
        )
}

// Parte de la izquierda
function ComponentIzq() {
    return (
        <Col className="acceso-usuario-izq" xs={6}>
            <img src={Fondo} alt="Yoski" />
            <div>

            </div>
        </Col>
    );
}

// Parte de la derecha
function ComponentDrch() {
    return (
        <Col className="acceso-usuario-drch" xs={6}>
           <div>
               <img src={Logo} alt="logo" />
               <h2>Por un crecimiento de los pequeños negocios!</h2>
               <h3>Vamos a ayudarnos! ~ YASER HADDAD</h3>
               <Button variant="primary">Regístrate</Button>
               <Button variant="outline-light">Iniciar Sesión</Button>
           </div>
        </Col>
    );
}
