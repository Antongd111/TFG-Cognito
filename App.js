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

const customFonts = {
  'K2D-Bold': require('./assets/fonts/K2D-Bold.ttf'),
};

export default function App() {

  useEffect(() => {
    initDB();
  }, []);

  return (
    <NavigationContainer>
      <Main />
    </NavigationContainer>
    
  );
}


