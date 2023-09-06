import { useContext } from 'react';
import { StyleSheet, Text, View, FlatList, Image, TextInput , Pressable, TouchableOpacity} from 'react-native';
import UsuarioContext from '../../../context/UsuarioContext';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParams } from '../../../types';

const Setting = () => {

    const { datosUsuario } = useContext(UsuarioContext)
    const { navigate } = useNavigation<StackNavigationProp<RootStackParams, "Routes">>();
    return (



        <View style={styles.container}>

            <Image
                source={require('../../../../assets/background.png')}
                style={styles.imageBackground}
            />

            <Pressable
                style={styles.change}
                onPress={() => navigate('Login')}>
                <Image
                    source={require('../../../../assets/exchange.png')}
                    style={styles.logoutImage}
                />
            </Pressable>


            <View style={styles.form}>
                <View style={styles.formInfo}>
                    <Image
                        source={require('../../../../assets/user.png')}
                        style={styles.formImage}
                    />
                    <View style={styles.formContent}>
                        <Text>{datosUsuario.nombre}</Text>
                        <Text style={styles.formTextDescription}>Nombre del usuario</Text>
                    </View>
                </View>

                <View style={{ ...styles.formInfo, marginTop: 25 }}>
                    <Image
                        source={require('../../../../assets/email.png')}
                        style={styles.formImage}
                    />
                    <View style={styles.formContent}>
                        <Text>{datosUsuario.email}</Text>
                        <Text style={styles.formTextDescription}>Correo electronico</Text>
                    </View>
                </View>

                <View style={{ ...styles.formInfo, marginTop: 25, marginBottom: 70 }}>
                    <Image
                        source={require('../../../../assets/phone.png')}
                        style={styles.formImage}
                    />
                    <View style={styles.formContent}>
                        <Text>{datosUsuario.password}</Text>
                        <Text style={styles.formTextDescription}>Password</Text>
                    </View>
                </View>

                <TouchableOpacity onPress={() => navigate("ActualizarPerfil")} style={styles.roundedButton} ><Text style={{textAlign:'center', color:'#fff'}}>Actualizar informacion</Text></TouchableOpacity> 

            </View>

        </View>
    )
}


export default Setting;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black'
    },
    imageBackground: {
        width: '100%',
        height: '100%',
        opacity: 0.6,
        bottom: '10%'
    },
    form: {
        width: '100%',
        height: '45%',
        backgroundColor: 'white',
        position: 'absolute',
        bottom: 0,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        padding: 30
    },
    formText: {
        fontWeight: 'bold',
        fontSize: 16,
        textAlign: 'center'
    },
    formInfo: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    formContent: {
        marginLeft: 15
    },
    formImage: {
        height: 30,
        width: 30
    },
    formTextDescription: {
        fontSize: 12,
        color: 'gray'
    },
    logoContainer: {
        position: 'absolute',
        alignSelf: 'center',
        top: '11%'
    },
    logoImage: {
        width: 150,
        height: 150,
        borderRadius: 100,
        borderColor: 'white',
        borderWidth: 2
    },
    logoText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 20,
        marginTop: 10,
        fontWeight: 'bold'
    },
    logout: {
        position: 'absolute',
        alignSelf: 'center',
        top: 30,
        right: 15,
    },
    logoutImage: {
        width: 40,
        height: 40,
    },
    change: {
        position: 'absolute',
        alignSelf: 'center',
        top: 75,
        right: 15,
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
