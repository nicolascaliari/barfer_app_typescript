import React, { useContext, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Linking, FlatList, ScrollView, Modal, Pressable } from 'react-native';
import UsuarioContext from '../../../context/UsuarioContext';
import CarritoContext from '../../../context/CarritoContext';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AntDesign } from '@expo/vector-icons';;
import axios from 'axios';
import { useState } from 'react';
import ProductItem from '../../../components/ProductoItem/ProductoItem';
import { Product } from "../../../types";
import CheckBox from 'react-native-check-box'
import { FontAwesome } from '@expo/vector-icons';
import SelectDropdown from 'react-native-select-dropdown'
import { useForm } from "../../../hooks/useFormAdress";



interface FormState {
    location: string;
    postalCode: string;
}

const initialForm: FormState = {
    location: '',
    postalCode: '',
};
const Cart = () => {
    const { formState, onInputChange } = useForm({ initialForm });
    const [saleData, setSaleData] = useState(null);
    const carritoContext = useContext(CarritoContext);
    const { datosUsuario } = useContext(UsuarioContext)
    const { listaCompras, disminuirCantidad, aumentarCantidad, eliminarCompra } = carritoContext;
    const [direccion] = useState<string>(datosUsuario.direccion)
    const [telefono] = useState<string>(datosUsuario.telefono)
    const [todayFood, setTodayFood] = useState<Product[]>([]);

    const [efectivoChecked, setEfectivoChecked] = useState(false);
    const [transferenciaChecked, setTransferenciaChecked] = useState(false);

    const [modalVisible, setModalVisible] = useState(false);


    const cateogiaComplemento = todayFood.filter((producto) => producto.idCategory === 3);



    const COUNTRY = ["argentina"];
    const PROVINCE = ["Buenos Aires", "Ciudad Autonoma de Buenos Aires","Catamarca",
    "Chaco","Chubut","Cordoba","Corrientes","Entre Rios","Formosa","Jujuy","La Pampa",
    "La rioja","Mendoza","Misiones","Neuquen","Rio Negro", "Salta","San Juan","San Luis",
    "Santiago del Estero", "Tierra del Fuego", "Tucuman"]
    const [cambiarDireccion, setCambiarDireccion] = useState<boolean | null>(false);
    const [country, setCountry] = useState<string | null>(null);
    const [province, setProvince] = useState<string | null>(null);
    const [location, setLocation] = useState<string | null>(null);
    const [postalCode, setPostalCode] = useState<string | null>(null);
    const [modalHeight, setModalHeight] = useState(300);


    useEffect(() => {
        fetch('http://10.0.2.2:3001/producto')
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


    const calcularDescuento = (compras: any[]): number => {
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

    const handleEfectivoChange = () => {
        setEfectivoChecked(true);
        setTransferenciaChecked(false)
        calcularDescuento(listaCompras)
    };

    const handleTransferenciaChange = () => {
        setTransferenciaChecked(true);
        setEfectivoChecked(false);
    };

    const generarPreferencia = async () => {
        try {
            const accessToken = 'TEST-3065058539253417-030805-b69b645c29502085d126e3de7d038d3f-477333440'; // Reemplaza con tu token de acceso
            const url = `https://api.mercadopago.com/checkout/preferences?access_token=${accessToken}`;

            const nombreProductos = listaCompras.map((item) => `${item.nombre} - ${item.cantidad} - ${item.kilos}`);
            const nombreUsuario = `${datosUsuario.nombre} ${datosUsuario.apellido}`

            const data = {
                items: [
                    {
                        title: nombreProductos.join(', '),
                        description: 'Multicolor Item',
                        quantity: 1,
                        currency_id: 'ARS',
                        unit_price: 1.00,
                    },
                ],
                payer: {
                    email: 'payer@email.com',
                    name: nombreUsuario,
                    direccion: direccion,
                    telefono: telefono,
                },
            };

            const response = await axios.post(url, data);
            const initPoint = response.data.init_point;

            Linking.openURL(initPoint)
                .catch((error) => {
                    console.error('Error al abrir la aplicación de Mercado Pago:', error);
                });

            const backendResponse = await axios.post('http://10.0.2.2:3001/webhook', {
                status: 'approved',
                items: data.items,
                payer: data.payer,
            });

            setSaleData(backendResponse.data);
        } catch (error) {
            console.error('Error en la solicitud:', error);
        }
    };


    const handleChangeAddress = () => { }



    return (
        <ScrollView>
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


                        <View style={styles.leftContainer}>

                            <View style={styles.textsContainer}>
                                <Text style={styles.nombre_producto}>{item.nombre} {item.kilos}</Text>
                                <Text style={styles.precio}>${item.precio_final}</Text>

                            </View>


                            <View style={styles.bottomContainer}>


                                <View style={styles.container_body}>
                                    <TouchableOpacity style={styles.btn} onPress={() => disminuirCantidad(item.customId)}>
                                        <AntDesign name="minuscircle" size={22} color="black" />
                                    </TouchableOpacity>
                                    <Text style={styles.cantidad_num}>{item.cantidad}</Text>
                                    <TouchableOpacity style={styles.btn} onPress={() => aumentarCantidad(item.customId)}>
                                        <AntDesign name="pluscircle" size={22} color="black" />
                                    </TouchableOpacity>

                                </View>
                                <View style={styles.deleteContainer}>
                                    <TouchableOpacity
                                        onPress={() => eliminarCompra(item.customId)}
                                        style={styles.eliminarButton}>
                                        <MaterialCommunityIcons name="delete" size={24} color="black" />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                ))
            }

            {
                calcularDescuento(listaCompras) === 0 ?
                    <Text style={styles.precioTotal}>
                        No hay productos en el carrito
                    </Text> :
                    <View>
                        <Text style={styles.txtInformation}>
                            Informacion
                        </Text>

                        <View style={styles.subtotalContainer}>
                            <View style={styles.totalTextContainer}>
                                <Text>Subtotal</Text>
                            </View>
                            <View style={styles.totalPriceContainer}>
                                <Text>${calcularTotal(listaCompras)}</Text>
                            </View>
                        </View>


                        <View style={styles.subtotalContainer}>
                            <View style={styles.totalTextContainer}>
                                <Text>Total</Text>
                            </View>
                            <View style={styles.totalPriceContainer}>
                                <Text>${calcularDescuento(listaCompras)}</Text>
                            </View>
                        </View>

                        <View style={styles.subtotalContainer}>
                            <View style={styles.totalTextContainer}>
                                <Text>Envio</Text>
                            </View>
                            <View style={styles.totalPriceContainer}>
                                <Text>Envio gratuito</Text>
                            </View>
                        </View>


                        <View style={styles.checkBoxContainer}>
                            <CheckBox
                                style={{}}
                                onClick={handleEfectivoChange}
                                isChecked={efectivoChecked}
                                leftText={"Efectivo (10% descuento)"}
                            />
                            <CheckBox
                                style={{}}
                                onClick={handleTransferenciaChange}
                                isChecked={transferenciaChecked}
                                leftText={"Transferencia"}
                            />
                        </View>



                        <Text style={styles.title}>Añadir</Text>
                        <FlatList
                            data={cateogiaComplemento}
                            renderItem={({ item, index }) => (
                                <ProductItem
                                    key={`today-meal-item-${item.nombre}`}
                                    {...item}
                                    itemPosition={index}
                                />
                            )}
                            keyExtractor={(item, index) => index.toString()}
                            horizontal={true}
                        />

                        <View style={styles.centeredView}>
                            <Modal
                                animationType="slide"
                                transparent={true}
                                visible={modalVisible}
                                onRequestClose={() => {
                                    setModalVisible(!modalVisible);
                                }}>

                                <View style={[styles.centeredView, { height: modalHeight }]}>

                                    <View style={[styles.modalView, { height: modalHeight }]}>
                                        <Text style={styles.modalText}>Ya casi terminas!</Text>
                                        <Pressable
                                            style={[styles.button, styles.buttonClose]}
                                            onPress={() => setModalVisible(!modalVisible)}>
                                            <FontAwesome name="close" size={24} color="black" style={styles.closeIcon} />
                                        </Pressable>

                                        <Text>Envio a : {direccion}</Text>

                                        <TouchableOpacity onPress={() => {
                                            setCambiarDireccion(true)
                                            setModalHeight(600);
                                        }}>
                                            <Text>Cambiar direccion</Text>
                                        </TouchableOpacity>

                                        {
                                            cambiarDireccion ?


                                                <View style={styles.form}>

                                                    <Text style={styles.formText}>Ingrese su nueva direccion</Text>

                                                    <SelectDropdown
                                                        defaultButtonText="Pais"
                                                        data={COUNTRY}
                                                        onSelect={(selectedItem, index) => {
                                                            console.log(selectedItem, index);
                                                            setCountry(selectedItem)
                                                        }}
                                                        buttonTextAfterSelection={(selectedItem, index) => {
                                                            return selectedItem;
                                                        }}
                                                        rowTextForSelection={(item, index) => {
                                                            return item;
                                                        }}

                                                        buttonStyle={styles.dropdownStyle}
                                                        dropdownStyle={styles.dropdownOptionsStyle}
                                                    />


                                                    <SelectDropdown
                                                        defaultButtonText="Provincia"
                                                        data={PROVINCE}
                                                        onSelect={(selectedItem, index) => {
                                                            console.log(selectedItem, index);
                                                            setProvince(selectedItem)
                                                        }}
                                                        buttonTextAfterSelection={(selectedItem, index) => {
                                                            return selectedItem;
                                                        }}
                                                        rowTextForSelection={(item, index) => {
                                                            return item;
                                                        }}

                                                        buttonStyle={styles.dropdownStyle}
                                                        dropdownStyle={styles.dropdownOptionsStyle}
                                                    />



                                                    <View style={styles.formInput}>
                                                        <TextInput
                                                            style={styles.formTextInput}
                                                            value={formState.location}
                                                            onChangeText={(text) => onInputChange("location", text)} // Corregir aquí
                                                            // Corregir aquí
                                                            placeholder="Ingrese tu email de usuario"
                                                        />
                                                    </View>
                                                    <View style={styles.formInput}>
                                                        <TextInput
                                                            style={styles.formTextInput}
                                                            value={formState.postalCode}
                                                            onChangeText={(text) => onInputChange("postalCode", text)} // Corregir aquí
                                                            secureTextEntry
                                                            placeholder="Ingrese tu password"
                                                        />
                                                    </View>
                                                    <View style={{ marginTop: 20, flexDirection: 'row', justifyContent: 'space-between' }}>
                                                        <TouchableOpacity style={styles.roundedButton} onPress={handleChangeAddress}>
                                                            <Text style={styles.textButton}>Confirmar</Text>
                                                        </TouchableOpacity>


                                                        <TouchableOpacity style={styles.roundedButton}
                                                            onPress={() => {
                                                                setCambiarDireccion(false)
                                                                setModalHeight(300);
                                                            }}>
                                                            <Text style={styles.textButton}>Cancelar</Text>
                                                        </TouchableOpacity>
                                                    </View>

                                                </View>
                                                : null
                                        }

                                        <View style={styles.btnComprarContainer}>
                                            <TouchableOpacity style={styles.buttonPay} onPress={generarPreferencia}>
                                                <Text style={styles.buttonText}>COMPRAR (${calcularDescuento(listaCompras)})</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>

                                </View>

                            </Modal>
                            <Pressable
                                style={[styles.button, styles.buttonOpen]}
                                onPress={() => setModalVisible(true)}>
                                <Text style={styles.textStyle}>Ir a finalizar la compra</Text>
                            </Pressable>
                        </View>
                    </View>
            }


        </ScrollView>
    )
}




