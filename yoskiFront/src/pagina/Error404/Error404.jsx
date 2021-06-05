import React from 'react';
import {Link} from "react-router-dom";
import Error404IMG from "../../img/error404.jpg";
import LOGO from "../../img/logo_yoski_verde_claro.png";
// estilos
import "./Error404.scss";

export default function Error404() {
    return (
        <div className="error404">         
        <img src={LOGO} alt="logo"/>
            <h2>Esta web es igual de robusta que mi brazo.</h2>
            <h2>Osea, mucho</h2>
            <img src={Error404IMG} alt="error"/>
            
            <Link to="/">Pincha aquí para volver</Link>
        </div>
    )
}
