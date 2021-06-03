import React, {useState} from 'react'
import { Row, Col, Form, Button, Spinner} from "react-bootstrap";
// estilos
import "./formRegistro.scss";
export default function FormRegistro(props) {
    const { setmostrarVentana} = props;
    const [FormData, setFormData] = useState(recogerValorForm());
    // inicializamos a falso
    const onSubmit = (e) => {
        e.preventDefault();
        setmostrarVentana(false);
        console.log(FormData);
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
                <Button variant="primary" type="submit">Registrarse</Button>
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