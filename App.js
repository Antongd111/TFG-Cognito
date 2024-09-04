import Main from './src/screens/Main';
import * as Font from 'expo-font';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { AppLoading } from 'expo';
import { Text } from 'react-native';
import initDB from './src/database/db';
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-reanimated';
import * as ScreenOrientation from 'expo-screen-orientation';

export default function App() {

  // Bloquear la orientación en modo vertical
  const lockOrientation = async () => {
    await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT);
  };

  useEffect(() => {
    // Inicializamos la base de datos
    initDB();

    // Bloqueamos la orientación al cargar la app
    lockOrientation();
  }, []);

  return (
    <NavigationContainer>
      <Main />
    </NavigationContainer>
  );
}