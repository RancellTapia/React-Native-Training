import React, {useReducer} from 'react';

import firebase from '../../firebase';
import FirebaseReducer from './firebaseReducer';
import FirebaseContext from './firebaseContext';

import {OBTENER_PRODUCTOS_EXITO} from '../../type';

import _ from 'lodash';

const FirebaseState = props => {
  //Crear state inicial
  const initialState = {
    menu: [],
  };

  //useReducer con dispatch para ejecutar las funciones
  const [state, dispatch] = useReducer(FirebaseReducer, initialState);

  //Funcion que se ejecuta para traer los productos
  const obtenerProductos = () => {
    //Consultar firebase
    firebase.db
      .collection('productos')
      .where('existencia', '==', true) //Traer solo los que esten en existencia
      .onSnapshot(manejarSnapshot);

    function manejarSnapshot(snapshot) {
      let platillos = snapshot.docs.map(doc => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });

      //Ordenar por categoria con lodash
      platillos = _.sortBy(platillos, 'categoria');

      console.log(platillos);

      //Tenemos resultado desde la BD
      dispatch({
        type: OBTENER_PRODUCTOS_EXITO,
        payload: platillos,
      });
    }
  };

  return (
    <FirebaseContext.Provider
      value={{
        menu: state.menu,
        firebase,
        obtenerProductos,
      }}>
      {props.children}
    </FirebaseContext.Provider>
  );
};

export default FirebaseState;
