import React, {useState, useCallback} from 'react';
import {Form, Button, Row, Col, Spinner} from "react-bootstrap";
import {HOST} from "../../api/variablesGlobales";
import {toast} from "react-toastify";
//Ficheros subir
import {useDropzone} from "react-dropzone";
// Añadimos la s libreria s para calendario en español
import DatePicker from 'react-datepicker';
import es from "date-fns/locale/es";
import "./EditNegocio.scss";
// Funciones que se conectan al Backend
import {subirBannerApi, subirAvatarApi, modificarInfoApi} from "../../api/negocio";

export default function EditNegocio(props) {
    const [loading, setLoading] = useState(false);
    //rECOGEMOS NUESTRA VENTANA
    const {negocio, setAbrirModal} = props;
    // Recogemos los valores de nuestro negocio
    const [formData, setFormData] = useState(validarValores(negocio));
// -------------------BANNER 
    // rECOGEMOS ESTADO FICHERIO
    const [bannerURL, setbannerURL] = useState(
        negocio?.banner ? `${HOST}/obtenerBanner?id=${negocio.id}` : null
    );
    // Creamos este estado para enviarselo al servidor
    const [bannerFile, setbannerFile] = useState(null);

    // Variable donde guardamos el fichero
    const onDropBanner = useCallback(archivo => {
        console.log(archivo);
        const file = archivo[0];
        setbannerURL(URL.createObjectURL(file));
        setbannerFile(file);
    });

    //Configuracion de los fichero que aceptamos // Esto sirve para dar las propiedades apropiadas a un div y a un input
    // : damos alias para no equivocarlo con los del avatar
    const {getRootProps: getRootBannerProps, getInputProps: getInputBannerProps} = useDropzone({
        accept: "image/jpeg, image/png",
        noKeyboard: true,
        multiple: false,
        onDrop: onDropBanner //Le pasamos el fichero a nuestra variable
    });
// -----------------avatar
// rECOGEMOS ESTADO FICHERIO
    const [avatarURL, setAvatarURL] = useState(
    negocio?.avatar ? `${HOST}/obtenerAvatar?id=${negocio.id}` : null
);
// Creamos este estado para enviarselo al servidor
    const [avatarFile, setAvatarFile] = useState(null);

    
    // Variable donde guardamos el fichero
    const onDropAvatar = useCallback(archivo => {
        console.log(archivo);
        const file = archivo[0];
        setAvatarURL(URL.createObjectURL(file));
        setAvatarFile(file);
    });
    
    //Configuracion de los fichero que aceptamos // Esto sirve para dar las propiedades apropiadas a un div y a un input
   // : damos alias para no equivocarlo con los del avatar
   const {getRootProps: getRootAvatarProps, getInputProps: getInputAvatarProps} = useDropzone({
       accept: "image/jpeg, image/png",
       noKeyboard: true,
       multiple: false,
       onDrop: onDropAvatar //Le pasamos el fichero a nuestra variable
   });

    // / --------------- datos negocio
    const modificarValoresNegocio = (e) => {
        // Esto va asignar el valor de cada target al name
        setFormData({...formData, [ e.target.name]: e.target.value,})
    }
    // console.log(negocio);
    //Le decimos que lo ejecute de forma asincronsa
    const modificoInfo = async(e) =>{
        e.preventDefault();
        //Para que muestre el Spinner mientras se hace el cambio /peticiones
        setLoading(true);
        if(bannerFile){
            await subirBannerApi(bannerFile).catch(() => {
                toast.error("Fallo al cambiar el Banner");
            });
        }
        if(avatarFile){
            await subirAvatarApi(avatarFile).catch(() => {
                toast.error("Fallo al cambiar el Avatar");
            });
        }
        // modificamos los datos del negocio los haya modificado o no
       await modificarInfoApi(formData).then(()=>{
            setAbrirModal(false);
        }).catch(() => {
            toast.error("Error al modificar los datos");
        });
        //Esto se ejecutará lo último
        window.location.reload();
    }


    return (
        <div className="edit-neg">
            {/* Le pasamos el root y el input en alias */}
            <div className="banner"   style={{backgroundImage: `url('${bannerURL}')`}} {...getRootBannerProps()}>
                <input {...getInputBannerProps()} />
                {/* <img alt="camara" className="iconos" src={Banner} /> */}
            </div>
            <div className="avatar"   style={{backgroundImage: `url('${avatarURL}')`}} {...getRootAvatarProps()}>
                <input {...getInputAvatarProps()} />
                {/* <img alt="camara" className="iconos" src={Banner} /> */}
            </div>
            <Form onSubmit={modificoInfo}>
                <Form.Group>
                    <Row>
                        <Col>
                            <Form.Control type="text" placeholder="Nombre de la Empresa" name="nombre" defaultValue={formData.nombre} onChange={modificarValoresNegocio}/>
                        </Col>
                        <Col>
                            <Form.Control type="text" placeholder="Industria" name="industria" defaultValue={formData.industria} onChange={modificarValoresNegocio}/>
                        </Col>
                    </Row>
                </Form.Group>
                <Form.Group>
                        <Form.Control as="textarea" placeholder="Descripción" name="biografia" type="text" row="5" defaultValue={formData.biografia} onChange={modificarValoresNegocio}/>
                </Form.Group>
                <Form.Group>
                        <Form.Control placeholder="Sitio Web" name="sitioweb" type="text" defaultValue={formData.sitioweb} onChange={modificarValoresNegocio}/>
                </Form.Group>
                <Form.Group>
                        <DatePicker placeholder="Fecha de Creación" name="fechaCreacion" locale={es} selected={new Date(formData.fechaCreacion)} onChange={date => setFormData({...formData, fechaCreacion: date})}/>
                </Form.Group>
                <Button className="btn-submit" variant="primary" type="submit">{loading && <Spinner animation="border" size="sm"/>}Actualizar</Button>            </Form>
        </div>
    )
}

function validarValores(negocio){
        // Si existe el valor lo mostramos si no lo dejamos vacio
    return {
        nombre: negocio.nombre ? negocio.nombre : "",
        industria: negocio.industria ? negocio.industria : "",
        biografia: negocio.biografia ? negocio.biografia : "",
        ubicacion: negocio.ubicacion ? negocio.ubicacion : "",
        sitioweb: negocio.sitioweb ? negocio.sitioweb : "",
        fechaCreacion: negocio.fechaCreacion ? negocio.fechaCreacion : "",
    }
}
