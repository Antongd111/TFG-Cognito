import React from "react";
import { View, Image, TouchableOpacity } from "react-native";
import HeaderStyles from '../styles/HeaderStyles';
import settings from '../../assets/settings.png';

const Header = ({ navigation }) => {

  return (
    <View style={HeaderStyles.header}>
      <Image source={require('../../assets/images/logo.jpg')} style={HeaderStyles.logo} />
      <TouchableOpacity style={HeaderStyles.ajustes} onPress={() => navigation.navigate('Ajustes')}>
        <Image source={settings} style={HeaderStyles.ajustesImg} />
      </TouchableOpacity>
    </View>
  );
}

export default Header;