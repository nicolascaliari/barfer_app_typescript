import { View, Text, TouchableOpacity, StyleSheet, Image, TextInput } from "react-native"
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootBottomParams } from '../../types';
import { useForm } from "../../hooks/useForm";
import UsuarioContext from "../../context/UsuarioContext";
import React, { useContext } from "react";



interface FormState {
    email: string;
    password: string;
}

const initialForm: FormState = {
    email: '',
    password: '',
};

const Login = () => {

    const usuarioContext = useContext(UsuarioContext);
    const { listaUsuario, setDatosUsuario ,datosUsuario} = usuarioContext;
    const { formState, onInputChange } = useForm({ initialForm });
    const { navigate } = useNavigation<StackNavigationProp<RootBottomParams, "MyTabs">>();
    const handleLogear = () => {
        let retorno = validarUsuarioExistente();
        console.log(retorno)
        if (retorno === true) {
            navigate("MyTabs")
            const usuarioEncontrado = listaUsuario.find((usuario) => usuario.email === formState.email);
            setDatosUsuario(usuarioEncontrado)
            console.log(usuarioEncontrado)
        } else {
            alert("Usuario no encontrado")
        }
    };

    const validarUsuarioExistente = () => {
        let usuarioExistente = false;
        console.log(`estoy en validarrr ${listaUsuario}`)
        console.log(`estoy en validarrr`)
        listaUsuario.forEach((element) => {
            console.log(`estoy en validarrr${element.email}`)
            if (element.email === formState.email) {
                usuarioExistente = true;
            }
        });

        return usuarioExistente;
    };

    const handleRegister = () => {
        navigate("Register")
    };

    return (
        // <View>
        //     <Text>Estoy en Login</Text>

        //     <View style={styles.formRegister}>
        //         <Text>No tienes cuenta?</Text>
        //         <TouchableOpacity onPress={handleLogear}>
        //             <Text style={styles.formRegisterText}>Registrarse</Text>
        //         </TouchableOpacity>
        //     </View>
        // </View>



        <View style={styles.container}>
            <Image
                source={require('../../../assets/background.png')}
                style={styles.imageBackground}
            />



            <View style={styles.logoContainer}>
                <Image
                    source={require('../../../assets/LogoWhite.png')}
                    style={styles.logoImage}
                />
            </View>



            <View style={styles.form}>
                <Text style={styles.formText}>INGRESAR</Text>

                <View style={styles.formInput}>
                    <TextInput
                        style={styles.formTextInput}
                        value={formState.email}
                        onChangeText={(text) => onInputChange("email", text)} // Corregir aquí
                        placeholder="Ingrese tu email de usuario"
                    />
                </View>
                <View style={styles.formInput}>
                    <TextInput
                        style={styles.formTextInput}
                        value={formState.password}
                        onChangeText={(text) => onInputChange("password", text)} // Corregir aquí
                        secureTextEntry
                        placeholder="Ingrese tu password"
                    />
                </View>
                <View style={{ marginTop: 30 }}>
                    <TouchableOpacity style={styles.roundedButton} onPress={handleLogear}>
                        <Text style={styles.textButton}>Iniciar sesión</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.formRegister}>
                    <Text>No tienes cuenta?</Text>
                    <TouchableOpacity onPress={handleRegister}>
                        <Text style={styles.formRegisterText}>Registrarse</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#ffffff",
    },
    label: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 8,
    },
    input: {
        width: "100%",
        height: 40,
        borderWidth: 1,
        borderColor: "gray",
        marginBottom: 16,
        paddingHorizontal: 8,
    },
    button: {
        backgroundColor: "#007BFF",
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 4,
    },
    buttonText: {
        color: "white",
        textAlign: "center",
        fontSize: 16,
        fontWeight: "bold",
    },
    imageBackground: {
        width: '100%',
        height: '100%',
        opacity: 0.7,
        bottom: '20%'
    },
    form: {
        width: '100%',
        height: '40%',
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
        top: '15%'
    },
    logoImage: {
        width: 200,
        height: 100
    },
    logoText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 20,
        marginTop: 10,
        fontWeight: 'bold'
    },
    roundedButton: {
        width: '100%',
        height: 50,
        backgroundColor: '#3662FF',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15
    },
    textButton: {
        color: 'white',
        // fontWeight: 'bold'
    }
});

export default Login;