import React from 'react';
//estilos bootstrap
import { Container, Row, Col } from 'react-bootstrap';
// Menu estilos
import './Contenido.scss';
//menu
import Menu from '../Menu/Menu';

export default function Contenido(props) {
    const {className, children} = props; // recibimos los datos de la página en la que lo desplegamos Y LA CLASE
    //console.log(props);
    return (
        <Container className={`contenido ${className}`}>
            <Row>
                <Col xs={3} className="contenido_menu">
                    <Menu />
                </Col>
                <Col xs={9} className="contenido">
                    {children}
                </Col>
            </Row>
        </Container>
    )
}
