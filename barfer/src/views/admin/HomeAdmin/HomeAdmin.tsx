import { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native'
import {API} from "../../../config/config"
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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Categorias</Text>


      <FlatList
        data={categoryPerro}
        renderItem={({ item, index }) => (
          <View>
            <Image style={styles.image} source={{ uri: `${API}/images/${item.img}` }} />
            <Text>{item.nombre_categoria}</Text>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
        horizontal={true}
      />


      <FlatList
        data={categoryGato}
        renderItem={({ item, index }) => (
          <View>
            <Image style={styles.image} source={{ uri: `${API}/images/${item.img}` }} />
            <Text>{item.nombre_categoria}</Text>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
        horizontal={true}
      />



      <FlatList
        data={categoryComplementos}
        renderItem={({ item, index }) => (
          <View>
            <Image style={styles.image} source={{ uri: `${API}/images/${item.img}` }} />
            <Text>{item.nombre_categoria}</Text>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
        horizontal={true}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 100
  },
  title:{
    fontSize:20,
    fontWeight:'bold',
    marginVertical:20
  },
  container:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    marginTop:50
  }
})


export default HomeAdmin