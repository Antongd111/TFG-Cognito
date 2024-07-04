import { StyleSheet } from 'react-native';

export default styles = StyleSheet.create({

    contenedor: {
        display: 'flex',
        flexDirection: 'column',
        marginTop: 20,
        backgroundColor: '#F2E8E1',
        margin: '2%',
        padding: 10,
        borderRadius: 10,
        height: '61%',
    },

    barraBusqueda: {
        backgroundColor: 'white',
        padding: 10,
        margin: 10,
        marginRight: 28,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
        width: '60%',
    },

    cabeceraBusqueda: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    tituloLista: {
        color: 'black',
        fontSize: 25,
        marginLeft: 40,
        fontWeight: 'bold',
    },

    listaPacientes: {
        marginTop: 20,
        height: '80%',
    },

});