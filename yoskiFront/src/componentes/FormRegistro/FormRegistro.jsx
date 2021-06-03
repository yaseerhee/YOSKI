import React, {useState} from 'react'
import { Col, Form, Button, Spinner} from "react-bootstrap";
//importamos paquetes de validacion
import { values, size} from 'lodash';
import {toast} from 'react-toastify';
// estilos
import "./formRegistro.scss";
export default function FormRegistro(props) {
    const { setmostrarVentana} = props;
    const [FormData, setFormData] = useState(recogerValorForm());
    //Va a aprecer mientras el usuario se esta registrando
    const [loading, setLoading] = useState(false);
    // inicializamos a falso
    const onSubmit = (e) => {
        e.preventDefault();
        console.log(FormData);
        // Para comprobar que todos estan validados. Si todos = 5
        let validacion = 0;
        // Esto hace un bucle que comprueba cada valor de nuestro JSON, esto quiere decir que si llenamos menos de 5 va a devolver el toastify
        values(FormData).some(value => {
            value && validacion++
            return null;    
        });
        // console.log(validacion); Prueba
        if(validacion !== 5){
            //Paquete que muestra alert
            toast.warning("Completa todos los campos del registro");
        }else{
            // Comprobamos contraseñas identicas
            if(FormData.password !== FormData.repPassword){
                toast.warning("Contraseñas distintas! ");
            }else if(size(FormData.password < 6)){
                //Comprobamos contraseña mayor de 6 caracteres
                toast.warning("La contraseña es insegura, prueba a poner más de 6 caracteres! ");
            }else{
                setLoading(true);
                toast.success("Registro exitoso.");
            }
        }
    }
    return (
        <div className="form-reg">
            <Form onSubmit={onSubmit}>
            <h2>Regístrate</h2>
                <Form.Group>
                    <Col>
                        {/* Si hay un cambio en el text del input actualizas el valor y lo envias a la funcion que recoge los valores y actualizas del Json el nombre, asi con el resto */}
                        <Form.Control  type="text" name="nombre" placeholder="Nombre" value={FormData.nombre} onChange={e => setFormData({ ...FormData, nombre: e.target.value})}/>
                    </Col>
                    <Col>
                        <Form.Control  type="text" name="industria" placeholder="Industria" value={FormData.industria} onChange={e => setFormData({ ...FormData, industria: e.target.value})}/>
                    </Col>
                    <Col>
                    <Form.Control  type="email" name="email" placeholder="Correo Electrónico" value={FormData.email} onChange={e => setFormData({ ...FormData, email: e.target.value})}/>
                    </Col>
                    <Col>
                        <Form.Control  type="password" name="password" placeholder="Contraseña" value={FormData.password} onChange={e => setFormData({ ...FormData, password: e.target.value})}/>
                    </Col>
                    <Col>
                        <Form.Control  type="password"name="repPassword" placeholder="Repetir Contraseña" value={FormData.repPassword} onChange={e => setFormData({ ...FormData, repPassword: e.target.value})}/>
                    </Col>
                </Form.Group>
                <Button variant="primary" type="submit">
                    {/* Si no hay un loading muestra Registrarse en caso de que este procesando datos muestra la ruedecita */}
                    { !loading ? "Registrarse" : <Spinner animation="border" />}
                    </Button>
            </Form>
        </div>
    )
}
function recogerValorForm(){
    //Vamos a coger la info que el usuario guarda y la vamos a guardar en el estado
    return {
        nombre: "",
        industria: "",
        email: "",
        password: "",
        repPassword:""

    }
}