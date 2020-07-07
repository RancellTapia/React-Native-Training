import React, {useState} from 'react';
import {View} from 'native-base';
import {
  Container,
  Button,
  Text,
  H1,
  Input,
  Form,
  Item,
  Toast,
} from 'native-base';
import {useNavigation} from '@react-navigation/native';

import globalStyles from '../styles/global';

//Apollo
import {gql, useMutation} from '@apollo/client';

const NUEVA_CUENTA = gql`
  mutation crearUsuario($input: UsuarioInput) {
    crearUsuario(input: $input)
  }
`;

const CrearCuenta = () => {
  //State del formulario
  const [nombre, guardarNombre] = useState('');
  const [email, guardarEmail] = useState('');
  const [password, guardarPassword] = useState('');

  const [mensaje, guardarMensaje] = useState(null);

  //React Navigation
  const navigation = useNavigation();

  //Mutation de apollo
  const [crearUsuario] = useMutation(NUEVA_CUENTA);

  //Cuando el usuario presiona en crear cuenta
  const handleSubmit = async () => {
    //Validar
    if (nombre === '' || email === '' || password === '') {
      //Mostrar un error
      guardarMensaje('Todos los campos son obligatorios');

      return;
    }

    //Password al menos de 6 caracteres
    if (password.length < 5) {
      //Mostrar un error
      guardarMensaje('El password debe ser al menos 6 caracteres');

      return;
    }

    //Guardar el usuario
    try {
      const {data} = await crearUsuario({
        variables: {
          input: {
            nombre,
            email,
            password,
          },
        },
      });

      guardarMensaje(data.crearUsuario);
      navigation.navigate('Login');
    } catch (error) {
      guardarMensaje(error.message.replace('GraphQL error: ', ''));
    }
  };

  //Muestra mensaje Toast
  const mostrarAlerta = () => {
    Toast.show({
      text: mensaje,
      buttonText: 'Ok',
      duration: 6000,
    });
  };

  return (
    <Container style={[globalStyles.contenedor, {backgroundColor: '#e84347'}]}>
      <View style={globalStyles.contenido}>
        <H1 style={globalStyles.titulo}>Task App</H1>

        <Form>
          <Item inlineLabel last style={globalStyles.input}>
            <Input
              onChangeText={(texto) => guardarNombre(texto)}
              placeholder="Nombre"
            />
          </Item>
        </Form>

        <Form>
          <Item inlineLabel last style={globalStyles.input}>
            <Input
              onChangeText={(texto) => guardarEmail(texto)}
              placeholder="Email"
            />
          </Item>
        </Form>

        <Form>
          <Item inlineLabel last style={globalStyles.input}>
            <Input
              onChangeText={(texto) => guardarPassword(texto)}
              secureTextEntry={true}
              placeholder="Password"
            />
          </Item>
        </Form>

        <Button
          onPress={() => handleSubmit()}
          square
          block
          style={globalStyles.boton}>
          <Text style={globalStyles.botonTexto}>Crear Cuenta</Text>
        </Button>

        {mensaje && mostrarAlerta()}
      </View>
    </Container>
  );
};

export default CrearCuenta;
