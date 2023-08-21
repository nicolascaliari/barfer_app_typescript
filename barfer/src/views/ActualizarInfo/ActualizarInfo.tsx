import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image } from "react-native"
import { useContext, useState } from 'react';
import UsuarioContext from "../../context/UsuarioContext";
import Axios from "axios";





const ActualizarPerfil = () => {
    const { datosUsuario , listaUsuario} = useContext(UsuarioContext)
    const [nombre, setNombre] = useState(datosUsuario.nombre);
    const [apellido, setApellido] = useState(datosUsuario.apellido);
    const [email, setEmail] = useState(datosUsuario.email);
    const [password, setPassword] = useState(datosUsuario.password);

    const usuarioEncontrado = listaUsuario.find(
        (usuario) => usuario.email === datosUsuario.email && usuario.password === datosUsuario.password
    );
    

    console.log(`${usuarioEncontrado.idusuarios}`)
    console.log(`${datosUsuario.nombre}`)

    const update = () => {

        console.log("Datos a actualizar:", {
            idusuario: usuarioEncontrado.idusuarios,
            nombre: nombre,
            apellido: apellido,
            email: email,
            password: password
        });

        Axios.put("http://10.0.2.2:3001/updateusuarios", {
            idusuarios:  usuarioEncontrado.idusuarios,
            nombre: nombre,
            apellido: apellido,
            email: email,
            password: password
        })
            .then((response) => {
                // Si la actualización fue exitosa, puedes hacer algo con la respuesta del servidor
                console.log("Usuario actualizado exitosamente:", response.data);
            })
            .catch((error) => {
                // En caso de error, puedes manejarlo aquí
                console.error("Error al actualizar el usuario:", error);
            });
    }



    return (
        <View style={styles.container}>
            <Image
                source={require('../../../assets/background.png')}
                style={styles.imageBackground}
            />

            <View style={styles.form}>

                <ScrollView>

                    <Text style={styles.formText}>ACTUALIZAR</Text>


                    <View style={styles.formInput}>
                        <TextInput
                            style={styles.formTextInput}
                            placeholder='Nombres'
                            value={nombre}
                            onChangeText={(text: string) => setNombre(text)}
                        />
                    </View>

                    <View style={styles.formInput}>
                        <TextInput
                            style={styles.formTextInput}
                            placeholder='Apellidos'
                            value={apellido}
                            onChangeText={(text: string) => setApellido(text)}
                        />
                    </View>

                    <View style={styles.formInput}>
                        <TextInput
                            style={styles.formTextInput}
                            placeholder='Email'
                            value={email}
                            onChangeText={(text: string) => setEmail(text)}
                        />
                    </View>


                    <View style={styles.formInput}>
                        <TextInput
                            style={styles.formTextInput}
                            placeholder='password'
                            value={password}
                            onChangeText={(text: string) => setPassword(text)}
                        />
                    </View>
                    <View style={{ marginTop: 30 }}>
                        <TouchableOpacity style={styles.roundedButton} onPress={() => update()}>
                            <Text>Confirmar</Text>
                        </TouchableOpacity>
                    </View>

                </ScrollView>
            </View>
        </View>
    )
}


export default ActualizarPerfil


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
    },
    imageBackground: {
        width: '100%',
        height: '100%',
        opacity: 0.6,
        bottom: '30%'
    },
    form: {
        width: '100%',
        height: '50%',
        backgroundColor: 'white',
        position: 'absolute',
        bottom: 0,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        padding: 30
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
    formRegister: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 30
    },
    formRegisterText: {
        fontStyle: 'italic',
        color: 'orange',
        borderBottomWidth: 1,
        borderBottomColor: 'orange',
        fontWeight: 'bold',
        marginLeft: 10
    },
    logoContainer: {
        position: 'absolute',
        alignSelf: 'center',
        top: '8%',
        alignItems: 'center'
    },
    logoImage: {
        width: 100,
        height: 100,
    },
    logoText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 18,
        marginTop: 10,
        fontWeight: 'bold'
    },
    loading: {
        position: 'absolute',
        bottom: 0,
        top: 0,
        right: 0,
        left: 0,
    },
    roundedButton: {
        width: '100%',
        height: 50,
        backgroundColor: '#3662FF',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15
    },
});