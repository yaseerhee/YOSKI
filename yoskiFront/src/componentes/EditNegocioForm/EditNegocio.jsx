import React, {useState} from 'react';
import {Form, Button, Row, Col} from "react-bootstrap";

// Añadimos la s libreria s para calendario en español
import DatePicker from 'react-datepicker';
import es from "date-fns/locale/es";
import "./EditNegocio.scss";

export default function EditNegocio(props) {
    const {negocio, setAbrirModal} = props;
    // Recogemos los valores de nuestro negocio
    const [FormData, setFormData] = useState(validarValores(negocio));
    // console.log(negocio);
    const modificoInfo = e =>{
        e.preventDefault();
        console.log(FormData);
    }

    const modificarValoresNegocio = (e) => {
        // Esto va asignar el valor de cada target al name
        setFormData({...FormData, [ e.target.name]: e.target.value,})
    }

    return (
        <div className="edit-neg">
            <Form onSubmit={modificoInfo}>
                <Form.Group>
                    <Row>
                        <Col>
                            <Form.Control type="text" placeholder="Nombre de la Empresa" name="nombre" defaultValue={FormData.nombre} onChange={modificarValoresNegocio}/>
                        </Col>
                        <Col>
                            <Form.Control type="text" placeholder="Industria" name="industria" defaultValue={FormData.industria} onChange={modificarValoresNegocio}/>
                        </Col>
                    </Row>
                </Form.Group>
                <Form.Group>
                        <Form.Control as="textarea" placeholder="Descripción" name="biografia" type="text" row="5" defaultValue={FormData.biografia} onChange={modificarValoresNegocio}/>
                </Form.Group>
                <Form.Group>
                        <Form.Control placeholder="Sitio Web" name="sitioweb" type="text" defaultValue={FormData.sitioweb} onChange={modificarValoresNegocio}/>
                </Form.Group>
                <Form.Group>
                        <DatePicker placeholder="Fecha de Creación" name="fechaCreacion" locale={es} selected={new Date(FormData.fechaCreacion)} onChange={date => setFormData({...FormData, fechaCreacion: date})}/>
                </Form.Group>
                <Button className="btn-submit" variant="primary" type="submit">Actualizar</Button>
            </Form>
        </div>
    )
}


function validarValores(negocio){
        // Si existe el valor lo mostramos si no lo dejamos vacio
    return {
        nombre: negocio.nombre ? negocio.nombre : "",
        industria: negocio.industria ? negocio.industria : "",
        biografia: negocio.biografia ? negocio.biografia : "",
        ubicacion: negocio.ubicacion ? negocio.ubicacion : "",
        sitioweb: negocio.sitioweb ? negocio.sitioweb : "",
        fechaCreacion: negocio.fechaCreacion ? negocio.fechaCreacion : "",
    }
}
