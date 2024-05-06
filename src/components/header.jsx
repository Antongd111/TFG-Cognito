import React from "react";
import Constants from "expo-constants";
import { Text, View, StyleSheet, Image } from "react-native";
import HeaderStyles from '../styles/HeaderStyles';

const Header = () => {

  return (
    <View style={HeaderStyles.header}>
        <Image source={require('../../assets/images/logo.jpg')} style={HeaderStyles.logo} />
    </View>
  );
}

export default Header;