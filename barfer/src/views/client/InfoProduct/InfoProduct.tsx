import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from "react-native"
import React, { useState, useContext, useEffect } from 'react';
import { Product } from "../../../types";
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParams } from "../../../types";
import { useRoute } from '@react-navigation/native'
import CarritoContext from "../../../context/CarritoContext";
import RenderHtml from 'react-native-render-html';
import { useWindowDimensions } from 'react-native';

type ProductProps = {
    foods: Product[];
}

const InfoProduct = () => {
    const { width } = useWindowDimensions();
    const [kilosSelected, setKilosSelected] = useState('');
    const [isCincoKilosSelected, setIsCincoKilosSelected] = useState(true);
    const { params: { idproducto, nombre, descripcion, precio_cincokg, precio_diezkg, img, idCategory } } = useRoute<NativeStackScreenProps<RootStackParams, 'InfoProduct'>['route']>();
    const [precioSelected, setPrecioSelected] = useState(precio_cincokg);




    const source = {
        html: `<div style="font-size: 18px; padding: 0 10px; font-weight: 500;">
          ${descripcion.split('\n').map((sentence, index) => `<p style="margin-bottom: 5px;">${sentence}</p>`).join('')}
        </div>`
    };




    const handleSelectCincoKilos = () => {
        setKilosSelected('5KG')
        setPrecioSelected(precio_cincokg);
        actualizarPrecioSeleccionado(precioSelected);
        setIsCincoKilosSelected(true);
    };



    const handleSelectDiezKilos = () => {
        setKilosSelected('10KG')
        setPrecioSelected(precio_diezkg);
        actualizarPrecioSeleccionado(precioSelected);
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
            kilos: kilosSelected,

        };
        console.log(`estoy en info${JSON.stringify(nuevaCompra)}`)
        agregarCompra(nuevaCompra);
    };


    return (
        <ScrollView>
            <View style={styles.container_producto_info}>
                <View style={styles.card}>
                    <Image
                        style={styles.img_card}
                        source={require('../../../../assets/comida2.png')}
                    />
                    <View style={styles.textContainer}>
                        <Text style={styles.nombre_producto}>{nombre}</Text>
                        {/* Otros elementos de texto que desees agregar */}
                    </View>
                </View>
                {/* 
            <View style={styles.contenedor_precios}>
                    <Text style={styles.precio_cincokg_producto}>{precio_cincokg}</Text>
                    <Text style={styles.precio_cincokg_producto}>-</Text>
                    <Text style={styles.precio_diezkg_producto}>{precio_diezkg}</Text>
                </View> */}
                <View style={styles.priceContainer}>
                    <Text style={styles.price}>${precioSelected} </Text>
                </View>


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

                <TouchableOpacity style={styles.btn_agregar} onPress={handleAgregar}>
                    <Text style={styles.buttonText}>Agregar al carrito</Text>
                </TouchableOpacity>


                <View style={styles.descriptionContainer}>
                    <Text style={styles.descriptionTitle}>Descripcion</Text>
                    <RenderHtml
                        contentWidth={width}
                        source={source}
                        enableExperimentalMarginCollapsing={true}
                    />
                </View>


                <View style={styles.descriptionContainer}>
                    <Text style={styles.descriptionTitle}>Descuentos</Text>

                    <Text style={styles.descriptionTitleBlack}>Descuento por Metodo de Pago: <Text style={styles.txtDescription}>10% de descuento en efectivo</Text></Text>

                    <Text style={styles.descriptionTitleBlack}>Descuento por cantidad: <Text style={styles.txtDescription}>Si compras 3 Box de 10kg (del mismo tipo), se te suman $500 de descuento extra, si compras 4, otros $500, y asi sucesivamente (ej: comprando 5 Box perro Pollo de 10kg, tenes $1500 de descuento)</Text></Text>
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container_producto_info: {
        display: 'flex',
    },
    card: {
        flexDirection: 'column',
        backgroundColor: '#ffffff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 4,
        width: '100%',
        height: 200,
        borderRadius: 30,
    },
    img_card: {
        width: '100%',
        height: 200,
    },
    textContainer: {
        display: 'flex',
        position: 'absolute',
        bottom: 0,
        width: '100%',
        paddingVertical: 10,
        paddingHorizontal: 10,
        alignItems: 'flex-start',

    },
    nombre_producto: {
        fontSize: 19,
        fontWeight: 'bold',
        color: '#fff',
    },
    container_btn: {
        flexDirection: 'row', // Pone los botones en una fila horizontal
        marginTop: 30,
        width: '100%',
        justifyContent: 'space-evenly',
        alignContent: 'center',
    },
    button: {
        paddingVertical: 3,
        paddingHorizontal: 10,
        backgroundColor: 'grey',
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        width: 120
    },
    buttonSelected: {
        backgroundColor: '#006AE3', // Cambia el color al seleccionar el botón
    },
    buttonText: {
        color: 'white',
        fontSize: 17,
    },
    btn_agregar: {
        display: 'flex',
        padding: 7,
        backgroundColor: '#006AE3',
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 5,
        width: 330,
        marginTop: 30,
        alignSelf: 'center'
    },
    priceContainer: {
        display: "flex",
        alignItems: 'flex-start',
        marginTop: 15,
        marginHorizontal: 20
    },
    price: {
        fontSize: 20,
        fontWeight: "bold",
    },
    description: {
        fontSize: 17,
        fontWeight: "bold",
        marginVertical: 10,
        padding: 20
    },
    descriptionTitleBlack:{
        fontSize:16,
        fontWeight:'bold',
        padding: 10,
    },
    txtDescription: {
        fontSize: 16,
        textAlign: 'left',
        padding: 10,
        fontWeight:'400'
    },
    descriptionContainer: {
        height: 170,
        width: 360,
        borderRadius: 30,
        marginBottom:50,
        marginHorizontal: 20,

    },
    descriptionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        padding: 10,
        marginBottom: -10
    }

})

export default InfoProduct;