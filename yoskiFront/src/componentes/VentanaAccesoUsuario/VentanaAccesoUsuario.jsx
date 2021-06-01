import React from 'react';
import { Modal } from "react-bootstrap";
// img
import Logo from "../../img/logo_yoski.png";

// estilos
import "./ventana.scss";

export default function VentanaAccesoUsuario(props) {
    // show nos dirá si esta visible o no // setShow para poder cerrar el modal // children es lo que vamos a rendeizar
    const {show, setShow, children } = props;

    return (
        <Modal className="basic-modal" show={show} onHide={() => setShow(false)} centered size="lg">
           <Modal.Header>
               <Modal.Title>
                   <img src={Logo} alt="logo" />
               </Modal.Title>
           </Modal.Header>
           <Modal.Body>
               {children}
           </Modal.Body>
        </Modal>
    )
}

