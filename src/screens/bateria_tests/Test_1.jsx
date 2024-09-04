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
  const [idSesion, setIdSesion] = useState(route.params?.idSesion || null);
  const [prueba, setPrueba] = useState(true);
  const [modalVisible, setModalVisible] = useState(true);
  const [preguntaIniciarTest, setPreguntaIniciarTest] = useState(false);
  const [payasoVisible, setPayasoVisible] = useState(false);
  const [startTime, setStartTime] = useState(0);
  const [ultimoTiempo, setUltimoTiempo] = useState(0);

  // RESULTADOS
  const [tiemposReaccion, setTiemposReaccion] = useState([]);
  const [erroresAnticipacion, setErroresAnticipacion] = useState(0);
  const [erroresTiempo, setErroresTiempo] = useState(0);
  const [erroresRetrasos, setErroresRetrasos] = useState(0);
  const [ensayosCompletados, setEnsayosCompletados] = useState(0);


  /** CARGA DE TRADUCCIONES *******************************************/

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

  /** FIN CARGA DE TRADUCCIONES **************************************/

  /**
   * Al renderizar, se comprueba el estado de idSesion. Si no existe, se crea una nueva.
   */
  useEffect(() => {
    const crearSesionSiNoExiste = async () => {
      if (!idSesion) {
        const nuevaSesion = await crearSesionTest(idPaciente, format(new Date(), 'dd/MM/yyyy'));
        setIdSesion(nuevaSesion);
      }
    };

    crearSesionSiNoExiste();
  }, [idSesion]);

  /**
   * Empieza el test de entrenamiento cuando se cierre el modal de instrucciones.
   */
  useEffect(() => {
    if (!modalVisible && prueba) {
      iniciarEnsayoEntrenamiento();
    }
  }, [modalVisible, ensayosCompletados]);

  /**
   * Empieza el contador de tiempo en cuanto el payaso aparece en pantalla.
   */
  useEffect(() => {
    if (payasoVisible) {
      setStartTime(Date.now());
    }
  }, [payasoVisible]);

  useEffect(() => {
    if (tiemposReaccion.length === 12 && ensayosCompletados === 36) {
      almacenarResultados();
    }
  }, [ensayosCompletados]);


  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Genera un tiempo aleatorio entre 3 y 5 segundos. Tras ese tiempo, aparece el payaso en pantalla.
   */
  const mostrarPayaso = () => {
    const delay = Math.floor(Math.random() * (5000 - 3000 + 1)) + 3000;
    sleep(delay).then(() => {
      setPayasoVisible(true);
    }
    );
  };

  /**
   * Maneja el inicio de los ensayos de entrenamiento. Si ya se han hecho 5, se muestra el modal avisando
   * que el test va a empezar.
   */
  const iniciarEnsayoEntrenamiento = () => {
    if (ensayosCompletados < 5 && prueba) {
      mostrarPayaso();
    } else {
      preguntarSobreTestReal();
    }
  };

  /**
   * Maneja el inicio de un ensayo real. Si hay 12 ensayos válidos o 36 totales, se acaba el test y se
   * almacenan resultados.
   */
  const iniciarEnsayo = () => {
    if (tiemposReaccion.length < 12 && ensayosCompletados < 36) {
      mostrarPayaso();
    }
  };

  /**
   * Maneja el toque de la pantalla. Calcula el tiempo tardado en tocar desde que aparece el payaso y:
   * - Si t < 100 se suma un error de anticipación
   * - Si 100 < t < 500 se suma un acierto
   * - Si 500 < t < 2000 se suma un error por retraso
   * - Si 2000 < t se suma un error de tiempo
   */
  const manejarRespuesta = () => {
    const reactionTime = Date.now() - startTime;
    setUltimoTiempo(reactionTime);
    setEnsayosCompletados(ensayosCompletados + 1);
    setPayasoVisible(false);

    if (prueba) {
      setTimeout(iniciarEnsayoEntrenamiento, 3000);
    } else {
      if (reactionTime < 100) {
        setErroresAnticipacion(erroresAnticipacion + 1);
      } else if (reactionTime < 500) {
        console.log(reactionTime);
        setTiemposReaccion([...tiemposReaccion, reactionTime]);
      } else if (reactionTime < 2000) {
        setErroresRetrasos(erroresRetrasos + 1);
      } else {
        setErroresTiempo(erroresTiempo + 1);
      }

      setTimeout(iniciarEnsayo, 3000);
    }
  };

  /**
   * Almacena los resultados en BD.
   */
  const almacenarResultados = async () => {
    try {
      await guardarResultadosTest_1(idSesion, ensayosCompletados, tiemposReaccion, erroresAnticipacion, erroresTiempo, erroresRetrasos);
      navigation.replace('Test_2', { idPaciente, idSesion });
    } catch (error) {
      Alert.alert("Error", "Ha ocurrido un error al añadir los resultados a la Base de Datos.");
    }
  };



  /**
   * Inicializa variables para preguntar si se quiere comenzar con el test real o seguir entrenando
   */
  const preguntarSobreTestReal = () => {
    setTiemposReaccion([]);
    setEnsayosCompletados(0);
    setPreguntaIniciarTest(true);
  };

  /**
   * Inicializa variables para empezar los ensayos reales.
   */
  const comenzarTestReal = () => {
    setPrueba(false);
    setPayasoVisible(false);
    setTimeout(iniciarEnsayo, 2000);
  };

  /**
   * Inicializa variables para repetir los ensayos de entrenamiento
   */
  const repetirPruebas = () => {
    setPayasoVisible(false);
    setTimeout(iniciarEnsayoEntrenamiento, 2000);
  };

  return (
    <View style={styles.borde_tests}>
      <View style={styles.contenedor_test}>
        <MenuComponent
          onNavigateHome={() => navigation.replace('Pacientes')}
          onNavigateNext={() => navigation.replace('Test_2', { idSesion })}
        />
        <InstruccionesModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          title={translations.Pr01Titulo}
          instructions={translations.pr01ItemStart}
        />

        {preguntaIniciarTest && (
          <PreguntaIniciarTest
            visible={preguntaIniciarTest}
            onClose={() => setPreguntaIniciarTest(false)}
            onRepeatTests={repetirPruebas}
            onStartRealTests={comenzarTestReal}
            title={translations.Pr01Titulo}
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