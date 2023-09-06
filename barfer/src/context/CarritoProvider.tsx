import React, { useReducer, useState, useEffect } from 'react';
import CarritoContext, { CarritoContextProps, Compra } from './CarritoContext';
import { API } from '../config/config';

interface CarritoProviderProps {
  children: React.ReactNode;
}

interface CarritoAction {
  type: string;
  payload: Compra | string;
}

const initialState: Compra[] = [];

const CarritoProvider: React.FC<CarritoProviderProps> = ({ children }) => {
  const comprasReducer = (
    state: Compra[] = initialState,
    action: CarritoAction
  ): Compra[] => {
    switch (action.type) {
      case '[CARRITO] Agregar Compra':
        const existingProduct = state.find(
          (item) => item.customId === (action.payload as Compra).customId
        );
        if (existingProduct) {
          return state.map((item) => {
            if (item.customId === (action.payload as Compra).customId) {
              return { ...item, cantidad: item.cantidad + 1 };
            }
            return item;
          });
        } else {
          return [...state, { ...(action.payload as Compra), cantidad: 1 }];
        }
      case '[CARRITO] Aumentar Cantidad Compra':
        return state.map((item) => {
          if (item.customId === action.payload) {
            return { ...item, cantidad: item.cantidad + 1 };
          }
          return item;
        });
      case '[CARRITO] Disminuir Cantidad Compra':
        return state.map((item) => {
          const cant = item.cantidad - 1;
          if (item.customId === action.payload && item.cantidad > 1)
            return { ...item, cantidad: cant };
          return item;
        });
      case '[CARRITO] Eliminar Compra':
        return state.filter((compra) => compra.customId !== action.payload);
      default:
        return state;
    }
  };

  const [listaCompras, dispatch] = useReducer(comprasReducer, initialState);
  const [precioSeleccionado, setPrecioSeleccionado] = useState<number>(0);

  const actualizarPrecioSeleccionado = (precio: number) => {
    // setPrecioSeleccionado(precio);
    // console.log(`Estoy en el provider ${precioSeleccionado}`);
  };

  const agregarCompra = (compra: Compra) => {
    compra.cantidad = 1;
    const action: CarritoAction = {
      type: '[CARRITO] Agregar Compra',
      payload: compra,
    };
    dispatch(action);
    console.log(action)
    console.log(`estoy en provider${JSON.stringify(listaCompras)}`)
  };

  const aumentarCantidad = (id: string) => {
    const action = {
      type: '[CARRITO] Aumentar Cantidad Compra',
      payload: id,
    };
    dispatch(action);
  };

  const disminuirCantidad = (id: string) => {
    const action = {
      type: '[CARRITO] Disminuir Cantidad Compra',
      payload: id,
    };
    dispatch(action);
  };

  const eliminarCompra = (id: string) => {
    const action = {
      type: '[CARRITO] Eliminar Compra',
      payload: id,
    };
    dispatch(action);
  };

  const [todayFood, setTodayFood] = useState([]);

  useEffect(() => {
    fetch(`${API}/producto`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error de red - No se pudo obtener la lista de empleados");
        }
        return response.json();
      })
      .then((data) => setTodayFood(data))
      .catch((error) => {
        console.log(error);
      });
  }, []);



  const calcularTotal = (lista: any[]): number => {
    const precioTotal: number = lista.reduce(
      (total, compra) => total + compra.precio_final * compra.cantidad, 0);

    return precioTotal
  }


  const calcularDescuento = (compras: any[], efectivoChecked: boolean): number => {
    let precioTotal: number = compras.reduce(
      (total, compra) => total + compra.precio_final * compra.cantidad, 0);
    compras.forEach(element => {
      if (element.kilos === '10KG') {
        if (element.cantidad === 3) {
          precioTotal = precioTotal - 500;
        } else if (element.cantidad === 4) {
          precioTotal = precioTotal - 1000;
        } else if (element.cantidad === 5) {
          precioTotal = precioTotal - 1500;
        } else if (element.cantidad === 6) {
          precioTotal = precioTotal - 2000;
        }
      }
    });

    if (efectivoChecked) {
      console.log("Ingrese al if")
      precioTotal = precioTotal - (precioTotal * 0.10);
      console.log(precioTotal)
    }
    return precioTotal;
  };


  const contextValue: CarritoContextProps = {
    listaCompras,
    agregarCompra,
    aumentarCantidad,
    disminuirCantidad,
    eliminarCompra,
    precioSeleccionado,
    actualizarPrecioSeleccionado,
    todayFood,
    calcularDescuento,
    calcularTotal
  };

  return (
    <CarritoContext.Provider value={contextValue}>
      {children}
    </CarritoContext.Provider>
  );
};

export default CarritoProvider;
