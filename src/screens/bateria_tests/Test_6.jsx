//TODO: COMPROBAR ESTE TEST

import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import InstruccionesModal from '../../components/instrucciones';
import MenuComponent from '../../components/menu';
import stylesComunes from '../../styles/ComunStyles';
import { guardarResultadosTest_6 } from '../../api/TestApi';
import { Audio } from 'expo-av';

import figura_1 from '../../../assets/images/Test_5/figura_1.png';
import figura_2 from '../../../assets/images/Test_5/figura_2.png';
import figura_3 from '../../../assets/images/Test_5/figura_3.png';
import figura_4 from '../../../assets/images/Test_5/figura_4.png';
import figura_5 from '../../../assets/images/Test_5/figura_5.png';
import figura_6 from '../../../assets/images/Test_5/figura_6.png';
import figura_7 from '../../../assets/images/Test_5/figura_7.png';
import figura_8 from '../../../assets/images/Test_5/figura_8.png';

import pitidoLargo from '../../../assets/sounds/pitido_largo.mp3';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getTranslation } from "../../locales";
import { useIsFocused } from '@react-navigation/native';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const figuraSize = 50;
const maxTime = 10; // 10 segundos para introducir el número de sonidos

const imagenesFiguras = {
  figura_1, figura_2, figura_3, figura_4, figura_5, figura_6, figura_7, figura_8
};

