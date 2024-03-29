import React, { useState, useEffect } from 'react';
import UsuarioContext, { Usuario } from './UsuarioContext';
import {API} from '../config/config';


export const UsuarioProvider = ({ children }) => {
    const [usuario, setUsuario] = useState([]);
    const [datosUsuario, setDatosUsuario] = useState({ idusuarios:0 ,email: '', password: '', nombre:'',apellido:"",direccion:"", telefono:"" }); // Inicializa datosUsuario con un objeto vacío

    useEffect(() => {
        fetch(`${API}/usuarios`)
            .then((response) => {
                if (!response.ok) {
                    console.log('¡Error!');
                    throw new Error('Error de red - No se pudo obtener la lista de usuarios');
                }
                return response.json();
            })
            .then((data) => {
                console.log(data);
                setUsuario(data);
            })
            .catch((error) => {
                console.log(error);
                console.log('¡Error!');
            });
    }, []);

    return (
        <UsuarioContext.Provider value={{ listaUsuario: usuario, setDatosUsuario, datosUsuario }}>
            {children}
        </UsuarioContext.Provider>
    );
};
