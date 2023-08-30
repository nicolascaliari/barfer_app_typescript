import { createContext, Context } from "react";



export interface Usuario {
  idusuarios: number;
  email: string;
  password: string;
  nombre: string;
  apellido: string;
  direccion:string;
  telefono:string;
}

export interface UsuarioContextProps {
  listaUsuario: Usuario[];
  setDatosUsuario: React.Dispatch<React.SetStateAction<Usuario>>;
  datosUsuario: Usuario
}


const UsuarioContext: Context<UsuarioContextProps> = createContext<UsuarioContextProps>({

  listaUsuario: [],
  setDatosUsuario: () => { },
  datosUsuario: {idusuarios:0 ,email: "", password: "", nombre: "", apellido:"" , direccion:"", telefono:""} // Cambio aquí
});

export default UsuarioContext;