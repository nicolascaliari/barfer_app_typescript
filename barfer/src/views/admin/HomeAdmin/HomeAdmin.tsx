import { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native'
import { API } from "../../../config/config"
import { StackNavigationProp } from '@react-navigation/stack'
import { useNavigation } from '@react-navigation/native';
import { RootStackAdminParams } from '../../../types';

type PostImageNavigationProps = StackNavigationProp<RootStackAdminParams, 'ProductsAdmin'>
type Props = {}

const HomeAdmin = (props: Props) => {
  const [Category, setCategory] = useState([])

  useEffect(() => {
    // Realizar la solicitud GET una vez que el componente se ha montado
    fetch(`${API}/category`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error de red - No se pudo obtener la lista de empleados");
        }
        return response.json();
      })
      .then((data) => setCategory(data))
      .catch((error) => {
        console.log(error);
        // Aquí puedes mostrar un mensaje de error en la interfaz de usuario si lo deseas
      });
  }, []);

  const categoryPerro = Category.filter((category) => category.idcategory === 1);
  const categoryGato = Category.filter((category) => category.idcategory === 2);
  const categoryComplementos = Category.filter((category) => category.idcategory === 3);

  const { navigate } = useNavigation<PostImageNavigationProps>();

  const handleViewPress = (id: number) => {
    navigate('ProductsAdmin', { idCategory: id })

  }


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Categorias</Text>


      <FlatList
        data={categoryPerro}
        renderItem={({ item, index }) => (
          <TouchableOpacity onPress={() => handleViewPress(item.idcategory)}>
            <View>
              <Image style={styles.image} source={require('../../../../assets/perro_admin.jpeg')} />
              <Text style={styles.title}>{item.nombre_categoria}</Text>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => index.toString()}
        horizontal={true}
      />


      <FlatList
        data={categoryGato}
        renderItem={({ item, index }) => (
          <TouchableOpacity onPress={() => handleViewPress(item.idcategory)}>
            <View>
              <Image style={styles.image} source={require('../../../../assets/gato_admin.jpeg')} />
              <Text style={styles.title}>{item.nombre_categoria}</Text>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => index.toString()}
        horizontal={true}
      />



      <FlatList
        data={categoryComplementos}
        renderItem={({ item, index }) => (
          <TouchableOpacity onPress={() => handleViewPress(item.idcategory)}>
            <View>
              <Image style={styles.image} source={require('../../../../assets/complemento_admin.jpeg')} />
              <Text style={styles.title}>{item.nombre_categoria}</Text>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => index.toString()}
        horizontal={true}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  image: {
    width: 140,
    height: 140,
    borderRadius: 70,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 20,
    textAlign: 'center'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50
  }
})


export default HomeAdmin