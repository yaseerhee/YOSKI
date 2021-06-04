import React from 'react';
import moment from "moment"; // libreria para controlar fechas
import localization from "moment/locale/es"; //Importamos el de España
//iconso
import Ubicacion from '../../../img/mapa.svg';
import Web from '../../../img/www.svg';
import Calendario from '../../../img/calendario.svg';

import "./InfoNegocio.scss";

export default function InfoNegocio(props) {
    // Cogemos nuestroi  negocio y le sacamos la info
    const {negocio } = props;

    return (
        <div className="info-negocio">
            <h2 className="name">{negocio?.nombre}</h2>
            <h4 className="industria">{negocio?.industria}</h4>
            <p className="email">{negocio?.email}</p>
            {/* Miramos si el negocio tiene una descripcion */}
            {negocio?.biografia && (<div className="descripcion">{negocio.biografia}</div>)}
            {/* Mostramos el resto de info */}
            <div className="mas-info">
                {negocio?.ubicacion && 
                <p>
                    <img className="icons" src={Ubicacion} alt="ubicacion"/>
                        {negocio.ubicacion}
                    </p>}
                {negocio?.sitioweb && 
                // {/* target: para que abra y deje abierta nuestra web */}
                <a href={negocio.sitioweb} alt={negocio.sitioweb} target="_blank" rel="noopener noreferrer"> 
                    <img className="icons" src={Web} alt="web"/>
                    {negocio.sitioweb}
                </a>}
                {negocio?.fechaCreacion && 
                <p>
                    <img className="icons" src={Calendario} alt="calendario"/>
                        {/* //Formateamos la fecha a española con la libreria moment */}
                        {moment(negocio.fechaCreacion).locale("es", localization).format("LL")}
                    </p>}
            </div>
        </div>
    )
}
