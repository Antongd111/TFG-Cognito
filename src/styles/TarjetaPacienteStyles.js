import { StyleSheet } from 'react-native';

export default styles = StyleSheet.create({

    tarjeta: {
        backgroundColor: '#F5F5F5',
        padding: 0,
        margin: '2%',
        borderRadius: 10,
        display: 'flex',
        flexDirection: 'row',
        width: '95%',
        alignSelf: 'center',
        justifyContent: 'space-between',
    },

    paciente : {
        display: 'flex',
        flexDirection: 'row',
        margin: 10,
    },

    imagen: {
        width: 100,
        height: 130,
        borderRadius: 10,
        borderWidth: 1,
        margin: 10,
        marginRight: 40,
    },

    nombre: {
        marginTop: 15,
        fontSize: 25,
        fontWeight: 'bold',
        marginBottom: 10,
    },

    fechaNacimiento: {
        fontSize: 20,
        marginBottom: 10,
    },

    sexo: {
        fontSize: 20,
    },

    observaciones: {
        fontSize: 15,
    },

    contenedor_botones: {
        display: 'flex',
        flexDirection: 'row',
        height: '100%',
        width: '60%',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },

    boton : {
        backgroundColor: '#D2B48C',
        padding: 10,
        margin: 10,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        height: 60,
    },

    textoBoton : {
        color: 'white',
        fontSize: 20,
    },

    eliminar: {
        width: 40,
        height: 40,
        margin: 10,
    },

    eliminarBoton : {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F04343',
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
    },

});
