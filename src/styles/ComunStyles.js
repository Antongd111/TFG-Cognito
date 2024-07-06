import { StyleSheet } from 'react-native';

export default ComunStyles = StyleSheet.create({

    boton: {
        backgroundColor: '#D2B48C',
        padding: 10,
        margin: 10,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        height: 60,
    },

    textoBoton: {
        color: 'white',
        fontSize: 20,
    },

    contenedor_test: {
        height: '95%',
        backgroundColor: 'white',
        margin: '2%',
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#D2B48C',
    },

    borde_tests: {
        flex: 1,
        backgroundColor: '#F2E8E1',
    },

    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalView: {
        margin: 20,
        width: '60%',
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    tituloInstrucciones: {
        fontSize: 35,
        fontWeight: 'bold',
        marginBottom: 15,
        
    },
    textoInstrucciones: {
        marginBottom: 15,
        textAlign: "center",
        fontSize: 25,
        borderTop: 10,
        borderColor: 'black',
    },
    separador: {
        width: '100%',
        height: 2,
        backgroundColor: 'black',
        marginBottom: 15,
    },
});