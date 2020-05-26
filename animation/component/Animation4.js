import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, Animated, View} from 'react-native';

const Animation4 = () => {
  const [animation] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(animation, {
      toValue: 360, //Al valor que llega
      duration: 2000, //Tiempo en llegar al valor final
    }).start(); //Iniciar la animacion
  }, []);

  const interpolacion = animation.interpolate({
    inputRange: [0, 360],
    outputRange: ['0deg', '760deg'],
  });

  const estiloAnimacion = {
    transform: [{rotate: interpolacion}],
  };

  return (
    <View style={{alignItems: 'center'}}>
      <Animated.View style={[styles.caja, estiloAnimacion]} />
    </View>
  );
};

const styles = StyleSheet.create({
  caja: {
    width: 100,
    height: 100,
    backgroundColor: 'blue',
    justifyContent: 'center',
  },
});

export default Animation4;
