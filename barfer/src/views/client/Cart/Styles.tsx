import { StyleSheet } from 'react-native';

const CartStyles = StyleSheet.create({
    closeIcon: {
        position: 'absolute',
        bottom: 76,
        left: 230,
    },
    card_carrito: {
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: '#ffffff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 4,
        height: 120,
        width: '95%',
        borderRadius: 30,
        marginTop: 30,
        margin: 10,
    },
    leftContainer: {
        display: 'flex',
        flexDirection: 'column'
    },
    bottomContainer: {
        flexDirection: "row",
        paddingVertical: 15
    },
    textsContainer: {
        flexDirection: 'column',
        margin: 0,
        padding: 0
    },
    container_img: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    deleteContainer: {
        justifyContent: 'center',
        alignSelf: 'center',
        paddingLeft: 80
    },
    img_card: {
        width: 100,
        height: 100,
    },
    container_body: {
        flexDirection: 'row',
        paddingHorizontal: 10
    },
    nombre_producto: {
        textAlign: 'left',
        fontSize: 15,
        fontWeight: 'bold',
        paddingVertical: 7

    },
    eliminarButton: {
        padding: 3,
        alignSelf: 'flex-end'
    },
    cantidad_txt: {
        fontSize: 17,
        margin: 5,
        marginRight: 10
    },
    cantidad_num: {
        fontSize: 17,
        margin: 5
    },
    btn: {
        margin: 5
    },
    precio: {
        fontSize: 18,
        marginVertical: 5,
        fontWeight: "500",
        textAlign: 'left'
    },
    precioTotal: {
        fontSize: 18,
        marginVertical: 5,
        fontWeight: "500",
        textAlign: 'center'
    },
    buttonPay: {
        padding: 5,
        backgroundColor: '#3662FF',
        borderRadius: 8,
        alignItems: 'center',
        alignSelf: "center",
        justifyContent: 'center',
        marginRight: 5,
        width: 180,
        marginBottom: 10
    },
    button: {
        padding: 20,
        backgroundColor: '#3662FF',
        borderRadius: 8,
        alignItems: 'center',
        alignSelf: "center",
        justifyContent: 'center',
        marginRight: 5,
        width: 180,
        marginBottom: 30,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center'
    },
    txtInformation: {
        fontSize: 20,
        fontWeight: '700',
        padding: 10
    },
    subtotalContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
    },
    totalTextContainer: {
        flex: 1,
    },
    totalPriceContainer: {
        flex: 1,
        alignItems: 'flex-end',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        padding: 10
    },
    checkBoxContainer: {
        flex: 1,
        padding: 10

    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        height: 300,
        width: 350,
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    buttonOpen: {
        backgroundColor: '#3662FF',
    },
    buttonClose: {
        backgroundColor: 'transparent',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 16,
        fontSize: 18,
        textAlign: 'center',
        fontWeight: '600'
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
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        padding: 40
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
    roundedButton: {
        height: 30,
    },
    textButton: {
        color: 'black',
        fontWeight: 'bold'
    },
    btnComprarContainer: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        backgroundColor: 'white',
    }
});

export default CartStyles;