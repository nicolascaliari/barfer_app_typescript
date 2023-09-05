import { createContext, Context } from 'react';

export interface Compra {
  idproducto:number;
  descripcion:string;
  customId: string;
  cantidad: number;
  nombre:string;
  precio_cincokg:number;
  precio_diezkg:number;
  img:string;
  precio_final:number;
  kilos:string;
  idCategory:number;
  imgInfo:string;
}

export interface CarritoContextProps {
  listaCompras: Compra[];
  agregarCompra: (compra: Compra) => void;
  aumentarCantidad: (id: string) => void;
  disminuirCantidad: (id: string) => void;
  eliminarCompra: (id: string) => void;
  precioSeleccionado: number;
  actualizarPrecioSeleccionado: (precio: number) => void;
  todayFood: Compra[];
  calcularDescuento: (compras: any[], efectivo : boolean) => number;
  calcularTotal: (lista: any[]) => number;
}

const CarritoContext: Context<CarritoContextProps> = createContext<CarritoContextProps>({

  listaCompras: [],
  agregarCompra: () => {},
  aumentarCantidad: () => {},
  disminuirCantidad: () => {},
  eliminarCompra: () => {},
  precioSeleccionado: 0,
  actualizarPrecioSeleccionado: () => {},
  todayFood:[],
  calcularDescuento: () => 0,
  calcularTotal: () => 0
});

export default CarritoContext;
