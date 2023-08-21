import { ca } from "date-fns/locale";
import { useEffect, useState } from "react";
import { View, Platform, Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView } from "react-native"
import SelectDropdown from 'react-native-select-dropdown'

const animal = ["Perro", "Gato"];
const condicion = ["Cachorro", "Adulto"];
const edadCachorroPerro = ["2 - 4", "4 - 6", "6 - 8", "8 - 10", "10 - 12"];
const edadCachorroGato = ["Destete - 2 meses", "3 - 4", "5 - 6", "7 - 8", "9 - 10", "11 - 12"];
const edadAdulto = ["actividad baja", "actividad media", "actividad alta"];


//Porcentajes de perros cachorros
const porcentajesDosACuatro = 0.1;
const porcentajesCuatroASeis = 0.08;
const porcentajesSeisAOcho = 0.06;
const porcentajesOchoADiez = 0.04;
const porcentajesDiezADoce = 0.03;

//porcentajes de perros adultos
const porcentajeBajo = 0.02;
const porcentajeMedio = 0.025;
const porcentajeAlto = 0.03;



//porcentajes de gatos cachorros
const porcentajeDestete = 0.1;
const porcentaje3A4 = 0.08;
const porcentaje5A6 = 0.06;
const porcentaje7A8 = 0.06;
const porcentaje9A10 = 0.05;
const porcentaje11A12 = 0.04;

//porcentajes de gatos adultos
const porcentajeBajoGato = 0.03;
const porcentajeMedioGato = 0.035;
const porcentajeAltoGato1 = 0.045;