const Test_6 = ({ navigation, route }) => {
  const [modalVisible, setModalVisible] = useState(true);
  const [modalEnsayoReal, setModalEnsayoReal] = useState(false);
  const [figuras, setFiguras] = useState([]);
  const [mostrarFiguraCorrecta, setMostrarFiguraCorrecta] = useState(true);
  const [figuraCorrecta, setFiguraCorrecta] = useState(null);
  const [ensayoActual, setEnsayoActual] = useState(0);
  const [tiempoRestante, setTiempoRestante] = useState(maxTime);
  const [correctos, setCorrectos] = useState(0);
  const [incorrectos, setIncorrectos] = useState(0);
  const [erroresTiempo, setErroresTiempo] = useState(0);
  const [sonidosContados, setSonidosContados] = useState(0);
  const [contadorSonidos, setContadorSonidos] = useState(0);
  const [inputSonidos, setInputSonidos] = useState('');
  const [faseContarSonidos, setFaseContarSonidos] = useState(false);
  const [translations, setTranslations] = useState({});
  const isFocused = useIsFocused();
  const numeroEnsayos = 12; // 2 de entrenamiento y 10 reales
  let sonidoInterval = null;

  useEffect(() => {
    const loadLanguage = async () => {
      const savedLanguage = await AsyncStorage.getItem('language');
      const lang = savedLanguage || 'es';
      setTranslations(getTranslation(lang));
    };

    if (isFocused) loadLanguage();
  }, [isFocused]);

  useEffect(() => {
    if (!modalVisible) iniciarEnsayo();
  }, [modalVisible]);

  useEffect(() => {
    if (faseContarSonidos && tiempoRestante > 0) {
      const timer = setInterval(() => setTiempoRestante(prev => prev - 1), 1000);
      return () => clearInterval(timer);
    } else if (tiempoRestante === 0) manejarErrorDeTiempo();
  }, [tiempoRestante, faseContarSonidos]);

  useEffect(() => {
    const guardarResultados = async () => {
      await guardarResultadosTest_6(route.params.idSesion, correctos, incorrectos, erroresTiempo, sonidosContados);
      navigation.navigate('Resultados', { idSesion: route.params.idSesion });
    };

    if (ensayoActual > numeroEnsayos) guardarResultados();
  }, [ensayoActual]);

  const generarPosicionAleatoria = (figurasExistentes) => {
    let newX, newY, overlap;
    do {
      overlap = false;
      newX = Math.floor(Math.random() * (screenWidth - figuraSize * 2));
      newY = Math.floor(Math.random() * (screenHeight - figuraSize * 2));
      overlap = figurasExistentes.some(fig => Math.abs(newX - fig.x) < figuraSize && Math.abs(newY - fig.y) < figuraSize);
    } while (overlap);
    return { x: newX, y: newY };
  };

  const generarFiguras = () => {
    const nuevasFiguras = [];
    const tipos = Object.keys(imagenesFiguras);
    const tipoCorrecto = tipos[Math.floor(Math.random() * tipos.length)];

    for (let i = 0; i < 2; i++) {
      nuevasFiguras.push({ tipo: tipoCorrecto, ...generarPosicionAleatoria(nuevasFiguras), esCorrecta: true });
    }

    for (let i = 0; i < 18; i++) {
      const tipoIncorrecto = tipos[Math.floor(Math.random() * tipos.length)];
      if (tipoIncorrecto !== tipoCorrecto) {
        nuevasFiguras.push({ tipo: tipoIncorrecto, ...generarPosicionAleatoria(nuevasFiguras), esCorrecta: false });
      }
    }

    setFiguras(nuevasFiguras);
    setFiguraCorrecta(imagenesFiguras[tipoCorrecto]); // Almacena la figura correcta para mostrarla como modelo
  };

  const reproducirSonido = async () => {
    const { sound } = await Audio.Sound.createAsync(pitidoLargo);
    await sound.playAsync();
    setContadorSonidos(prev => prev + 1);
    setTimeout(() => sound.unloadAsync(), 1000);
  };

  const iniciarEnsayo = () => {
    if (ensayoActual < 2) {
      // Fase de entrenamiento
      if (ensayoActual === 1) setModalEnsayoReal(true);
      else prepararEnsayo();
    } else if (ensayoActual < numeroEnsayos) prepararEnsayo();
  };

  const prepararEnsayo = () => {
    generarFiguras();
    setMostrarFiguraCorrecta(true);
    setTiempoRestante(maxTime);
    setContadorSonidos(0);
    setFaseContarSonidos(false);
    setInputSonidos('');

    sonidoInterval = setInterval(() => {
      if (!faseContarSonidos) reproducirSonido();
    }, 2000);

    setTimeout(() => setMostrarFiguraCorrecta(false), 2000);
  };

  const manejarSeleccionFigura = (index) => {
    const figura = figuras[index];
    if (figura.seleccionada) return;

    const nuevasFiguras = figuras.map((fig, i) => i === index ? { ...fig, seleccionada: true } : fig);
    setFiguras(nuevasFiguras);

    if (figura.esCorrecta && nuevasFiguras.filter(fig => fig.esCorrecta && fig.seleccionada).length === 2) {
      clearInterval(sonidoInterval);
      setFaseContarSonidos(true);
      setTiempoRestante(maxTime);
    } else if (!figura.esCorrecta) setIncorrectos(prev => prev + 1);
  };

  const manejarErrorDeTiempo = () => {
    setErroresTiempo(prev => prev + 1);
    siguienteEnsayo();
  };

  const handleNumberPress = (number) => {
    setInputSonidos(inputSonidos + number);
  };

  const manejarConfirmarSonidos = () => {
    const numeroSonidos = parseInt(inputSonidos, 10);
    if (!isNaN(numeroSonidos)) {
      setSonidosContados(prev => prev + numeroSonidos);
      setCorrectos(prev => prev + 1);
      siguienteEnsayo();
    }
  };

  const siguienteEnsayo = () => {
    setEnsayoActual(prev => prev + 1);
    setFaseContarSonidos(false);
    iniciarEnsayo();
  };

  return (
    <View style={stylesComunes.borde_tests}>
      <View style={stylesComunes.contenedor_test}>
        <MenuComponent
          onToggleVoice={() => { }}
          onNavigateHome={() => navigation.navigate('Pacientes')}
          onNavigateNext={() => navigation.navigate('Resultados', { idSesion: route.params.idSesion })}
          onNavigatePrevious={() => navigation.navigate('Test_5', { idSesion: route.params.idSesion })}
        />
        <InstruccionesModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          title="Test 6"
          instructions={translations?.pr06ItemStart + "\n \n" + translations?.ItemStartBasico}
        />
        <InstruccionesModal
          visible={modalEnsayoReal}
          onClose={() => {
            setModalEnsayoReal(false);
            setEnsayoActual(2);
            iniciarEnsayo();
          }}
          title="Test 6"
          instructions={translations?.ItemStartBasico}
        />
        {/* Mostrar la figura modelo */}
        {!modalVisible && mostrarFiguraCorrecta && figuraCorrecta && (
          <View style={styles.figuraModeloContainer}>
            <Image source={figuraCorrecta} style={styles.figuraModelo} />
          </View>
        )}
        {!modalVisible && !faseContarSonidos && !mostrarFiguraCorrecta && (
          <View>
            {figuras.map((fig, index) => (
              <TouchableOpacity
                key={index}
                style={{ position: 'absolute', left: fig.x, top: fig.y }}
                onPress={() => manejarSeleccionFigura(index)}
              >
                <Image
                  source={imagenesFiguras[fig.tipo]}
                  style={{
                    height: figuraSize,
                    width: figuraSize,
                    tintColor: fig.seleccionada ? (fig.esCorrecta ? 'blue' : 'red') : undefined
                  }}
                />
              </TouchableOpacity>
            ))}
          </View>
        )}
        {faseContarSonidos && (
          <View style={styles.numberPad}>
            <Text style={styles.inputDisplay}>{inputSonidos}</Text>
            <View style={styles.row}>
              {['1', '2', '3'].map(number => (
                <TouchableOpacity key={number} style={styles.numberButton} onPress={() => handleNumberPress(number)}>
                  <Text style={styles.numberText}>{number}</Text>
                </TouchableOpacity>
              ))}
            </View>
            <View style={styles.row}>
              {['4', '5', '6'].map(number => (
                <TouchableOpacity key={number} style={styles.numberButton} onPress={() => handleNumberPress(number)}>
                  <Text style={styles.numberText}>{number}</Text>
                </TouchableOpacity>
              ))}
            </View>
            <View style={styles.row}>
              {['7', '8', '9'].map(number => (
                <TouchableOpacity key={number} style={styles.numberButton} onPress={() => handleNumberPress(number)}>
                  <Text style={styles.numberText}>{number}</Text>
                </TouchableOpacity>
              ))}
            </View>
            <View style={styles.row}>
              <TouchableOpacity style={styles.numberButton} onPress={() => setInputSonidos(inputSonidos.slice(0, -1))}>
                <Text style={styles.numberText}>Del</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.numberButton} onPress={() => handleNumberPress('0')}>
                <Text style={styles.numberText}>0</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.numberButton} onPress={manejarConfirmarSonidos}>
                <Text style={styles.numberText}>OK</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  figuraModeloContainer: {
    alignItems: 'center',
    marginBottom: 20,
    marginTop: '30%'
  },
  figuraModeloLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5
  },
  figuraModelo: {
    height: figuraSize * 2,
    width: figuraSize * 2
  },
  numberPad: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    borderWidth: 1,
    width: '40%',
    borderRadius: 10,
    borderColor: '#ccc',
    height: '80%',
    alignSelf: 'center',
  },
  inputDisplay: {
    fontSize: 24,
    marginBottom: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    width: '70%',
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    marginTop: 10,
  },
  numberButton: {
    backgroundColor: '#F2E8E1',
    padding: 30,
    borderRadius: 30,
    marginHorizontal: 20,
  },
  numberText: {
    fontSize: 20,
  },
});

export default Test_6;