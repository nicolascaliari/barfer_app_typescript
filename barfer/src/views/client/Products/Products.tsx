import { View, Text, StyleSheet, ScrollView, FlatList } from "react-native"
import { FC } from "react";
import { Product } from "../../../types";
import ProductItem from "../../../components/ProductoItem/ProductoItem";
import PropTypes from 'prop-types';

type ProductProps = {
    foods: Product[];
}

const Products: FC<ProductProps> = ({ foods }) => {

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
                            key={`today-meal-itemm-${item?.nombre || index}`}
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
        fontWeight: '600'
    },
    flat: {

    }

})

export default Products;