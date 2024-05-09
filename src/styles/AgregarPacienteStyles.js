import RNDateTimePicker from '@react-native-community/datetimepicker';
import { da, ro } from 'date-fns/locale';
import { StyleSheet} from 'react-native';

export default AgregarPacientesStyles = StyleSheet.create({
    
    contenedor: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#F2E8E1',
        margin: '2%',
        marginBottom: 0,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
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
        marginBottom: 20,
        backgroundColor: '#F2E8E1',
        margin: '2%',
        marginTop: 0,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
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
        justifyContent: 'space-between',
    },

    inputGroup: {
        marginBottom: 50,
        width: 300,
    },

    inputGroupRow: {
        display: 'flex',
        marginBottom: 50,
        width: 300,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent: 'center',
        alignItems: 'center',
    },

    label: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 5,
    },

    input: {
        backgroundColor: 'white',
        width: '100%',
        height: 40,
        borderRadius: 10,
        paddingLeft: 10,
        fontSize: 20,
    },

    genero: {
        backgroundColor: 'white',
        width: '100%',
        height: 40,
        borderRadius: 10,
        paddingLeft: 10,
        fontSize: 20,
    },

    picker: {
        width: '100%',
        backgroundColor: 'white',
        borderRadius: 10,
        fontSize: 20,
    }, 

    datePicker: {
        borderRadius: 10,
        fontSize: 20,
        alignItems: 'left', // Asegura que los contenidos internos estén centrados
        justifyContent: 'center',    
        margin: 0,    
    },

    
    observaciones: {
        height: 200,
        width: '100%',
    },

    inputGroupObservaciones: {
        
    },

    // Para la selección de género ****/

    radioGroup: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },

    radio: {
        padding: 10,
        margin: 5,
        backgroundColor: '#ddd',
        borderWidth: 2,
        borderColor: '#ccc',
        borderRadius: 10,
    },

    radioSelected: {
        borderColor: '#007bff',
    },

    radioText: {
        fontSize: 16,
    },    

    //************************************/
});