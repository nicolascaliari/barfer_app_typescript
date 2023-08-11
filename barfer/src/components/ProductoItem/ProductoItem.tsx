import React, { FC } from 'react'
import { View, Text, StyleSheet, ToastAndroid , Image,TouchableOpacity} from 'react-native'
import { Product } from '../../types'
import { Button, Icon } from '@rneui/themed'
import usefoodStorage from '../../hooks/useFoodStorage'
import {StackNavigationProp} from '@react-navigation/stack'
import { useNavigation } from '@react-navigation/native';
import { RootStackParams } from '../../types'


type PostImageNavigationProps = StackNavigationProp<RootStackParams, 'InfoProduct'>



type MealItemsProps = Product & {
    isAbleToAdd?: boolean;
    onCompleteAddRemove?: () => void;
    itemPosition: number;
}


const ProductItem: FC<MealItemsProps> = ({ idproducto , nombre, descripcion, precio_cincokg, precio_diezkg, img,idCategory, isAbleToAdd, onCompleteAddRemove, itemPosition }) => {
    const { onSaveTodayFood } = usefoodStorage();
    const { navigate } = useNavigation<PostImageNavigationProps>();


    const handleViewPress = () => {
        navigate('InfoProduct' , {idproducto , nombre, descripcion, precio_cincokg, precio_diezkg, img,idCategory} )
    }

    const handleIconPress = async () => {
        try {
            if (isAbleToAdd) {
                await onSaveTodayFood({ idproducto, nombre, descripcion, precio_cincokg, precio_diezkg,img, idCategory });
                ToastAndroid.showWithGravityAndOffset(
                    'Comida guardada exitosamente!',
                    ToastAndroid.LONG,
                    ToastAndroid.BOTTOM,
                    25,
                    50,
                );
            }
            // else {
            //     await onDeleteTodayFood(itemPosition ?? -1)
            //     ToastAndroid.showWithGravityAndOffset(
            //         'Comida eliminada exitosamente!',
            //         ToastAndroid.LONG,
            //         ToastAndroid.BOTTOM,
            //         25,
            //         50,
            //     );
            //     onCompleteAddRemove?.();
            // }

        } catch (error) {
            console.error(error)
            ToastAndroid.showWithGravityAndOffset(
                'Comida no agregada',
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                25,
                50,
            );
        }
    }

    return (
        <TouchableOpacity style={styles.container_flat} onPress={handleViewPress}>
            <View style={styles.card}>
                <Image style={styles.img_card}
                    source={{ uri: `http://10.0.2.2:3001/images/${img}` }}
                    onError={() => console.log('Error al cargar la imagen')}></Image>
                <Text style={styles.nombre_producto}>{nombre}</Text>
                <View style={styles.contenedor_precios}>
                    <Text style={styles.precio_cincokg_producto}>{precio_cincokg}</Text>
                    <Text style={styles.precio_cincokg_producto}>-</Text>
                    <Text style={styles.precio_diezkg_producto}>{precio_diezkg}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    container_flat: {
        padding:10
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
        height: 200,
        width: 160,
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
        left: 10
    },
    nombre_producto: {
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
        position: 'relative',
        bottom: 30
    },
    descripcion_producto: {
        textAlign: 'center',
        fontSize: 18,
        color: '#888',
    },
    precio_cincokg_producto: {
        fontSize: 20,
        color: '#006AE3',
        margin: 2,
    },
    precio_diezkg_producto: {
        fontSize: 20,
        color: '#006AE3',
        margin: 2,
    },
    contenedor_precios: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        position: 'relative',
        bottom: 20
    },
    title: {
        color: '#000',
        fontWeight: 'bold',
        marginLeft: 10,
        fontSize: 17
    },
    buscador: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 100
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
    img_carousel:{
        position: 'relative',
        right: 60,
        borderRadius:30
    },
    container: {
        backgroundColor: "#ade8af",
        borderRadius: 12,
        padding: 12,
        marginBottom: 12,
        flexDirection: 'row',
        marginHorizontal: 10
    },
    leftContainer: {
        flex: 1,
        justifyContent: 'center'
    },
    name: {
        fontSize: 18,
        fontWeight: '500'
    },
    portion: {
        fontSize: 14,
        color: '#808080',
        fontWeight: '500'
    },
    rightContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-end'
    },
    calories: {
        fontSize: 18,

    },
    iconButton: {
        marginBottom: -8
    }
});

export default ProductItem;
