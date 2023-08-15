import { createContext, Context } from 'react';

export interface Compra {
  customId: string;
  cantidad: number;
  nombre:string;
  precio_cincokg:number;
  precio_diezkg:number;
  img:string;
  precio_final:number;
  kilos:string;
  // Otros campos relevantes de la compra
}

export interface CarritoContextProps {
  listaCompras: Compra[];
  agregarCompra: (compra: Compra) => void;
  aumentarCantidad: (id: string) => void;
  disminuirCantidad: (id: string) => void;
  eliminarCompra: (id: string) => void;
  precioSeleccionado: number;
  actualizarPrecioSeleccionado: (precio: number) => void;
}

const CarritoContext: Context<CarritoContextProps> = createContext<CarritoContextProps>({

  listaCompras: [],
  agregarCompra: () => {},
  aumentarCantidad: () => {},
  disminuirCantidad: () => {},
  eliminarCompra: () => {},
  precioSeleccionado: 0,
  actualizarPrecioSeleccionado: () => {},
});

export default CarritoContext;
