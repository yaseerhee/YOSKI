import React,{useState, useEffect} from 'react';
import {Media, Image} from "react-bootstrap";
import {Link} from "react-router-dom";
import {HOST} from "../../api/variablesGlobales";
import {getNegocioApi} from "../../api/negocio";
import Avatar from "../../img/perfil-by-default.png";


// useState guarda info de negocio y 
// useeffect ejecuta tantas veces cambie dicha info

export default function Negocio(props) {

    const {negocio} = props;
    const [negocioInfo, setNegocioInfo] = useState(null);

    useEffect(() => {
      getNegocioApi(negocio.id).then((response) => {
          setNegocioInfo(response);
      })
    }, [negocio]);
    return (
        <Media as={Link} to={`/${negocio.id}`} className="list-negocio-negocio" >
            <Image alt={`${negocio.nombre}`} width={64} height={64} roundedCircle className="mr-3" src={negocioInfo?.avatar ? `${HOST}/obtenerAvatar?id=${negocio.id}` : Avatar} />
            <Media.Body>
                <h5>{negocio.nombre}</h5>
                <p>{negocio.industria}</p>
            </Media.Body>
        </Media>
    )
}
