import React from 'react';
import {Modal} from "react-bootstrap";
import Cerrar from "../../img/cerrar.svg";

import './ConfigNegocio.scss';

export default function ConfigNegocio(props) {
    // show nos dirá si esta visible o no // setShow para poder cerrar el modal // children es lo que vamos a rendeizar
    const {show, setShow, title, children } = props;
    return (
       <Modal className="config-neg" show={show} onHide={() => setShow(false)} centered size="lg">
           <Modal.Header>
               <Modal.Title>
                   <a onClick={() => setShow(false)} href><img className="icons" src={Cerrar} alt="cerrar" /></a>
                   <h2>{title}</h2>
               </Modal.Title>
           </Modal.Header>
               <Modal.Body>
                   {children}
               </Modal.Body>
       </Modal>
    )
}