const Calculadora = () => {
    useEffect(() => {
        setCalculo(0)
    }, []);


    const [peso, setPeso] = useState<number>(0);
    const [animalSeleccionado, setAnimalSeleccionado] = useState<string | null>(
        null
    );
    const [condicionSeleccionada, setCondicionSeleccionada] = useState<string | null>(
        null
    );
    const [edad, setEdad] = useState<string | null>(null);
    const [calculoTotal, setCalculoTotal] = useState<string | null>(null);
    const [calculo, setCalculo] = useState<number | null>(null);

    const handleCalcularAlimento = () => {
        let calculo: number = 0;
        let precioFinal: string = "";

        if (animalSeleccionado === "Perro") {
            if (condicionSeleccionada == "Cachorro" && edad == "2 - 4") {
                calculo = peso * porcentajesDosACuatro;
            } else if (condicionSeleccionada == "Cachorro" && edad == "4 - 6") {
                calculo = peso * porcentajesCuatroASeis;
            } else if (condicionSeleccionada == "Cachorro" && edad == "6 - 8") {
                calculo = peso * porcentajesSeisAOcho;
            } else if (condicionSeleccionada == "Cachorro" && edad == "8 - 10") {
                calculo = peso * porcentajesOchoADiez;
            } else if (condicionSeleccionada == "Cachorro" && edad == "10 - 12") {
                calculo = peso * porcentajesDiezADoce;
            } else {
            }

            if (condicionSeleccionada == "Adulto" && edad == "actividad baja") {
                calculo = peso * porcentajeBajo;
            } else if (condicionSeleccionada == "Adulto" && edad == "actividad media") {
                calculo = peso * porcentajeMedio;
            } else if (condicionSeleccionada == "Adulto" && edad == "actividad alta") {
                calculo = peso * porcentajeAlto;
            }
        } else {
            if (condicionSeleccionada == "Cachorro" && edad == "Destete - 2 meses") {
                calculo = peso * porcentajeDestete;
            } else if (condicionSeleccionada == "Cachorro" && edad == "3 - 4") {
                calculo = peso * porcentaje3A4;
            } else if (condicionSeleccionada == "Cachorro" && edad == "5 - 6") {
                calculo = peso * porcentaje5A6;
            } else if (condicionSeleccionada == "Cachorro" && edad == "7 - 8") {
                calculo = peso * porcentaje7A8;
            } else if (condicionSeleccionada == "Cachorro" && edad == "9 - 10") {
                calculo = peso * porcentaje9A10;
            } else if (condicionSeleccionada == "Cachorro" && edad == "11 - 12") {
                calculo = peso * porcentaje11A12;
            }

            if (condicionSeleccionada == "Adulto" && edad == "actividad baja") {
                calculo = peso * porcentajeBajoGato;
            } else if (condicionSeleccionada == "Adulto" && edad == "actividad media") {
                calculo = peso * porcentajeMedioGato;
            } else if (condicionSeleccionada == "Adulto" && edad == "actividad alta") {
                calculo = peso * porcentajeAltoGato1;
            }
        }




        if (calculo < 1) {
            precioFinal = `Tu amigo necesita ${(calculo * 1000).toFixed(2)} gramos`;
        } else {
            precioFinal = `Tu amigo necesita ${(calculo.toFixed(2))} kilos`;
        }

        setCalculo(calculo)
        setCalculoTotal(precioFinal)
        console.log(`Cantidad ${calculo}`)
        console.log(`peso ${peso}`)
        console.log(`animak ${animalSeleccionado}`)
        console.log(`condicion ${condicionSeleccionada}`)
    }



    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
        >

            <View style={styles.shadowContainer}>
                <Text style={styles.title}>CALCULADORA</Text>
                <View style={styles.centerContainer}>
                    <SelectDropdown
                        defaultButtonText="Elija a su amigo"
                        data={animal}
                        onSelect={(selectedItem, index) => {
                            setAnimalSeleccionado(selectedItem);
                            setCondicionSeleccionada(null); // Restablecemos la opción de condición al elegir un animal diferente
                            console.log(selectedItem, index)
                        }}
                        buttonTextAfterSelection={(selectedItem, index) => {
                            return selectedItem
                        }}
                        rowTextForSelection={(item, index) => {
                            return item
                        }}
                        buttonStyle={styles.dropdownStyle}
                        dropdownStyle={styles.dropdownOptionsStyle}
                    />

                    {animalSeleccionado && (
                        <SelectDropdown
                            defaultButtonText="Cachorro o adulto?"
                            data={condicion}
                            onSelect={(selectedItem, index) => {
                                setCondicionSeleccionada(selectedItem);
                                console.log(selectedItem)
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
                    )}

                    {condicionSeleccionada === "Adulto" && (
                        <SelectDropdown
                            defaultButtonText="Coloque su edad"
                            data={edadAdulto}
                            onSelect={(selectedItem, index) => {
                                console.log(selectedItem, index);
                                setEdad(selectedItem)
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
                    )}

                    {condicionSeleccionada === "Cachorro" && animalSeleccionado === "Perro" && (
                        <SelectDropdown
                            defaultButtonText="Coloque su edad"
                            data={edadCachorroPerro}
                            onSelect={(selectedItem, index) => {
                                console.log(selectedItem, index);
                                setEdad(selectedItem)
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
                    )}


                    {condicionSeleccionada === "Cachorro" && animalSeleccionado === "Gato" && (
                        <SelectDropdown
                            defaultButtonText="Coloque su edad"
                            data={edadCachorroGato}
                            onSelect={(selectedItem, index) => {
                                console.log(selectedItem, index);
                                setEdad(selectedItem)
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
                    )}

                    <TextInput
                        style={styles.formTextInput}
                        placeholder="Ingrese el peso"
                        value={peso.toString()}
                        onChangeText={(number) => setPeso(Number(number))} // Convertir la cadena a un número

                    />


                    <View style={{ marginTop: 30 }}>
                        <TouchableOpacity style={styles.roundedButton} onPress={handleCalcularAlimento}>
                            <Text style={styles.textButton}>Calcular</Text>
                        </TouchableOpacity>
                    </View>

                    {

                        <Text style={styles.respuesta}>
                            {calculo === 0 ? "" : `${calculoTotal}`}
                        </Text>
                    }

                </View>
            </View>
        </KeyboardAvoidingView>
    )
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        marginTop: 80
    },
    shadowContainer: {
        justifyContent: "center",
        alignItems: "center",
        width: "80%",
        height: 450,
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
    },
    centerContainer: {
        padding: 16,
    },
    title: {
        fontSize: 27,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    dropdownStyle: {
        backgroundColor: "#FFFFFF",
        borderBottomWidth: 1,
        borderBottomColor: "#AAAAAA",
        borderRadius: 30,
        paddingHorizontal: 12,
        alignSelf: 'center',
    },
    dropdownOptionsStyle: {
        backgroundColor: "#fff",
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 8,
        marginTop: -1,
        width: "50%", // Puedes ajustar el ancho del dropdownOptions
    },
    formTextInput: {
        borderBottomWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomColor: "#AAAAAA",
        marginVertical: 20,
        width: '100%',
        textAlign: 'center',
        alignSelf: 'center',

    },
    roundedButton: {
        width: 160,
        height: 40,
        backgroundColor: '#3662FF',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15
    },
    textButton: {
        color: 'white',
        fontWeight: 'bold'
    },
    respuesta: {
        fontSize: 17,
        fontWeight: "bold",
        marginVertical: 20
    },

})

export default Calculadora;