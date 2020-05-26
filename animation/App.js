import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

// import Animation1 from './component/Animation1';
import Animation5 from './component/Animation5';

const App = () => {
  return (
    <>
      <View style={styles.container}>
        {/* <Animation1 /> */}
        <Animation5 />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 160,
  },
});

export default App;
