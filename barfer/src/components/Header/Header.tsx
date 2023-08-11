import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native"
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParams } from "../../types";
import CarritoContext from "../../context/CarritoContext";
import React, { useContext } from 'react';

const Header = () => {

    const carritoContext = useContext(CarritoContext);
    const { listaCompras } = carritoContext;

    const { navigate } = useNavigation<StackNavigationProp<RootStackParams, "Home">>();

    const handleEnterToCart = () => {
        navigate('Cart');
    }

    return (
        <View>
            <View style={styles.badgeContainer}>
                <Image style={styles.img_header} source={require('../../../assets/Logo.png')} />
                <TouchableOpacity onPress={handleEnterToCart}>

                    <MaterialCommunityIcons style={styles.icon_cart} name="cart" size={35} color="grey" />
                    <View style={styles.badge}>
                        <Text style={styles.badgeText}>{listaCompras.length}</Text>
                    </View>


                </TouchableOpacity>
            </View>

            <View style={styles.badgeContainer}>
                <Image style={styles.img_carousel} source={require('../../../assets/carousel.png')} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
    },
    selectedOption: {
        fontWeight: 'bold',
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
    
});



export default Header;