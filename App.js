import Main from './src/screens/Main';
import * as Font from 'expo-font';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { AppLoading } from 'expo';
import { Text } from 'react-native';
import initDB from './src/database/db';
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-reanimated';


const customFonts = {
  'K2D-Bold': require('./assets/fonts/K2D-Bold.ttf'),
};

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  async function loadFonts() {
    await Font.loadAsync(customFonts);
    setFontsLoaded(true);
  }
  
  useEffect(() => {
    loadFonts();
  }, []);
  
  useEffect(() => {
    initDB();
  }, []);

  if (!fontsLoaded) {
    return <Text>No ha cargao la fuente.</Text>;
  }

  return (
    <NavigationContainer>
      <Main />
    </NavigationContainer>
    
  );
}
