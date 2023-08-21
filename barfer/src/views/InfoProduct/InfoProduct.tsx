import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from "react-native"
import { FC } from "react";
import React, { useState, useContext, useEffect } from 'react';
import { Product } from "../../types";
import ProductItem from "../../components/ProductoItem/ProductoItem";
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParams } from "../../types";
import { useRoute } from '@react-navigation/native'
import CarritoContext from "../../context/CarritoContext";


type ProductProps = {
    foods: Product[];
}

const InfoProduct = () => {
    const [kilosSelected, setKilosSelected] = useState('');
    const [precioSelected, setPrecioSelected] = useState(0);
    const [isCincoKilosSelected, setIsCincoKilosSelected] = useState(true);
    const { params: { idproducto, nombre, descripcion, precio_cincokg, precio_diezkg, img, idCategory } } = useRoute<NativeStackScreenProps<RootStackParams, 'InfoProduct'>['route']>();



    const handleSelectCincoKilos = () => {
        setKilosSelected('5KG')
        setPrecioSelected(precio_cincokg);
        actualizarPrecioSeleccionado(precioSelected);
        console.log(precioSelected) // Actualizar el precio seleccionado en el contexto
        setIsCincoKilosSelected(true);
    };



    const handleSelectDiezKilos = () => {
        setKilosSelected('10KG')
        setPrecioSelected(precio_diezkg);
        actualizarPrecioSeleccionado(precioSelected);
        console.log(precioSelected)// Actualizar el precio seleccionado en el contexto
        setIsCincoKilosSelected(false);
    };

    const carritoContext = useContext(CarritoContext);

    // Accede a las funciones y datos del contexto
    const { agregarCompra, actualizarPrecioSeleccionado } = carritoContext;


    const handleAgregar = () => {
        const selectedPrecio = isCincoKilosSelected ? precio_cincokg : precio_diezkg;
        const nuevaCompra = {
            customId: idproducto.toString() + precioSelected.toString(), 
            cantidad: precioSelected,
            precio: selectedPrecio,
            nombre: nombre,
            precio_cincokg: precio_cincokg,
            precio_diezkg: precio_diezkg,
            img: img,
            precio_final: selectedPrecio,
            kilos:kilosSelected,
            
        };
        console.log(`estoy en info${JSON.stringify(nuevaCompra)}`)
        agregarCompra(nuevaCompra);
    };

    return (
        <View style={styles.container_producto_info}>
            <View style={styles.card}>
                <Image
                    style={styles.img_card}
                    source={{ uri: `http://10.0.2.2:3001/images/${img}` }}
                />
                <Text style={styles.nombre_producto}>{nombre}</Text>
                <View style={styles.contenedor_precios}>
                    <Text style={styles.precio_cincokg_producto}>{precio_cincokg}</Text>
                    <Text style={styles.precio_cincokg_producto}>-</Text>
                    <Text style={styles.precio_diezkg_producto}>{precio_diezkg}</Text>
                </View>
                <TouchableOpacity style={styles.btn_agregar} onPress={handleAgregar}>
                    <Text>Agregar</Text>
                </TouchableOpacity>
            </View>

            <Text>Elija el kilo</Text>
            <View style={styles.container_btn}>
                <TouchableOpacity
                    onPress={handleSelectCincoKilos}
                    style={[styles.button, isCincoKilosSelected && styles.buttonSelected]}
                >
                    <Text style={styles.buttonText}>5 Kilos</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={handleSelectDiezKilos}
                    style={[styles.button, !isCincoKilosSelected && styles.buttonSelected]}
                >
                    <Text style={styles.buttonText}>10 Kilos</Text>
                </TouchableOpacity>
            </View>

            <Text style={styles.description }>Descripcion: 🍗50% de huesos carnosos de pollo / 🥩30% de carne de pollo / 🥓10% de vísceras / 🥬🥕10% de vegetales.
            </Text>

            <Text style={styles.price}>El precio es: {precioSelected} </Text>


        </View>
    )
}

const styles = StyleSheet.create({
    container_producto_info: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    card: {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#ffffff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 4,
        height: 250,
        width: 190,
        borderRadius: 30,
        marginTop: 30,
        margin: 10,
        padding: 10,
    },
    img_card: {
        width: 120,
        height: 120,
        position: 'relative',
        bottom: 45,
        left: 27,
    },
    nombre_producto: {
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
        position: 'relative',
        bottom: 30,
    },
    precio_cincokg_producto: {
        fontSize: 18,
        color: '#006AE3',
        margin: 2,
        fontWeight: "bold"
    },
    precio_diezkg_producto: {
        fontSize: 18,
        color: '#006AE3',
        margin: 2,
        fontWeight: "bold"
    },
    contenedor_precios: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        position: 'relative',
        bottom: 20,
    },
    container_btn: {
        flexDirection: 'row', // Pone los botones en una fila horizontal
        marginTop: 10,
        width: 200
    },
    button: {
        flex: 1, // Divide el espacio disponible en partes iguales para los botones
        paddingVertical: 5,
        paddingHorizontal: 10,
        backgroundColor: 'grey',
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 5,
    },
    buttonSelected: {
        backgroundColor: '#006AE3', // Cambia el color al seleccionar el botón
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
    btn_agregar: {
        padding: 7,
        backgroundColor: 'grey',
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 5,
    },
    price: {
        fontSize: 17,
        fontWeight: "bold"
    },
    description: {
        fontSize: 17,
        fontWeight: "bold",
        marginVertical: 10,
        padding:20
    }

})

export default InfoProduct;