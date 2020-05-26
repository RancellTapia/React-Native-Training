import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableWithoutFeedback,
  Animated,
} from 'react-native';

const Animation5 = () => {
  const [animation] = useState(new Animated.Value(1));

  const presionarBtn = () => {
    Animated.spring(animation, {
      toValue: 0.8,
    }).start();
  };

  const soltarBtn = () => {
    Animated.spring(animation, {
      toValue: 1,
    }).start();
  };

  const estiloAnimacion = {
    transform: [{scale: animation}],
  };
  return (
    <View style={styles.contenedor}>
      <TouchableWithoutFeedback
        onPressIn={() => presionarBtn()}
        onPressOut={() => soltarBtn()}>
        <Animated.View style={[styles.btn, estiloAnimacion]}>
          <Text style={styles.texto}> Iniciar Sesion</Text>
        </Animated.View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    alignItems: 'center',
  },
  btn: {
    backgroundColor: 'cornflowerblue',
    width: 350,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
  },
  texto: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 50,
  },
});

export default Animation5;
