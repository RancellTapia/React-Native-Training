import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Platform} from 'react-native';
import {
  TextInput,
  Headline,
  Button,
  Dialog,
  Portal,
  Paragraph,
} from 'react-native-paper';
import globalStyles from '../styles/global';
import axios from 'axios';

const NuevoCliente = ({navigation, route}) => {
  const {guardarConsultarAPI} = route.params;

  // Campos formulario
  const [nombre, guardarNombre] = useState('');
  const [telefono, guardarTelefono] = useState('');
  const [correo, guardarCorreo] = useState('');
  const [empresa, guardarEmpresa] = useState('');
  const [alerta, guardarAlerta] = useState(false);

  //Detectar si estamos editando o no
  useEffect(() => {
    if (route.params.cliente) {
      const {nombre, telefono, correo, empresa} = route.params.cliente;

      guardarNombre(nombre);
      guardarTelefono(telefono);
      guardarCorreo(correo);
      guardarEmpresa(empresa);
    }
  }, []);

  // Almacena el cliente en la BD
  const guardarCliente = async () => {
    // Validar
    if (nombre === '' || telefono === '' || correo === '' || empresa === '') {
      guardarAlerta(true);
      return;
    }

    //Generar el cliente
    const cliente = {nombre, telefono, correo, empresa};

    //Si estamos editando o creando un nuevo cliente
    if (route.params.cliente) {
      const {id} = route.params.cliente;
      cliente.id = id;
      const url = `http://localhost:3000/cliente/${id}`;

      try {
        await axios.put(url, cliente);
      } catch (error) {
        console.log(error);
      }
    } else {
      //Guardar el cliente en la API
      try {
        if (Platform.OS === 'ios') {
          await axios.post('http://localhost:3000/cliente', cliente);
        } else {
          await axios.post('http://10.0.2.2:3000/cliente');
        }
      } catch (error) {
        console.log(error);
      }
    }

    //Redireccionar
    navigation.navigate('Inicio');

    //Limpiar el form (opcional)
    guardarNombre('');
    guardarTelefono('');
    guardarCorreo('');
    guardarEmpresa('');

    //Cambiar a true para traernos el nuevo cliente
    guardarConsultarAPI(true);
  };
  return (
    <View style={globalStyles.contenedor}>
      <Headline style={globalStyles.titulo} size={80}>
        {route.params.cliente ? 'Editando Cliente' : 'Añadir Nuevo Cliente'}
      </Headline>

      <TextInput
        style={styles.input}
        label="Nombre"
        placeholder="Pedro"
        onChangeText={texto => guardarNombre(texto)}
        value={nombre}
      />

      <TextInput
        style={styles.input}
        label="Teléfono"
        placeholder="809-234-3456"
        onChangeText={texto => guardarTelefono(texto)}
        value={telefono}
      />

      <TextInput
        style={styles.input}
        label="Correo"
        placeholder="correo@correo.com"
        onChangeText={texto => guardarCorreo(texto)}
        value={correo}
      />

      <TextInput
        style={styles.input}
        label="Empresa"
        placeholder="Nombre Empresa"
        onChangeText={texto => guardarEmpresa(texto)}
        value={empresa}
      />

      <Button
        icon="pencil-circle"
        mode="contained"
        onPress={() => guardarCliente()}>
        Guardar Cliente
      </Button>

      <Portal>
        <Dialog visible={alerta} onDismiss={() => guardarAlerta(false)}>
          <Dialog.Title>Error</Dialog.Title>
          <Dialog.Content>
            <Paragraph>Todos los campos son obligatorios</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => guardarAlerta(false)}>OK</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    marginBottom: 20,
    backgroundColor: 'transparent',
  },
});

export default NuevoCliente;