const styles = StyleSheet.create({
    closeIcon: {
        position: 'absolute',
        bottom: 76,
        left: 230,
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
        width: '95%',
        borderRadius: 30,
        marginTop: 30,
        margin: 10,
    },
    leftContainer: {
        display: 'flex',
        flexDirection: 'column'
    },
    bottomContainer: {
        flexDirection: "row",
        paddingVertical: 15
    },
    textsContainer: {
        flexDirection: 'column',
        margin: 0,
        padding: 0
    },
    container_img: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    deleteContainer: {
        justifyContent: 'center',
        alignSelf: 'center',
        paddingLeft: 80
    },
    img_card: {
        width: 100,
        height: 100,
    },
    container_body: {
        flexDirection: 'row',
        paddingHorizontal: 10
    },
    nombre_producto: {
        textAlign: 'left',
        fontSize: 15,
        fontWeight: 'bold',
        paddingVertical: 7

    },
    eliminarButton: {
        padding: 3,
        alignSelf: 'flex-end'
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
    precio: {
        fontSize: 18,
        marginVertical: 5,
        fontWeight: "500",
        textAlign: 'left'
    },
    precioTotal: {
        fontSize: 18,
        marginVertical: 5,
        fontWeight: "500",
        textAlign: 'center'
    },
    buttonPay: {
        padding: 5,
        backgroundColor: '#3662FF',
        borderRadius: 8,
        alignItems: 'center',
        alignSelf: "center",
        justifyContent: 'center',
        marginRight: 5,
        width: 180,
        marginBottom: 10
    },
    button: {
        padding: 15,
        backgroundColor: '#3662FF',
        borderRadius: 8,
        alignItems: 'center',
        alignSelf: "center",
        justifyContent: 'center',
        marginRight: 5,
        width: 180,
        marginBottom: 30
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
    txtInformation: {
        fontSize: 20,
        fontWeight: '700',
        padding: 10
    },
    subtotalContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
    },
    totalTextContainer: {
        flex: 1,
    },
    totalPriceContainer: {
        flex: 1,
        alignItems: 'flex-end',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        padding: 10
    },
    checkBoxContainer: {
        flex: 1,
        padding: 10

    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        height: 300,
        width: 350,
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    buttonOpen: {
        backgroundColor: '#3662FF',
    },
    buttonClose: {
        backgroundColor: 'transparent',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 16,
        fontSize: 18,
        textAlign: 'center',
        fontWeight: '600'
    },
    dropdownStyle: {
        backgroundColor: "#FFFFFF",
        borderBottomWidth: 1,
        borderBottomColor: "#AAAAAA",
        borderRadius: 30,
        paddingHorizontal: 12,
        alignSelf: 'center',
    },
    dropdownOptionsStyle: {
        backgroundColor: "#fff",
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 8,
        marginTop: -1,
        width: "50%", // Puedes ajustar el ancho del dropdownOptions
    },
    label: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 8,
    },
    input: {
        width: "100%",
        height: 40,
        borderWidth: 1,
        borderColor: "gray",
        marginBottom: 16,
        paddingHorizontal: 8,
    },
    imageBackground: {
        width: '100%',
        height: '100%',
        opacity: 0.7,
        bottom: '20%'
    },
    form: {
        width: '100%',
        height: '40%',
        backgroundColor: 'white',
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        padding: 40
    },
    formText: {
        fontWeight: 'bold',
        fontSize: 16
    },
    formIcon: {
        width: 25,
        height: 25,
        marginTop: 5
    },
    formInput: {
        flexDirection: 'row',
        marginTop: 30,
    },
    formTextInput: {
        flex: 1,
        borderBottomWidth: 1,
        borderBottomColor: '#AAAAAA',
        marginLeft: 15
    },
    roundedButton: {
        height: 30,
    },
    textButton: {
        color: 'black',
        fontWeight: 'bold'
    },
    btnComprarContainer: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        backgroundColor: 'white',
    }
})

export default Cart;
