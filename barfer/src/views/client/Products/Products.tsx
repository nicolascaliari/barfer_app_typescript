import { View, Text, StyleSheet, ScrollView, FlatList } from "react-native"
import { FC } from "react";
import { Product } from "../../../types";
import ProductItem from "../../../components/ProductoItem/ProductoItem";
import PropTypes from 'prop-types';
import img from '../../../../assets/comida.png';

type ProductProps = {
    foods: Product[];
}

const Products: FC<ProductProps> = ({ foods }) => {

    // const comidaPerro = [
    //     {
    //         idproducto: 1,
    //         nombre: 'Barfer box perro pollo',
    //         descripcion: 'Dog Chow es una comida para perros de todas las edades, que contiene proteínas de alta calidad y vitaminas que ayudan a mantenerlo fuerte y saludable.',
    //         precio_cincokg: 40000,
    //         precio_diezkg: 20000,
    //         img: '../../../../assets/comida.png',
    //         idCategory: 1,
    //         customId: '1'

    //     },
    //     {
    //         idproducto: 2,
    //         nombre: 'Barfer box perro pollo',
    //         descripcion: 'Dog Chow es una comida para perros de todas las edades, que contiene proteínas de alta calidad y vitaminas que ayudan a mantenerlo fuerte y saludable.',
    //         precio_cincokg: 10000,
    //         precio_diezkg: 20000,
    //         img:"../../../../assets/comida.png",
    //         idCategory: 1,
    //         customId: '1'
    //     },
    //     {
    //         idproducto: 3,
    //         nombre: 'Barfer box perro pollo',
    //         descripcion: 'Dog Chow es una comida para perros de todas las edades, que contiene proteínas de alta calidad y vitaminas que ayudan a mantenerlo fuerte y saludable.',
    //         precio_cincokg: 1000,
    //         precio_diezkg: 2000,
          
    //         img: "../../../../assets/comida.png",
    //         idCategory: 1,
    //         customId: '1'
    //     }

    // ]


    const cateogiaPerro = foods.filter((producto) => producto.idCategory === 1);
    const cateogiaGato = foods.filter((producto) => producto.idCategory === 2);
    const cateogiaComplemento = foods.filter((producto) => producto.idCategory === 3);

    return (
        <ScrollView>
            <View style={styles.container}>
                <Text style={styles.title}>Comida Perro</Text>

                <FlatList
                    style={styles.flat}
                    data={cateogiaPerro}
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



                <Text style={styles.title}>Comida gato</Text>
                <FlatList
                    style={styles.flat}
                    data={cateogiaGato}
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


                <Text style={styles.title}>Complemento</Text>
                <FlatList
                    style={styles.flat}
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
            </View>
        </ScrollView>
    )
}


const styles = StyleSheet.create({
    container: {
        marginTop: 60,
        height: 970
    },
    content: {
        height: 800,
    },
    title: {
        fontSize: 16,
        fontWeight:'600'
    },
    flat: {

    }

})

export default Products;