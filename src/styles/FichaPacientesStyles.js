import { StyleSheet} from 'react-native';

export default FichaPacientesStyle = StyleSheet.create({
    
    titulo: {
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 20,
    },

    contenedor: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: 20,
        backgroundColor: '#F2E8E1',
        margin: '2%',
        padding: 10,
        borderRadius: 10,
        height: '68%',
    },

    contenedor_datos: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginLeft: 10,
        width: '70%',
    },

    row: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '50%',
    },

    inputGroup: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'left',
        width: '100%',
        margin: 5,
    },

    label: {
        fontWeight: 'bold',
        fontSize: 20,
    },

    input: {
        backgroundColor: 'white',
        width: 320,
        height: 40,
        borderRadius: 10,
        paddingLeft: 10,
        fontSize: 20,
        marginTop: 10,
    },

    observaciones: {
        height: 200,
        overflow: 'scroll',
        width: 720,
    },

    identificacion: {
        width: 320,
    },

    contenedor_tests: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginLeft: 10,
        width: '28%',
    },

    tituloTests: {
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 20,
    },

    lista_tests: {
        backgroundColor: 'white',
        width: '100%',
        height: '80%',
        borderRadius: 10,
        margin: 5,
        marginTop: 20,        
    },
});