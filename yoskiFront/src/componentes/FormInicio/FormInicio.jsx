import React, {useState} from 'react';
import {values, size, padStart} from "lodash";
import {toast} from "react-toastify";
import { inicioSesionApi, setTokenApi } from "../../api/autentificacion";
//importamos estilos
import "./FormInicio.scss";
import {Form, Button, Spinner} from "react-bootstrap";

export default function FormInicio() {
    // estado de nuestro formulario (vacio)
    const [FormData, setFormData] = useState(recogerValorForm());
     //Va a aprecer mientras el usuario se esta registrando
     const [loading, setLoading] = useState(false);
    //Funcion al clickar en inicio
    const onSubmit = e => {
        e.preventDefault();
        //console.log(FormData);

        let validacion = 0;

        values(FormData).some(value => {
            value && validacion++
            return null;
        })

        console.log(validacion);
        if(size(FormData) !== validacion){
            toast.warning("Rellan todos los campos!");
        }else{
            setLoading(true);
            inicioSesionApi(FormData).then(response => {
                if(response.message){
                    //Significa que nos ha dado error
                    toast.warning(response.message);
                }else{
                    //console.log(response.token);
                    // pasamos nuestro token a la funcion que lo alamcena en localstorage
                    setTokenApi(response.token);
                }
            }).catch(err => {
                // Capturamos error de si no hay respuesta
                toast.error("Prueba más tarde. Fallo del servidor");
            }).finally(()=>{
                //Paramos nuestro spinner porque ya habra terminado de registrar o de fallar
                setLoading(false);
            });
            toast.success("Inicio de sesión correcto");
        }
    }

    return (
        <div className="inicio-form">
            <h2>Acceder a tu cuenta</h2>
            <Form onSubmit={onSubmit}>
                <Form.Group>
                    <Form.Control type="email" name="email" placeholder="Email" value={FormData.email} onChange={e => setFormData({ ...FormData, email: e.target.value})} />
                </Form.Group>
                <Form.Group>
                    <Form.Control type="password" name="password" placeholder="Contraseña" value={FormData.password} onChange={e => setFormData({ ...FormData, password: e.target.value})} />
                </Form.Group>
                <Button variant="primary" type="submit">
                        {/* Si no hay un loading muestra Inicio de seion en caso de que este procesando datos muestra la ruedecita */}
                    { !loading ? "Iniciar Sesión" : <Spinner animation="border" />}
                </Button>
            </Form>
        </div>
    )
}


function recogerValorForm(){
    //Vamos a coger la info que el usuario guarda y la vamos a guardar en el estado
    return {
        email: "",
        password: "",
    }
}