import { ro } from 'date-fns/locale';
import { StyleSheet} from 'react-native';

export default AgregarPacientesStyles = StyleSheet.create({
    
    contenedor: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#F2E8E1',
        margin: '2%',
        borderRadius: 10,
        paddingLeft: 20,
        paddingRight: 20,
        
    },

    titulo: {
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 20,
    },

    contenedorBotones: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        margin: 20,
    },


    formulario: {
        marginTop: 20,
        display: 'flex',
        flexDirection: 'column',
    },

    row: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        justifyContent: '',
    },

    inputGroup: {
        marginBottom: 10,
        width: 300,
    },

    label: {
        fontSize: 20,
        fontWeight: 'bold',
    },

    input: {
        backgroundColor: 'white',
        width: '100%',
        height: 40,
        borderRadius: 10,
        paddingLeft: 10,
    },

    
});