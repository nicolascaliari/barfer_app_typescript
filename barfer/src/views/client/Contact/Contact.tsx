import { View, Text, StyleSheet, TextInput, TouchableOpacity } from "react-native"
import { useState } from "react"


const Contact = () => {

    const [nombre, setNombre] = useState<string>("");
    const [telefono, setTelefono] = useState<string>("");
    const [correo, setCorreo] = useState<string>("");
    const [mensaje, setMensaje] = useState<string>("");


    return (
        <View style={styles.container}>
            <View style={styles.shadowContainer}>
                <Text style={styles.title}>Contactanos</Text>

                <View style={styles.formItem}>
                    <TextInput
                        placeholder="Nombre"
                        value={nombre}
                        style={styles.input}

                    />




                    <TextInput
                        placeholder="Telefono"
                        value={telefono}
                        style={styles.input}
                        onChangeText={(text) => setTelefono((text))}
                        keyboardType="numeric"
                    />




                    <TextInput
                        placeholder="Correo"
                        value={correo}
                        style={styles.input}
                    />





                    <TextInput
                        placeholder="mensaje"
                        value={mensaje}
                        style={styles.inputMensaje}

                    />
                </View>





                <TouchableOpacity style={styles.roundedButton} >
                    <Text style={styles.textButton}>ENVIAR</Text>
                </TouchableOpacity>
            </View>
        </View >
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        width: "100%"
    },
    shadowContainer: {
        justifyContent: "center",
        alignItems: "center",
        width: "80%",
        height: 600,
        padding: 20,
        backgroundColor: "#ffffff", // Agrega un fondo blanco detrás para que la sombra sea visible
        borderRadius: 30,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        marginTop:20
    },
    title: {
        flex: 1,
        fontSize: 30,
        fontWeight: "bold",
        color: '#006AE3',

    },
    input: {
        backgroundColor: "#F2F2F2",
        width: 260,
        height: 44,
        marginVertical: 20,
        padding: 10,
        borderRadius: 30,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    inputMensaje: {
        backgroundColor: "#F2F2F2",
        width: 260,
        height: 154,
        marginVertical: 10,
        padding: 10,
        borderRadius: 30,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    roundedButton: {
        width: '55%',
        height: 40,
        backgroundColor: '#3662FF',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 15,
        borderRadius: 30
    },
    textButton: {
        color: 'white',
        // fontWeight: 'bold'
    },
    formItem: {
        flexDirection: 'column',
        alignItems: 'center',

    },

})

export default Contact;