import React, { useState } from 'react'
import { Image, View, Text, ScrollView, ToastAndroid, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import Axios from "axios";
import SelectDropdown from 'react-native-select-dropdown'



const Register = () => {
    const PROVINCE = ["GBA", "CABA"];
    const LOCATION = ["Retiro", "Palermo 1 (desde Coronel Diaz hasta Juan B. Justo)", "Palermo 2", "Recoleta", "Colegiales", "Chacarita", "Barrio Norte",
        "Nuñez", "Agronomia", "Villa Pueyrredon", "Villa Ortuzar", "Paternal", "Saavedra", "Parque Chas", "Coghlan",
        "Avellaneda", "Gerli", "Valentin Alsina", "Lanus", "Escalada", "Banfield", "Temperley",
        "Lomas de Zamora", "Adrogue", "Burzaco", "Longchamps", "Glew", "Claypole", "Jose Marmol", "Ituzaingo"
    ];
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [direccion, setDireccion] = useState('');
    const [telefono, setTelefono] = useState('');
    const [departament, setDepartament] = useState('');
    const [province, setProvince] = useState<string | null>(null);
    const [location, setLocation] = useState<string | null>(null);


    const add = () => {
        console.log(nombre, apellido, email, password, direccion, telefono, departament, province, location)
        Axios.post("http://10.0.2.2:3001/usuarios/createusuario", {
            nombre: nombre,
            apellido: apellido,
            email: email,
            password: password,
            direccion: direccion,
            telefono: telefono,
            piso: departament,
            provincia: province,
            localidad: location
        })
            .then(() => {
            })
            .catch((error) => {
                console.error("Error in POST request:", error);
                ToastAndroid.show("Failed to register. Please try again later.", ToastAndroid.SHORT);
            });
    }

    return (
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

                <ScrollView>

                    <Text style={styles.formText}>REGISTRARSE</Text>

                    <View style={styles.formInput}>
                        <TextInput
                            style={styles.formTextInput}
                            value={nombre}
                            onChangeText={setNombre}

                            placeholder="Ingrese tu nombre"
                        />
                    </View>

                    <View style={styles.formInput}>
                        <TextInput
                            style={styles.formTextInput}
                            value={apellido}
                            onChangeText={setApellido}

                            placeholder="Ingrese tu apellido"
                        />
                    </View>



                    <SelectDropdown
                        defaultButtonText="Provincia"
                        data={PROVINCE}
                        onSelect={(selectedItem, index) => {
                            console.log(selectedItem, index);
                            setProvince(selectedItem)
                        }}
                        buttonTextAfterSelection={(selectedItem, index) => {
                            return selectedItem;
                        }}
                        rowTextForSelection={(item, index) => {
                            return item;
                        }}

                        buttonStyle={styles.dropdownStyle}
                        dropdownStyle={styles.dropdownOptionsStyle}
                    />



                    <SelectDropdown
                        defaultButtonText="Localidad/ciudad"
                        data={LOCATION}
                        onSelect={(selectedItem, index) => {
                            console.log(selectedItem, index);
                            setLocation(selectedItem)
                        }}
                        buttonTextAfterSelection={(selectedItem, index) => {
                            return selectedItem;
                        }}
                        rowTextForSelection={(item, index) => {
                            return item;
                        }}

                        buttonStyle={styles.dropdownStyle}
                        dropdownStyle={styles.dropdownOptionsStyle}
                    />


                    <View style={styles.formInput}>
                        <TextInput
                            style={styles.formTextInput}
                            value={direccion}
                            onChangeText={setDireccion}
                            placeholder="Ingresa tu direccion"
                        />
                    </View>


                    <View style={styles.formInput}>
                        <TextInput
                            style={styles.formTextInput}
                            value={departament}
                            onChangeText={setDepartament}
                            placeholder="Piso y departamento (opcional)"
                        />
                    </View>

                    <View style={styles.formInput}>
                        <TextInput
                            style={styles.formTextInput}
                            value={email}
                            onChangeText={setEmail}

                            placeholder="Ingrese tu email"
                        />
                    </View>

                    <View style={styles.formInput}>
                        <TextInput
                            style={styles.formTextInput}
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry
                            placeholder="Ingrese tu password"
                        />
                    </View>


                    <View style={styles.formInput}>
                        <TextInput
                            style={styles.formTextInput}
                            value={telefono}
                            onChangeText={setTelefono}
                            placeholder="Ingresa tu telefono"
                        />
                    </View>
                    <View style={{ marginTop: 30 }}>
                        <TouchableOpacity style={styles.roundedButton} onPress={() => add()}><Text style={styles.textButton}>Confirmar</Text></TouchableOpacity>
                    </View>

                </ScrollView>

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
    },
    dropdownStyle: {
        backgroundColor: "#FFFFFF",
        borderBottomWidth: 1,
        borderBottomColor: "#AAAAAA",
        borderRadius: 30,
        paddingHorizontal: 12,
        alignSelf: 'center',
        width: "100%",
    },
    dropdownOptionsStyle: {
        backgroundColor: "#fff",
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 8,
        marginTop: -1,
        width: "50%",
    },
});

export default Register;