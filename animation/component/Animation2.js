import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, Animated, View} from 'react-native';

const Animation2 = () => {
  const [animation] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(animation, {
      toValue: 450, //Al valor que llega
      duration: 1000, //Tiempo en llegar al valor final
    }).start(); //Iniciar la animacion
  }, []);
  return (
    <Animated.View
      style={[
        styles.caja,
        {
          width: animation,
          height: animation,
        },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  caja: {
    width: 100,
    height: 100,
    backgroundColor: 'blue',
  },
});

export default Animation2;
