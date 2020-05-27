import React, { useState, useEffect } from 'react';
import {
  Text,
  StyleSheet,
  View,
  FlatList,
  TouchableHighlight,
  Platform,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';
import Cita from './componentes/Cita';
import Formulario from './componentes/Formulario';
import AsyncStorage from '@react-native-community/async-storage';

const App = () => {
  // Definir el state de citas

  const [citas, setCitas] = useState([
    { id: '1', paciente: 'Hook', propietario: 'Juan', sintomas: 'No come' },
    { id: '2', paciente: 'Redux', propietario: 'Pedro', sintomas: 'No bebe' },
    { id: '3', paciente: 'Native', propietario: 'Tomas', sintomas: 'No baila' }
  ]);

  const [mostrarform, guardarMostrarForm] = useState(false);

  useEffect(() => {
    const obtenerCitasStorage = async () => {
      try {
        const citasStorage = await AsyncStorage.getItem('citas');

        if (citasStorage) {
          setCitas(JSON.parse(citasStorage));
        }
      } catch (error) {
        console.log(error);
      }
    };
    obtenerCitasStorage();
  }, []);

  //Eliminar los pacientes del state
  const eliminarPaciente = id => {
    const citasFiltradas = citas.filter(cita => cita.id !== id);
    setCitas(citasFiltradas);
    guardarCitasStorage(JSON.stringify(citasFiltradas));
  };

  //Muestra u oculta el formulario
  const mostrarformulario = () => {
    guardarMostrarForm(!mostrarform);
  };

  // Oculta el teclado
  const cerrarTeclado = () => {
    Keyboard.dismiss();
  };

  //Almacenar las citas en Storage
  const guardarCitasStorage = async citasJSON => {
    try {
      await AsyncStorage.setItem('citas', citasJSON);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => cerrarTeclado()}>
      <View style={styles.contenedor}>
        <Text style={styles.titulo}>Quote</Text>

        <View>
          <TouchableHighlight
            style={styles.btnMostratForm}
            onPress={() => mostrarformulario()}
          >
            <Text style={styles.textoMostrarForm}>
              {mostrarform ? 'Ver Citas' : 'Crear Nueva Cita'}
            </Text>
          </TouchableHighlight>
        </View>

        <View style={styles.contenido}>
          {mostrarform ? (
            <Formulario
              citas={citas}
              setCitas={setCitas}
              guardarMostrarForm={guardarMostrarForm}
              guardarCitasStorage={guardarCitasStorage}
            />
          ) : (
            <>
              <Text style={styles.sub_titulo}>
                {' '}
                {citas.length > 0
                  ? 'Administra tus Citas'
                  : 'No hay citas, agrega una'}
              </Text>

              <FlatList
                style={styles.listado}
                data={citas}
                renderItem={({ item }) => (
                  <Cita item={item} eliminarPaciente={eliminarPaciente} />
                )}
                keyExtractor={cita => cita.id}
              />
            </>
          )}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    backgroundColor: '#AA076B',
    flex: 1
  },
  titulo: {
    color: '#FFF',
    marginTop: Platform.OS === 'ios' ? 40 : 20,
    fontSize: 50,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  sub_titulo: {
    color: '#FFF',
    marginTop: 30,
    marginBottom: 20,
    fontSize: 33,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  contenido: {
    flex: 1,
    marginHorizontal: '2.5%'
  },
  listado: {
    flex: 1
  },
  btnMostratForm: {
    padding: 10,
    backgroundColor: '#F72076',
    marginVertical: 10
  },
  textoMostrarForm: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center'
  }
});

export default App;
