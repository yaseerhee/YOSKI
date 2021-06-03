import React from 'react';
// Contenido de toda web
import Contenido from '../../componentes/Contenido/Contenido';
// estilos
import './Home.scss';


export default function Home() {
    return (
        <div>
            <Contenido clasName="home">
            <h2>Estamos en Home</h2>
            </Contenido>
        </div>
    )
}
