import React from 'react';
import {View, StyleSheet} from 'react-native';
import {TextInput, Headline, Button} from 'react-native-paper';
import globalStyles from '../styles/global';

const NuevoCliente = () => {
  return (
    <View>
      <Headline style={globalStyles.titulo}>Añadir Nuevo Cliente</Headline>
    </View>
  );
};

export default NuevoCliente;
