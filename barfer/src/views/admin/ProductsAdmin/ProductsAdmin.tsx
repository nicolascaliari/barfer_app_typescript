import React, { useEffect, useState } from 'react'
import { View, Text, FlatList } from 'react-native'
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Product, RootStackAdminParams } from '../../../types';
import { useRoute } from '@react-navigation/native'
import { API } from '../../../config/config';
import th from 'date-fns/esm/locale/th/index.js';
import ProductItem from '../../../components/ProductoItem/ProductoItem';

const ProductsAdmin = () => {

    const [products, setProducts] = useState<Product[]>([]);
    const { params: { idCategory } } = useRoute<NativeStackScreenProps<RootStackAdminParams, 'ProductsAdmin'>['route']>();

    useEffect(() => {
        fetch(`${API}/producto/${idCategory}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Error de red - No se pudo obtener la lista de productos");
                }
                return response.json();
            })
            .then((data: Product[]) => {
                if (data.length === 0) {
                    console.log("No se encontraron productos para este idCategory.");
                } else {
                    setProducts(data);
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);




    return (
        <View>
            <FlatList
                data={products}
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
        </View>
    )
}

export default ProductsAdmin
