import React, {useState, useContext, useEffect} from 'react';
import {StyleSheet, Alert} from 'react-native';
import {
  Container,
  Content,
  Form,
  Icon,
  Button,
  Input,
  Text,
  Grid,
  Col,
  Footer,
  FooterTab,
} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import globalStyles from '../styles/global';

import PedidosContext from '../context/pedidos/pedidosContext';

const FormularioPlatillo = () => {
  //State para cantidades
  const [cantidad, guardarCantidad] = useState(1);
  const [total, guardarTotal] = useState(0);

  //Context
  const {platillo, guardarPedido} = useContext(PedidosContext);
  const {precio} = platillo;

  //Redireccionar
  const navigation = useNavigation();

  //En cuanto el componente carga, calcular la cantidad total a pagar
  useEffect(() => {
    calcularTotal();
  }, [cantidad]);

  //Calcula el total del platillo por su cantidad
  const calcularTotal = () => {
    const totalPagar = precio * cantidad;
    guardarTotal(totalPagar);
  };

  //Incrementar en uno la cantidad
  const incrementar = () => {
    const nuevaCantidad = parseInt(cantidad) + 1;
    guardarCantidad(nuevaCantidad);
  };

  //Decrementar en uno la cantidad
  const decrementar = () => {
    if (cantidad > 1) {
      const nuevaCantidad = parseInt(cantidad) - 1;
      guardarCantidad(nuevaCantidad);
    }
  };

  //Confirma si la orden es correcta
  const confirmarOrden = () => {
    Alert.alert(
      'Deseas confirmar tu pedido?',
      'Un pedido confirmado ya no se podrá modificar',
      [
        {
          text: 'Confirmar',
          onPress: () => {
            //Almacenar el pedido al pedido principal
            const pedido = {
              ...platillo,
              cantidad,
              total,
            };

            guardarPedido(pedido);

            //Navegar hacia el resumen
            navigation.navigate('ResumenPedido');
          },
        },
        {
          text: 'Cancelar',
          style: 'cancel',
        },
      ],
    );
  };

  return (
    <Container>
      <Content>
        <Form>
          <Text style={globalStyles.titulo}> Cantidad</Text>

          <Grid>
            <Col>
              <Button style={styles.boton} onPress={() => decrementar()}>
                <Icon style={styles.icon} name="remove" />
              </Button>
            </Col>
            <Col>
              <Input
                style={styles.cantidad}
                keyboardType="numeric"
                value={cantidad.toString()}
                onChangeText={cantidad => guardarCantidad(cantidad)}
              />
            </Col>
            <Col>
              <Button style={styles.boton} onPress={() => incrementar()}>
                <Icon style={styles.icon} name="add" />
              </Button>
            </Col>
          </Grid>

          <Text style={globalStyles.cantidad}>Subtotal: ${total}</Text>
        </Form>
      </Content>

      <Footer>
        <FooterTab>
          <Button style={globalStyles.boton} onPress={() => confirmarOrden()}>
            <Text style={globalStyles.botonTexto}> Agregar al pedido</Text>
          </Button>
        </FooterTab>
      </Footer>
    </Container>
  );
};

const styles = StyleSheet.create({
  boton: {
    height: 80,
    justifyContent: 'center',
    backgroundColor: '#000',
  },
  icon: {
    fontSize: 40,
  },
  cantidad: {
    textAlign: 'center',
    fontSize: 30,
  },
});

export default FormularioPlatillo;
