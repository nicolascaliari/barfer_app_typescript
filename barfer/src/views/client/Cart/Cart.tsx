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
import * as constants from './consts';
import styles from './Styles';

interface FormState {
    location: string;
    postalCode: string;
}

const initialForm: FormState = {
    location: '',
    postalCode: '',
};
const Cart = () => {
    const COUNTRY = constants.COUNTRY;
    const PROVINCE = constants.PROVINCE;
    const LOCATION = constants.LOCATION;
    const TIMETABLE_CABA = constants.TIMETABLE_CABA;
    const TIMETABLE_GBA = constants.TIMETABLE_GBA;


    const { formState, onInputChange } = useForm({ initialForm });
    const [saleData, setSaleData] = useState(null);
    const carritoContext = useContext(CarritoContext);
    const { datosUsuario } = useContext(UsuarioContext)
    const { listaCompras, disminuirCantidad, aumentarCantidad, eliminarCompra, todayFood, calcularDescuento, calcularTotal } = carritoContext;
    const [direccion] = useState<string>(datosUsuario.direccion)
    const [telefono] = useState<string>(datosUsuario.telefono)

    const [efectivoChecked, setEfectivoChecked] = useState(false);
    const [transferenciaChecked, setTransferenciaChecked] = useState(false);

    const [modalVisible, setModalVisible] = useState(false);


    const cateogiaComplemento = todayFood.filter((producto) => producto.idCategory === 3);
    const [cambiarDireccion, setCambiarDireccion] = useState<boolean | null>(false);
    const [country, setCountry] = useState<string | null>(null);
    const [province, setProvince] = useState<string | null>(null);
    const [location, setLocation] = useState<string | null>(null);
    const [modalHeight, setModalHeight] = useState(300);



    let message = "";
    if (province && location) {
        const localidades = TIMETABLE_CABA.find((diaHorario) => diaHorario.provincia === province);
        const localidadesGBA = TIMETABLE_GBA.find((diaHorario) => diaHorario.provincia === province);
        if (localidades) {
            const horarios = localidades.horarios.find((horario) => horario.barrios.includes(location));

            if (horarios) {
                console.log(`Horarios de entrega para ${province} - ${location}:`);
                const diasDeEntrega = horarios.rango;
                console.log(`Entrega disponible en ${province} - ${location} en los barrios: ${diasDeEntrega}`);
                message = `Entrega disponible en ${province} - ${location} en los horarios: ${diasDeEntrega}`;
            }
            else {
                console.log(`No hay entregas disponibles en ${province} - ${location}`);
                message = `No hay entregas disponibles en ${province} - ${location}`;
            }
        }
        else if (localidadesGBA) {
            const horarios = localidadesGBA.horarios.find((horario) => horario.barrios.includes(location));

            if (horarios) {
                console.log(`Horarios de entrega para ${province} - ${location}:`);
                const diasDeEntrega = horarios.rango;
                console.log(`Entrega disponible en ${province} - ${location} en los barrios: ${diasDeEntrega}`);
                message = `Entrega disponible en ${province} - ${location} en los horarios: ${diasDeEntrega}`;
            }
            else {
                console.log(`No hay entregas disponibles en ${province} - ${location}`);
                message = `No hay entregas disponibles en ${province} - ${location}`;
            }
        }
        else {
            message = "No hay entregas disponibles en esta localidad.";
        }
    }


    const handleEfectivoChange = () => {
        setEfectivoChecked(true);
        setTransferenciaChecked(false)
        calcularDescuento(listaCompras, efectivoChecked)
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

    const handleCloseModal = () => {
        setModalVisible(!modalVisible)
        setLocation(null)
        setProvince(null)
        setCambiarDireccion(false)
        setModalHeight(300)
    }


    const handleChangeAddress = () => { }



    return (
        <ScrollView>
            {
                listaCompras.map((item, index) => (
                    <View key={index} style={styles.card_carrito}>
                        <View style={styles.container_img}>

                            <Image
                                style={styles.img_card}
                                //source={require('../../../../assets/comida.png')}
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
                calcularDescuento(listaCompras, efectivoChecked) === 0 ?
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
                                <Text>${calcularDescuento(listaCompras, efectivoChecked)}</Text>
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
                                            onPress={handleCloseModal}>
                                            <FontAwesome name="close" size={27} color="black" style={styles.closeIcon} />
                                        </Pressable>

                                        <Text>Envio a : {direccion}</Text>

                                        <TouchableOpacity onPress={() => {
                                            setCambiarDireccion(true)
                                            setModalHeight(600);
                                        }}>
                                            <Text>Cambiar direccion</Text>
                                        </TouchableOpacity>


                                        <Text>{message}</Text>

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



                                                    <SelectDropdown
                                                        defaultButtonText="Localidad"
                                                        data={LOCATION}
                                                        onSelect={(selectedItem, index) => {
                                                            console.log(selectedItem, index);
                                                            setLocation(selectedItem)
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
                                                <Text style={styles.buttonText}>COMPRAR (${calcularDescuento(listaCompras, efectivoChecked)})</Text>
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


export default Cart;
