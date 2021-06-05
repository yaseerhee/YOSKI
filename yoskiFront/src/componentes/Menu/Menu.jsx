import React,{useState} from 'react';
import {Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';
// traemos la funcion para cerrar la sesion
import {cerrarSesionApi} from "../../api/autentificacion";
// traemos la fucnion que nos dice lsod atos del usuario
import negocioAuth, {NegocioAuth} from "../../hooks/negocioAuth";
import VentanaPublicacion from "../VentanaPublicaciones/VentanaPublicaciones";
// iconos
import Logo from '../../img/logo_yoski_verde_claro.png';
import Inicio from '../../img/inicio.svg'; 
import Negocio from '../../img/tienda.svg'; 
import Perfil from '../../img/perfil.svg'; 
import Salir from '../../img/exit.svg'; 

// Estilos
import "./Menu.scss";
import VentanaPublicaciones from '../VentanaPublicaciones/VentanaPublicaciones';

export default function Menu() {
    //Esta funcion ayuda a recuperr la info que tenemos del negocio logueado en el contexto
    const negocio = negocioAuth();
    const cerrarSesion = () => {
        //Nos borra la sesio (tokem)
        cerrarSesionApi();
        // refrescamos la pagina para qu enos obligue a salir :D es la unica solucion que he encontrado jeje
        window.location.reload();
    }
    // Venatan de publicaciones
    const [abrirVentana, setAbrirVentana] = useState(false)

    return (
        <div className="menu">
            <img className="logo" src={Logo} alt="yoski" />
            <Link to="/">
                <img className="icons" src={Inicio} alt="inicio"/> Inicio
            </Link>
            <Link to={`/${negocio?._id}`}> {/* la interrogacion aydua a que si el parametro no existe lo obvie */}
                <img className="icons" src={Perfil} alt="perfil"/> Perfil
            </Link>
            <Link to="/negocios">
                <img className="icons" src={Negocio} alt="negocios"/> Negocios
            </Link>
            <Link to="" onClick={cerrarSesion}>
                <img className="icons" src={Salir} alt="salir"/> Salir
            </Link>

            <Button onClick={() => setAbrirVentana(true)} >Publicar</Button>
            <VentanaPublicaciones show={abrirVentana} setShow={setAbrirVentana} />
        </div>
    )
}
