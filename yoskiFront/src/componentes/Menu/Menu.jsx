import React from 'react';
import {Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {cerrarSesionApi} from "../../api/autentificacion";
// iconos
import Logo from '../../img/logo_yoski_verde_claro.png';
import Inicio from '../../img/inicio.svg'; 
import Negocio from '../../img/tienda.svg'; 
import Perfil from '../../img/perfil.svg'; 
import Salir from '../../img/exit.svg'; 

// Estilos
import "./Menu.scss";

export default function Menu() {

    const cerrarSesion = () => {
        //Nos borra la sesio (tokem)
        cerrarSesionApi();
        // refrescamos la pagina para qu enos obligue a salir :D es la unica solucion que he encontrado jeje
        window.location.reload();
    }

    return (
        <div className="menu">
            <img className="logo" src={Logo} alt="yoski" />
            <Link to="/">
                <img className="icons" src={Inicio} alt="inicio"/> Inicio
            </Link>
            <Link to="/perfil">
                <img className="icons" src={Perfil} alt="perfil"/> Perfil
            </Link>
            <Link to="/negocio">
                <img className="icons" src={Negocio} alt="negocios"/> Negocios
            </Link>
            <Link to="" onClick={cerrarSesion}>
                <img className="icons" src={Salir} alt="salir"/> Salir
            </Link>

            <Button>Publicar</Button>
        </div>
    )
}
