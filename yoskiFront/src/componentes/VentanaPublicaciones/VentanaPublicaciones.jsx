import React, {useState} from 'react';
import {Modal, Form, Button} from "react-bootstrap";
import {toast} from "react-toastify";
import classNames from  "classnames";
import Cerrar from "../../img/cerrar.svg";
import {realizarPublicacionApi} from "../../api/publicaciones";

import "./VentanaPublicaciones.scss";
// estilos
export default function VentanaPublicaciones(props) {
    //Funcionalidad abrirVentana
    const {show, setShow} = props;
    // mensaje
    const [msg, setMsg] = useState("");
    //Limite de caracteres por publicacion
    const maxLongitud = 255;
    //Funcionalidad publicar
    const publicar = (e) => {
        console.log("publicando..");
        e.preventDefault(); //Para evitar que la web se recarga
        // si el msg cumple las condicioens
        if(msg.length>0 && msg.length<=maxLongitud){
            // Ejecutamos la petifcion
            realizarPublicacionApi(msg).then(
                (response) => {
                    if(response?.code >= 200 && response?.code < 300){
                        // Si todo va bien
                        // cierrame la ventana
                        setShow(false);
                        // Muestrame el mensaje de correcto
                        toast.success(response.msg);
                        // // refresca la pagina
                        window.location.reload();
                    }
                }
            ).catch(err => {
                toast.warning("Algo fallo al subir tu publicación..")
            })
        }else{
            toast.error("No cumple las condiciones");
        }
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
                    <Form.Control as="textarea" row="10" placeholder="Comparte con tus seguidores..." onChange={(e) => setMsg(e.target.value)} />
                    {/* Condicion por si supera los 255 que se ponga en rojo y no deje publicark */}
                    <span className={classNames("contador", {error: msg.length > maxLongitud})}>
                        {/* //SE VA A ENCARGAR DE DECIRNOS CUANTAS LETRAS TIENE POR TEMA DE QUE SE ROMPE LA BASE DE DATOS */}
                        {msg.length}
                    </span>
                    {/* Dehabilitamos el boton si el msg longitud es menor a uno o mayor a 255 */}
                    <Button type="submit" disabled={msg.length > maxLongitud || msg.length<1}> Publicar</Button>
                </Form>
            </Modal.Body>
        </Modal>
    )
}
