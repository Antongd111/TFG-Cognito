import React, { useState, useEffect } from 'react';
import InstruccionesModal from '../../components/instrucciones';
import PreguntaIniciarTest from '../../components/preguntaIniciarTest';
import { View, Image, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import styles from '../../styles/ComunStyles';
import clownImage from '../../../assets/images/payaso.png';
import { guardarResultadosTest_1 } from '../../api/PacienteApi';


const Test_1 = ({ navigation, route }) => {
  
  const { idPaciente } = route.params;

  const totalEnsayosPrueba = 5;
  const totalEnsayosReales = 36;
  const totalEnsayosValidos = 12;
  const min = 4000;
  const max = 10000;

  const [prueba, setPrueba] = useState(true);
  const [modalVisible, setModalVisible] = useState(true);
  const [preguntaIniciarTest, setPreguntaIniciarTest] = useState(false);
  const [payasoVisible, setPayasoVisible] = useState(false);
  const [startTime, setStartTime] = useState(0);
  const [ultimoTiempo, setUltimoTiempo] = useState(0);

  // DATOS PARA LOS RESULTADOS
  const [reactionTimes, setReactionTimes] = useState([]);
  const [erroresAnticipacion, setErroresAnticipacion] = useState(0);
  const [erroresTiempo, setErroresTiempo] = useState(0);
  const [erroresRetrasos, setErroresRetrasos] = useState(0);

  const [ensayosCompletados, setEnsayosCompletados] = useState(0);

  useEffect(() => {
    if (!modalVisible && prueba) {
      iniciarPrueba();
    }
  }, [modalVisible, ensayosCompletados]);

  // Cuando el payaso se muestra, se inicia el contador de tiempo
  useEffect(() => {
    if (payasoVisible) {
      setStartTime(Date.now());
    }
  }, [payasoVisible]);

  // Muestra el payaso tras un tiempo aleatorio de mínimo 4 segundos y máximo 10 segundos
  const mostrarPayaso = () => {
    const delay = Math.floor(Math.random() * (max - min + 1)) + min;
    setTimeout(() => {
      setPayasoVisible(true);
    }, delay);
  };

  /**
   * Inicia el test de reacción. Muestra el payaso y comienza el contador de tiempo.
   */
  const iniciarPrueba = () => {
    if (ensayosCompletados < totalEnsayosPrueba) {
      mostrarPayaso();
    } else {
      preguntarSobreTestReal();
    }
  };

  /**
   * Inicia el test real. Muestra el payaso y comienza el contador de tiempo.
   */
  const iniciarTestReal = () => {
    if ((ensayosCompletados < totalEnsayosReales) && (reactionTimes.length < totalEnsayosValidos)) {
      mostrarPayaso();
    } else {
      almacenarResultados();
    }
  }

  const almacenarResultados = async () => {
    try {
      // Llamar a la función de añadir paciente y esperar el resultado
      const a = await guardarResultadosTest_1(idPaciente, reactionTimes, erroresAnticipacion, erroresTiempo, erroresRetrasos);
      console.log("Éxito", "Resultados almacenados.");
      navigation.navigate('Test_2', { idPaciente: idPaciente });
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Ha ocurrido un error al añadir los resultados a la Base de Datos.");
    }
  }

  /**
   * Maneja la pulsación del payaso. Calcula el tiempo de reacción y lo almacena.
   */
  const handlePressClown = () => {
    const reactionTime = Date.now() - startTime;
    setUltimoTiempo(reactionTime);
    setEnsayosCompletados(ensayosCompletados + 1);
    setPayasoVisible(false);

    if (prueba)
      setTimeout(
        iniciarPrueba, 3000);
    else {
      if (reactionTime < 100)
        setErroresAnticipacion(erroresAnticipacion + 1);
      else if (reactionTime < 500)
        setReactionTimes([...reactionTimes, reactionTime]);
      else if (reactionTime < 2000)
        setErroresRetrasos(erroresRetrasos + 1);
      else
        setErroresTiempo(erroresTiempo + 1);

      setTimeout(
        iniciarTestReal, 3000);
    }
  };

  /**
   * Reinicia los contadores y pregunta al usuario si desea comenzar con el test real, mostrando el modal.
   */
  const preguntarSobreTestReal = () => {
    setReactionTimes([]);
    setEnsayosCompletados(0);
    setPreguntaIniciarTest(true);
  };

  /**
   * Cambia el estado de la prueba a falso y comienza con el test real.
   */
  const handleStartRealTests = () => {
    setPrueba(false);
    setPayasoVisible(false);
    setTimeout(iniciarTestReal, 5000);
  };

  /**
   * Vuelve a repetir los ensayos de prueba.
   */
  const handleRepeatTests = () => {
    setPayasoVisible(false);
    setTimeout(iniciarPrueba, 5000);
  }

  return (
    <View style={styles.borde_tests}>
      <View style={styles.contenedor_test}>
        <InstruccionesModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          title="Test 1"
          instructions="Toca la pantalla tan rápido como pueda cuando vea aparecer el payaso. Pulsa el botón de abajo para comenzar con unos ensayos de prueba."
        />

        {preguntaIniciarTest && (
          <PreguntaIniciarTest
            visible={preguntaIniciarTest}
            onClose={() => setPreguntaIniciarTest(false)}
            onRepeatTests={handleRepeatTests}
            onStartRealTests={handleStartRealTests}
            title="Test 1"
            instructions="Puedes seguir practicando o comenzar con los ensayos reales. ¿Estás listo?"
          />
        )}
        <View style={stylesTest1.contador}>
          <Text style={stylesTest1.textoContador}>{ultimoTiempo} ms</Text>
        </View>
        {payasoVisible && (
          <TouchableOpacity onPress={handlePressClown} style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Image source={clownImage} style={{ maxWidth: 350, maxHeight: 400 }} />
          </TouchableOpacity>
        )}

        {/* {prueba ? <Text>Modo de prueba activo</Text> : <Text>Test real en curso</Text>}
      <Text>Reacción: {reactionTimes.join(', ')}</Text>
      <Text>Errores de anticipación: {erroresAnticipacion}</Text>
      <Text>Errores de tiempo: {erroresTiempo}</Text>
      <Text>Errores de retrasos: {erroresRetrasos}</Text> */}
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