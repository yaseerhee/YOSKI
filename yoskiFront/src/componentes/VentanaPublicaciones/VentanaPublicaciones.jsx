import React, {useState} from 'react';
import {Modal, Form, Button} from "react-bootstrap";
import Cerrar from "../../img/cerrar.svg";

import "./VentanaPublicaciones.scss";
// estilos
export default function VentanaPublicaciones(props) {
    //Funcionalidad abrirVentana
    const {show, setShow} = props;
    // mensaje
    const [msg, setMsg] = useState("");
    //Funcionalidad publicar
    const publicar = () => {
        console.log("publicando..");
    }
    return (
        <Modal className="publicacion-ventana" show={show} onHide={() => setShow(false)} centered size="lg">
            <Modal.Header>
                <Modal.Title>
                    <img src={Cerrar} alt="cerrar" className="iconos" onClick={()=>setShow(false)}/>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={publicar}>
                    <Form.Control as="textarea" row="10" placeholder="¿Que te ha pasado hoy?" />
                    <span className="contador">
                        {/* //SE VA A ENCARGAR DE DECIRNOS CUANTAS LETRAS TIENE POR TEMA DE QUE SE ROMPE LA BASE DE DATOS */}
                        {msg.length}
                    </span>
                    <Button type="submit"> Publicar</Button>
                </Form>
            </Modal.Body>
        </Modal>
    )
}
