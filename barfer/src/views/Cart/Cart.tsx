import React, { useContext, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import CarritoContext from '../../context/CarritoContext';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AntDesign } from '@expo/vector-icons';



const Cart = () => {
    const carritoContext = useContext(CarritoContext);
    const { listaCompras, disminuirCantidad, aumentarCantidad, precioSeleccionado, eliminarCompra } = carritoContext;
    const calcularTotal = () => {
        return parseFloat(listaCompras.reduce((total, item) => total + item.precio_final * item.cantidad, 0).toFixed(2));
    }
    useEffect(() => {
        console.log('Lista de compras actualizada:', listaCompras);
    }, [listaCompras]);
    console.log(listaCompras)
    return (
        <>
            {
                listaCompras.map((item, index) => (
                    <View key={index} style={styles.card_carrito}>
                        <View style={styles.container_img}>

                            <Image
                                style={styles.img_card}
                                source={{ uri: `http://10.0.2.2:3001/images/${item.img}` }}
                                onError={() => console.log('Error al cargar la imagen')}
                            />

                        </View>

                        <View>
                            <Text style={styles.nombre_producto}>{item.nombre}</Text>
                            <Text style={styles.precio}>Precios: {item.precio_final}</Text>
                        </View>



                        <View style={styles.container_body}>
                            <Text style={styles.cantidad_txt}>Cantidad:</Text>
                            <TouchableOpacity style={styles.btn} onPress={() => disminuirCantidad(item.customId)}>
                                <AntDesign name="minuscircle" size={22} color="black" />
                            </TouchableOpacity>
                            <Text style={styles.cantidad_num}>{item.cantidad}</Text>
                            <TouchableOpacity style={styles.btn} onPress={() => aumentarCantidad(item.customId)}>
                                <AntDesign name="pluscircle" size={22} color="black" />
                            </TouchableOpacity>


                            <TouchableOpacity
                                onPress={() => eliminarCompra(item.customId)}
                                style={styles.eliminarButton}>
                                <MaterialCommunityIcons name="delete" size={24} color="black" />
                            </TouchableOpacity>
                        </View>
                    </View>


                ))
            }

            {
                <Text style={styles.precio}>
                    {calcularTotal() === 0 ? "No tienes productos cargados" : `Total: ${calcularTotal()}` }
                </Text>
            }
        </>
    )
}




const styles = StyleSheet.create({
    container_flat: {
        marginTop: 100,
        height: 900
    },
    card_carrito: {
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: '#ffffff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 4,
        height: 120,
        width: 330,
        borderRadius: 30,
        marginTop: 30,
        margin: 10,
    },
    container_img: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    img_card: {
        width: 100,
        height: 100,

    },
    container_body: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-end',
        position: 'relative',
        right: 100,
        padding: 10,
    },
    nombre_producto: {
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',

    },
    cantidad_txt: {
        fontSize: 17,
        margin: 5,
        marginRight: 10
    },
    cantidad_num: {
        fontSize: 17,
        margin: 5
    },
    btn: {
        margin: 5
    },
    eliminarButton: {
        alignSelf: 'center',
        justifyContent: 'center'
    },
    precio: {
        fontSize: 16,
        marginVertical:10,
        fontWeight:"500",
        textAlign:'center'
    }

})

export default Cart;
