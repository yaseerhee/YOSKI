import React from 'react'
import { Row, Col, Form, Button, Spinner} from "react-bootstrap";
// estilos
import "./formRegistro.scss";
export default function FormRegistro(props) {
    const { setmostrarVentana} = props;
    // inicializamos a falso
    const onSubmit = (e) => {
        e.preventDefault();
        setmostrarVentana(false);
    }
    return (
        <div>
            <h2>Regístrate</h2>
            <Form onSubmit={onSubmit}>
                <Form.Group>
                    <Row>
                        <Col>
                            <Form.Control  type="text" placeholder="Nombre" />
                        </Col>
                        <Col>
                            <Form.Control  type="text" placeholder="Apellidos" />
                        </Col>
                    </Row>
                </Form.Group>
                <Form.Group>
                        <Form.Control  type="text" placeholder="Correo Electrónico" />
                </Form.Group>
                <Form.Group>
                    <Col>
                        <Form.Control  type="password" placeholder="Contraseña" />
                    </Col>
                </Form.Group>
                <Form.Group>
                    <Col>
                        <Form.Control  type="password" placeholder="Repetir Contraseña" />
                    </Col>
                </Form.Group>
                <Button variant="primary" type="submit">Registrarse</Button>
            </Form>
        </div>
    )
}
