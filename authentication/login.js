import React, {useState, useContext} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import auth from '@react-native-firebase/auth';
import {Formik} from 'formik';
import * as Yup from 'yup';
import ModalRegis from './modalRegistrasi';
import ModalForgot from './modalForgot';

import {AuthContext} from '../authentication/authProvider';

// schema
const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .required('Email is Required')
    .email('Invalid email')
    .required('Email is Required'),
  password: Yup.string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters'),
});

export default function login({navigation}) {
  // login useContet
  const {login} = useContext(AuthContext);

  const handleSubmit = (values) => {
    login(values.email, values.password);
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Login </Text>
      <Formik
        initialValues={{email: '', password: ''}}
        onSubmit={handleSubmit}
        validationSchema={LoginSchema}>
        {({
          values,
          handleChange,
          handleBlur,
          handleSubmit,

          errors,
          touched,
        }) => (
          <>
            <ScrollView style={styles.scroll}>
              <View style={styles.wrapScroll}>
                <View style={styles.wrap}>
                  <TextInput
                    label="Email"
                    value={values.email}
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                  />
                  <Text style={styles.textErr}>
                    {touched.email && errors.email}
                  </Text>
                </View>
                <View style={styles.wrap}>
                  <TextInput
                    secureTextEntry={true}
                    label="Password"
                    value={values.password}
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('passoword')}
                  />
                  <Text style={styles.textErr}>
                    {touched.password && errors.password}
                  </Text>
                </View>
                <View style={styles.wrap}>
                  <Button
                    style={styles.button}
                    mode="contained"
                    color="purple"
                    onPress={(e) => {
                      e.preventDefault();
                      handleSubmit();
                    }}>
                    Login
                  </Button>
                  <TouchableOpacity>
                    <ModalForgot />
                  </TouchableOpacity>
                </View>
                <ModalRegis />
              </View>
            </ScrollView>
          </>
        )}
      </Formik>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
  },
  textErr: {
    color: 'red',
  },
  scroll: {
    width: '100%',
    height: '100%',
  },
  text: {
    fontSize: 30,
  },
  wrap: {
    width: '100%',
    padding: 15,
  },
  button: {
    padding: 8,
    marginBottom: 10,
  },
  lupa: {
    color: 'purple',
    textAlign: 'center',
  },
  tidakPunya: {
    justifyContent: 'center',
  },
});
