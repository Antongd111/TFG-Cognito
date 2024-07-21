import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import InstruccionesModal from '../../components/instrucciones';
import MenuComponent from '../../components/menu';
import stylesComunes from '../../styles/ComunStyles';


const Test_5 = ({ navigation, route }) => {

    const [modalVisible, setModalVisible] = useState(true);

    /******************** MENÚ DE EVALUACIÓN ********************/
    const handleToggleVoice = () => {
        console.log("Toggle voice feature");
    };

    const handleNavigateHome = () => {
        navigation.navigate('Pacientes');
    };

    const handleNavigateNext = () => {
        navigation.navigate('Test_6', { idSesion: route.params.idSesion });
    };

    const handleNavigatePrevious = () => {
        navigation.goBack();
    };

    /***************** FIN MENÚ DE EVALUACIÓN *****************/
    return (
        <View style={stylesComunes.borde_tests}>
            <View style={stylesComunes.contenedor_test}>
                <MenuComponent
                    onToggleVoice={handleToggleVoice}
                    onNavigateHome={handleNavigateHome}
                    onNavigateNext={handleNavigateNext}
                    onNavigatePrevious={handleNavigatePrevious}
                />
                <InstruccionesModal
                    visible={modalVisible}
                    onClose={() => setModalVisible(false)}
                    title="Test 6"
                    instructions="Test 6."
                />
                {!modalVisible && (
                    <View></View>
                )}
            </View>
        </View>
    );
};


export default Test_5;