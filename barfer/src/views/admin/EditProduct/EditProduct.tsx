import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, TextInput } from "react-native"
import React, { useState, useContext, useEffect } from 'react';
import { Product } from "../../../types";
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParams } from "../../../types";
import { useRoute } from '@react-navigation/native'
import CarritoContext from "../../../context/CarritoContext";
import RenderHtml from 'react-native-render-html';
import { useWindowDimensions } from 'react-native';
import { API } from '../../../config/config';


type ProductProps = {
    foods: Product[];
}

const EditProduct = () => {
    const { width } = useWindowDimensions();
    const [kilosSelected, setKilosSelected] = useState('');
    const [isCincoKilosSelected, setIsCincoKilosSelected] = useState(true);
    const { params: { idproducto, nombre, descripcion, precio_cincokg, precio_diezkg, img, idCategory, imgInfo } } = useRoute<NativeStackScreenProps<RootStackParams, 'InfoProduct'>['route']>();
    const [precioSelected, setPrecioSelected] = useState(precio_cincokg);



    const [precioInput, setPrecioInput] = useState(precioSelected.toString()); // Agrega esta línea

    const selectedPrecio = parseFloat(precioInput);



    const source = {
        html: `<div style="font-size: 18px; padding: 0 10px; font-weight: 500;">
          ${descripcion.split('\n').map((sentence, index) => `<p style="margin-bottom: 5px;">${sentence}</p>`).join('')}
        </div>`
    };




    const handleSelectCincoKilos = () => {
        setKilosSelected('5KG')
        setPrecioInput(precio_cincokg.toString());
        actualizarPrecioSeleccionado(precioSelected);
        setIsCincoKilosSelected(true);
    };



    const handleSelectDiezKilos = () => {
        setKilosSelected('10KG')
        setPrecioInput(precio_diezkg.toString());
        actualizarPrecioSeleccionado(precioSelected);
        setIsCincoKilosSelected(false);
    };

    const carritoContext = useContext(CarritoContext);

    const { agregarCompra, actualizarPrecioSeleccionado } = carritoContext;


    const handleAgregar = () => {
        const selectedPrecio = isCincoKilosSelected ? precio_cincokg : precio_diezkg;
        const nuevaCompra = {
            idproducto: idproducto,
            descripcion: '',
            customId: idproducto.toString() + precioSelected.toString(),
            cantidad: precioSelected,
            nombre: nombre,
            precio_cincokg: precio_cincokg,
            precio_diezkg: precio_diezkg,
            img: img,
            precio_final: selectedPrecio,
            kilos: kilosSelected,
            idCategory: idCategory,
            imgInfo: imgInfo
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
                        source={{ uri: `${API}/images/${imgInfo}` }}
                    />
                    <View style={styles.textContainer}>
                        <Text style={styles.nombre_producto}>{nombre}</Text>
                    </View>
                </View>

                <View style={styles.priceContainer}>
                    <TextInput
                        style={styles.precioInput}
                        value={precioInput}
                        onChangeText={(text) => setPrecioInput(text)}
                        keyboardType="numeric"
                    />
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
                    <Text style={styles.buttonText}>Modificar</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container_producto_info: {
        display: 'flex',
        marginTop: -14
    },
    card: {
        height: 240,

    },
    precioInput: {
        fontSize: 20,
        fontWeight: "bold",
        borderWidth: 1,
        borderColor: "#006AE3",
        borderRadius: 8,
        paddingHorizontal: 10,
        marginBottom: 10,
        marginTop: 5,
    },
    img_card: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
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
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 8,
    },
    container_btn: {
        flexDirection: 'row',
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
        width: 160,
        textAlign: 'center'
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
    descriptionTitleBlack: {
        fontSize: 16,
        fontWeight: 'bold',
        padding: 10,
    },
    txtDescription: {
        fontSize: 16,
        textAlign: 'left',
        padding: 10,
        fontWeight: '400'
    },
    descriptionContainer: {
        height: 170,
        width: 360,
        borderRadius: 30,
        marginBottom: 50,
        marginHorizontal: 20,

    },
    descriptionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        padding: 10,
        marginBottom: -10
    }

})

export default EditProduct;