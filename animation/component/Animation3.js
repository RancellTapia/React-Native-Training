import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, Animated, View} from 'react-native';

const Animation3 = () => {
  const [animation] = useState(new Animated.Value(10));

  useEffect(() => {
    Animated.timing(animation, {
      toValue: 40, //Al valor que llega
      duration: 2000, //Tiempo en llegar al valor final
    }).start(); //Iniciar la animacion
  }, []);
  return (
    <View>
      <Animated.Text style={[styles.texto, {fontSize: animation}]}>
        Animation 1
      </Animated.Text>
    </View>
  );
};

const styles = StyleSheet.create({
  texto: {
    fontSize: 30,
    textAlign: 'center',
  },
});

export default Animation3;
