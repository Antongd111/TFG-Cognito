import { StyleSheet} from 'react-native';

export default HeaderStyles = StyleSheet.create({
    
    header: {
        marginBottom: 10,
        justifyContent: 'center',
        alignContent: 'center',
        backgroundColor: '#F2E8E1',
    },

    logo: {
        margin: 30,
        width: 100,
        height: 100,
        borderRadius: 10,
        alignSelf: 'center',
    },

    ajustes: {
        width: 50,
        height: 50,
        position: 'absolute',
        right: 20,
        top: 50,
    },

    ajustesImg: {
        width: 50,
        height: 50,
    },

    volver: {
        width: 50,
        height: 50,
        position: 'absolute',
        left: 20,
        top: 50,
    },

    volverImg: {
        width: 50,
        height: 50,
    }

});