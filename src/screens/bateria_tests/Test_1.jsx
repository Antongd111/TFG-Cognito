import React, { useState, useEffect } from 'react';
import { View, Image, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import InstruccionesModal from '../../components/instrucciones';
import PreguntaIniciarTest from '../../components/preguntaIniciarTest';
import MenuComponent from '../../components/menu';
import { guardarResultadosTest_1, crearSesionTest } from '../../api/TestApi';
import styles from '../../styles/ComunStyles';
import clownImage from '../../../assets/images/payaso.png';
import { format } from 'date-fns';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getTranslation } from "../../locales";
import { useIsFocused } from '@react-navigation/native';

const Test_1 = ({ navigation, route }) => {
  const idPaciente = route.params.idPaciente;
  const [idSesion, setIdSesion] = useState(route.params?.idSesion || null); // Usar la sesión existente o crear una nueva
  const [prueba, setPrueba] = useState(true);
  const [modalVisible, setModalVisible] = useState(true);
  const [preguntaIniciarTest, setPreguntaIniciarTest] = useState(false);
  const [payasoVisible, setPayasoVisible] = useState(false);
  const [startTime, setStartTime] = useState(0);
  const [ultimoTiempo, setUltimoTiempo] = useState(0);
  const [reactionTimes, setReactionTimes] = useState([]);
  const [erroresAnticipacion, setErroresAnticipacion] = useState(0);
  const [erroresTiempo, setErroresTiempo] = useState(0);
  const [erroresRetrasos, setErroresRetrasos] = useState(0);
  const [ensayosCompletados, setEnsayosCompletados] = useState(0);
  const [translations, setTranslations] = useState({});
  const isFocused = useIsFocused();

  useEffect(() => {
    const loadLanguage = async () => {
      const savedLanguage = await AsyncStorage.getItem('language');
      const lang = savedLanguage || 'es';
      setTranslations(getTranslation(lang));
    };

    if (isFocused) {
      loadLanguage();
    }
  }, [isFocused]);

  useEffect(() => {
    const crearSesionSiNoExiste = async () => {
      if (!idSesion) {
        const nuevaSesion = await crearSesionTest(idPaciente, format(new Date(), 'dd/MM/yyyy'));
        setIdSesion(nuevaSesion);
      }
    };

    crearSesionSiNoExiste();
  }, [idSesion]);

  useEffect(() => {
    if (!modalVisible && prueba) {
      iniciarEnsayo();
    }
  }, [modalVisible, ensayosCompletados]);

  useEffect(() => {
    if (payasoVisible) {
      setStartTime(Date.now());
    }
  }, [payasoVisible]);

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  const mostrarPayaso = () => {
    const delay = Math.floor(Math.random() * (5000 - 3000 + 1)) + 3000;
    sleep(delay).then(() => {
      setPayasoVisible(true);
    }
    );

  };

  const iniciarEnsayo = () => {
    if (ensayosCompletados < 5 && prueba) {
      mostrarPayaso();
    } else {
      preguntarSobreTestReal();
    }
  };

  const iniciarTestReal = () => {
    if (reactionTimes.length < 12 && ensayosCompletados < 36) {
      mostrarPayaso();
    } else {
      almacenarResultados();
    }
  };

  const almacenarResultados = async () => {
    try {
      console.log("Guardando resultados...");
      await guardarResultadosTest_1(idSesion, ensayosCompletados, reactionTimes, erroresAnticipacion, erroresTiempo, erroresRetrasos);
      navigation.navigate('Test_2', { idPaciente, idSesion });
    } catch (error) {
      Alert.alert("Error", "Ha ocurrido un error al añadir los resultados a la Base de Datos.");
    }
  };

  const manejarRespuesta = () => {
    const reactionTime = Date.now() - startTime;
    setUltimoTiempo(reactionTime);
    setEnsayosCompletados(ensayosCompletados + 1);
    setPayasoVisible(false);

    if (prueba) {
      setTimeout(iniciarEnsayo, 3000);
    } else {
      if (reactionTime < 100) {
        setErroresAnticipacion(erroresAnticipacion + 1);
      } else if (reactionTime < 500) {
        setReactionTimes([...reactionTimes, reactionTime]);
      } else if (reactionTime < 2000) {
        setErroresRetrasos(erroresRetrasos + 1);
      } else {
        setErroresTiempo(erroresTiempo + 1);
      }

      setTimeout(iniciarTestReal, 3000);
    }
  };

  const preguntarSobreTestReal = () => {
    setReactionTimes([]);
    setEnsayosCompletados(0);
    setPreguntaIniciarTest(true);
  };

  const comenzarTestReal = () => {
    setPrueba(false);
    setPayasoVisible(false);
    setTimeout(iniciarTestReal, 2000);
  };

  const repetirPruebas = () => {
    setPayasoVisible(false);
    setTimeout(iniciarEnsayo, 2000);
  };

  return (
    <View style={styles.borde_tests}>
      <View style={styles.contenedor_test}>
        <MenuComponent
          onToggleVoice={() => {}}
          onNavigateHome={() => navigation.navigate('Pacientes')}
          onNavigateNext={() => navigation.navigate('Test_2', { idSesion })}
        />
        <InstruccionesModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          title="Test 1"
          instructions={translations.pr01ItemStart}
        />

        {preguntaIniciarTest && (
          <PreguntaIniciarTest
            visible={preguntaIniciarTest}
            onClose={() => setPreguntaIniciarTest(false)}
            onRepeatTests={repetirPruebas}
            onStartRealTests={comenzarTestReal}
            title="Test 1"
            instructions={translations.Pr01PreguntaIniciar}
          />
        )}

        <View style={stylesTest1.contador}>
          <Text style={stylesTest1.textoContador}>{ultimoTiempo} ms</Text>
        </View>

        {payasoVisible && (
          <TouchableOpacity onPress={manejarRespuesta} style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Image source={clownImage} style={{ maxWidth: 450, maxHeight: 400 }} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const stylesTest1 = StyleSheet.create({
  contador: {
    alignSelf: 'center',
    width: 100,
    borderWidth: 2,
    borderColor: '#D2B48C',
    borderTopWidth: 0,
  },
  textoContador: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Test_1;