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
import AsyncStorage from '@react-native-community/async-storage';

//Apollo
import {gql, useMutation} from '@apollo/client';

const AUTENTICAR_USUARIO = gql`
  mutation autenticarUsuario($input: AutenticarInput) {
    autenticarUsuario(input: $input) {
      token
    }
  }
`;

const Login = () => {
  //State del formulario
  const [email, guardarEmail] = useState('');
  const [password, guardarPassword] = useState('');

  const [mensaje, guardarMensaje] = useState(null);

  //React Navigation
  const navigation = useNavigation();

  //Mutation de apollo
  const [autenticarUsuario] = useMutation(AUTENTICAR_USUARIO);

  //Cuando el ususario presiona en iniciar session
  const handleSubmit = async () => {
    //Validar
    if (email === '' || password === '') {
      //Mostrar un error
      guardarMensaje('Todos los campos son obligatorios');

      return;
    }

    try {
      //Autenticar Usuario
      const {data} = await autenticarUsuario({
        variables: {
          input: {
            email,
            password,
          },
        },
      });

      const {token} = data.autenticarUsuario;

      //Colocar token en storage
      await AsyncStorage.setItem('token', token);

      //Redireccionar a proyectos
      navigation.navigate('Proyectos');
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
              placeholder="Email"
              onChangeText={(texto) => guardarEmail(texto)}
            />
          </Item>
        </Form>

        <Form>
          <Item inlineLabel last style={globalStyles.input}>
            <Input
              secureTextEntry={true}
              placeholder="Password"
              onChangeText={(texto) => guardarPassword(texto)}
            />
          </Item>
        </Form>

        <Button
          square
          block
          style={globalStyles.boton}
          onPress={() => handleSubmit()}>
          <Text style={globalStyles.botonTexto}>Iniciar Sesion</Text>
        </Button>

        <Text
          onPress={() => navigation.navigate('CrearCuenta')}
          style={globalStyles.enlace}>
          Crear Cuenta
        </Text>

        {mensaje && mostrarAlerta()}
      </View>
    </Container>
  );
};

export default Login;
