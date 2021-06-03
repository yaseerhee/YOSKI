import React from 'react';
import {Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import Logo from '../../img/logo_yoski_verde_claro.png';
import Inicio from '../../img/inicio.svg'; 
import Negocio from '../../img/tienda.svg'; 
import Perfil from '../../img/perfil.svg'; 
import Salir from '../../img/exit.svg'; 
// Estilos
import "./Menu.scss";

export default function Menu() {
    return (
        <div className="menu">
            <img className="logo" src={Logo} alt="yoski" />
            <Link to="/">
                <img className="icons" src={Inicio} /> Inicio
            </Link>
            <Link to="/perfil">
                <img className="icons" src={Perfil} /> Perfil
            </Link>
            <Link to="/negocio">
                <img className="icons" src={Negocio} /> Negocios
            </Link>
            <Link to="/salir">
                <img className="icons" src={Salir} /> Salir
            </Link>

            <Button>Publicar</Button>
        </div>
    )
}
