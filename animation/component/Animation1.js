import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, Animated, View} from 'react-native';

const Animation1 = () => {
  const [animation] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(animation, {
      toValue: 1, //Al valor que llega
      duration: 5000, //Tiempo en llegar al valor final
    }).start(); //Iniciar la animacion
  }, []);
  return (
    <Animated.View
      style={{
        opacity: animation,
      }}>
      <Text style={styles.texto}>Animation 1</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  texto: {
    fontSize: 30,
    textAlign: 'center',
  },
});

export default Animation1;
