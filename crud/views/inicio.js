import React, {useState, useEffect} from 'react';
import {Text, FlatList, View} from 'react-native';
import axios from 'axios';
import {List, Headline} from 'react-native-paper';
import globalStyles from '../styles/global';

const Inicio = () => {
  //State de la app
  const [clientes, guardarClientes] = useState('');

  useEffect(() => {
    const obtenerClienteApi = async () => {
      try {
        const resultado = await axios.get('http://localhost:3000/cliente');
        guardarClientes(resultado.data);
      } catch (error) {
        console.log(error);
      }
    };

    obtenerClienteApi();
  }, []);
  return (
    <View style={globalStyles.contenedor}>
      <Headline style={globalStyles.titulo}>
        {clientes.length > 0 ? 'Clientes' : 'Aún No Hay Clientes'}
      </Headline>
      <FlatList
        data={clientes}
        keyExtractor={cliente => cliente.id.toString()}
        renderItem={({item}) => (
          <List.Item title={item.nombre} description={item.empresa} />
        )}
      />
    </View>
  );
};

export default Inicio;
