import { View, StyleSheet, TouchableOpacity, Text } from "react-native"
import React, { useCallback, useState, useEffect } from 'react';
import { Product } from "../../../types";
import Header from "../../../components/Header/Header";
import Calculator from "../Calculator/Calculator";
import Deliveries from "../deliveries/Deliveries";
import InfoProduct from "../InfoProduct/InfoProduct";
import Products from "../Products/Products";
import { API } from '../../../config/config';



const Home = () => {

    useEffect(() => {
        fetch(`${API}/producto`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Error de red - No se pudo obtener la lista de empleados");
                }
                return response.json();
            })
            .then((data) => {
                console.log(data)
                setTodayFood(data)

            })
            .catch((error) => {
                console.log(error);
            });
    }, []);



    const [todayFood, setTodayFood] = useState<Product[]>([]);

    const [selectedOption, setSelectedOption] = useState('comida');

    const handleOptionPress = (option) => {
        setSelectedOption(option);
    };


    const renderScreen = () => {
        switch (selectedOption) {
            case 'comida':
                return <Products foods={todayFood} />;
            case 'calculadora':
                return <Calculator />;
            case 'reparto':
                return <Deliveries />;
            default:
                return (
                    <View style={styles.container}>
                        <Text style={styles.optionText}>Selecciona una opción</Text>
                    </View>
                );
        }
    };


    return (


        <View style={styles.container}>
            <Header />
            <View style={styles.optionsContainer}>
                <TouchableOpacity onPress={() => handleOptionPress('comida')}>
                    <Text style={[styles.optionText, selectedOption === 'comida' && styles.selectedOption]}>
                        Comida
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleOptionPress('calculadora')}>
                    <Text
                        style={[
                            styles.optionText,
                            selectedOption === 'calculadora' && styles.selectedOption,
                        ]}
                    >
                        Calculadora
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleOptionPress('reparto')}>
                    <Text style={[styles.optionText, selectedOption === 'reparto' && styles.selectedOption]}>
                        Reparto
                    </Text>
                </TouchableOpacity>
            </View>
            {renderScreen()}
        </View>

    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 5
    },
    optionsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: 60,
        backgroundColor: '#f0f0f0',
    },
    optionText: {
        fontSize: 18,
        textDecorationLine: 'none',
        width: '100%',
    },
    selectedOption: {
        color: '#006AE3',
        fontWeight: 'bold',
        borderBottomColor: '#006AE3',
        borderBottomWidth: 2,
    },
    badgeContainer: {
        position: 'relative',
        marginTop: 25,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    icon_cart: {
        margin: 5
    },
    img_header: {
        position: 'relative',
        right: 60
    },
    badge: {
        position: 'absolute',
        top: -2,
        right: 2,
        backgroundColor: 'red',
        borderRadius: 10,
        minWidth: 20,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    badgeText: {
        color: 'white',
        fontSize: 12,
        fontWeight: 'bold',
    },
    img_carousel: {
        position: 'relative',
        right: 60,
        borderRadius: 30,
        shadowColor: '#000000',
        shadowOpacity: 0.3,
        shadowRadius: 5,
        shadowOffset: {
            width: 0,
            height: 2,
        },
    },
})

export default Home;