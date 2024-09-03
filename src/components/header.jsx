import React from "react";
import { View, Image, TouchableOpacity } from "react-native";
import HeaderStyles from '../styles/HeaderStyles';
import settings from '../../assets/settings.png';
import goBack from '../../assets/images/goBack.png';

const Header = ({ navigation }) => {

  return (
    <View style={HeaderStyles.header}>
      <TouchableOpacity style={HeaderStyles.volver} onPress={() => navigation.goBack()}>
        <Image source={goBack} style={HeaderStyles.volverImg} />
      </TouchableOpacity>
      <Image source={require('../../assets/images/logo.jpg')} style={HeaderStyles.logo} />
      <TouchableOpacity style={HeaderStyles.ajustes} onPress={() => navigation.navigate('Ajustes')}>
        <Image source={settings} style={HeaderStyles.ajustesImg} />
      </TouchableOpacity>
    </View>
  );
}

export default Header;