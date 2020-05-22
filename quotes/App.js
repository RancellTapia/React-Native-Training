import React, { useState } from 'react';
import { Text, StyleSheet, View, FlatList } from 'react-native';
import Cita from './componentes/Cita';
import Formulario from './componentes/Formulario';

const App = () => {
  // Definir el state de citas

  const [citas, setCitas] = useState([
    { id: '1', paciente: 'Hook', propietario: 'Juan', sintomas: 'No come' },
    { id: '2', paciente: 'Redux', propietario: 'Pedro', sintomas: 'No bebe' },
    { id: '3', paciente: 'Native', propietario: 'Tomas', sintomas: 'No baila' }
  ]);

  //Eliminar los pacientes del state
  const eliminarPaciente = id => {
    setCitas(citasActuales => {
      return citasActuales.filter(cita => cita.id !== id);
    });
  };

  return (
    <View style={styles.contenedor}>
      <Text style={styles.titulo}>Quote</Text>

      <Formulario />

      <Text style={styles.sub_titulo}>
        {' '}
        {citas.length > 0 ? 'Administra tus Citas' : 'No hay citas, agrega una'}
      </Text>

      <FlatList
        data={citas}
        renderItem={({ item }) => (
          <Cita item={item} eliminarPaciente={eliminarPaciente} />
        )}
        keyExtractor={cita => cita.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    backgroundColor: '#AA076B',
    flex: 1
  },
  titulo: {
    color: '#FFF',
    marginTop: 40,
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
  }
});

export default App;
