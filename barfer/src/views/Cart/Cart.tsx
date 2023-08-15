import React, { useContext, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Linking } from 'react-native';
import CarritoContext from '../../context/CarritoContext';
import UsuarioContext from '../../context/UsuarioContext';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AntDesign } from '@expo/vector-icons';;
import axios from 'axios';
import { useState } from 'react';



const Cart = () => {
    const [saleData, setSaleData] = useState(null);
    const carritoContext = useContext(CarritoContext);
    const { datosUsuario } = useContext(UsuarioContext)
    const { listaCompras, disminuirCantidad, aumentarCantidad, precioSeleccionado, eliminarCompra } = carritoContext;
    const [nombre, setNombre] = useState<string>(datosUsuario.nombre)
    const [direccion, setDireccion] = useState<string>(datosUsuario.direccion)
    const [telefono, setTelefono] = useState<string>(datosUsuario.telefono)


    const calcularTotal = () => {
        return parseFloat(listaCompras.reduce((total, item) => total + item.precio_final * item.cantidad, 0).toFixed(2));
    }



    useEffect(() => {
        console.log(nombre)
        console.log(direccion)
        console.log(telefono)
    }, []);


    const generarPreferencia = async () => {
        try {
            const accessToken = 'TEST-3065058539253417-030805-b69b645c29502085d126e3de7d038d3f-477333440'; // Reemplaza con tu token de acceso
            const url = `https://api.mercadopago.com/checkout/preferences?access_token=${accessToken}`;

            const nombreProductos = listaCompras.map((item) => `${item.nombre} - ${item.cantidad} - ${item.kilos}`);
            const nombreUsuario = `${datosUsuario.nombre} ${datosUsuario.apellido}`

            const data = {
                items: [
                    {
                        title: nombreProductos.join(', '), // Une los nombres con comas y espacio
                        description: 'Multicolor Item',
                        quantity: 1,
                        currency_id: 'ARS',
                        unit_price: 1.00,
                    },
                ],
                payer: {
                    email: 'payer@email.com',
                    name: nombreUsuario, 
                    direccion:direccion,
                    telefono:telefono,
                },
            };

            const response = await axios.post(url, data);
            const initPoint = response.data.init_point;

            // Abre la aplicación de Mercado Pago si está instalada
            Linking.openURL(initPoint)
                .catch((error) => {
                    console.error('Error al abrir la aplicación de Mercado Pago:', error);
                });

            // Llama al backend para notificar sobre el pago exitoso
            const backendResponse = await axios.post('http://10.0.2.2:3001/webhook', {
                status: 'approved', // Simplemente asumiendo que 'approved' significa un pago exitoso
                items: data.items,
                payer: data.payer, // Envía los datos del pagador, incluyendo el nombre de usuario
            });

            // Actualiza el estado con los datos de la venta guardados en el backend
            setSaleData(backendResponse.data);
        } catch (error) {
            console.error('Error en la solicitud:', error);
        }
    };

    console.log(saleData)

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
                            <Text style={styles.nombre_producto}>{item.nombre} {item.kilos}</Text>
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
                    {calcularTotal() === 0 ? "No tienes productos cargados" : `Total: ${calcularTotal()}`}
                </Text>
            }
            <TouchableOpacity style={styles.button} onPress={generarPreferencia}>
                <Text style={styles.buttonText}>COMPRAR</Text>
            </TouchableOpacity>
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
        marginVertical: 10,
        fontWeight: "500",
        textAlign: 'center'
    },
    button: {
        paddingVertical: 5,
        paddingHorizontal: 10,
        backgroundColor: '#006AE3',
        borderRadius: 8,
        alignItems: 'center',
        alignSelf: "center",
        justifyContent: 'center',
        marginRight: 5,
        width: 180
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },

})

export default Cart;
