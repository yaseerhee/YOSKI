import React from 'react';
import {Form, Button, Row, Col} from "react-bootstrap";

import "./EditNegocio.scss";

export default function EditNegocio() {

    const modificoInfo = e =>{
        e.preventDefault();
    }

    return (
        <div className="edit-neg">
            <Form onSubmit={modificoInfo}>
                <Form.Group>
                    <Row>
                        <Col>
                            <Form.Control type="text" placeholder="Nombre de la Empresa" name="nombre" />
                        </Col>
                        <Col>
                            <Form.Control type="text" placeholder="Industria" name="industria" />
                        </Col>
                    </Row>
                </Form.Group>
                <Form.Group>
                        <Form.Control as="textarea" placeholder="Descripción" name="biografia" type="text" row="5"/>
                </Form.Group>
                <Form.Group>
                        <Form.Control placeholder="Sitio Web" name="sitioWeb" type="text" row="5"/>
                </Form.Group>
                <Button className="btn-submit" variant="primary" type="submit">Actualizar</Button>
            </Form>
        </div>
    )
}
