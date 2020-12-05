import React, {useState, useContext} from 'react';
import {
  Button,
  Modal,
  StyleSheet,
  View,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {FAB} from 'react-native-paper';
import {IconButton, TextInput} from 'react-native-paper';
import {Formik} from 'formik';
import * as yup from 'yup';
import auth from '@react-native-firebase/auth';
import {AuthContext} from './authProvider';
// tambah siswa
const siswaSchema = yup.object({
  email: yup
    .string()
    .required('Email is Required')
    .email('Invalid email')
    .required('Email is Required'),
});
function modal({setSiswa, onToggleSnackBar, setVisible2, button}) {
  const closeModal = () => {
    setModal(false);
  };
  // dismis keyboard
  const dismisKeyboard = () => {
    Keyboard.dismiss();
  };
  // handleSubmit

  // authProvider
  const {resetPassword} = useContext(AuthContext);
  const handleSubmit = (values) => {
    setModal(false);
    Alert.alert('Liat email anda');
    resetPassword(values.email);
  };

  // state modal
  const [modal, setModal] = useState(false);

  // handle button tambah
  const handleForm = () => {
    setModal(true);
  };

  return (
    <View style={styles.container}>
      <Modal animationType="slide" visible={modal}>
        <TouchableWithoutFeedback onPress={dismisKeyboard} disabled={button}>
          <View>
            <View style={styles.header}>
              <IconButton
                icon="arrow-left"
                size={25}
                onPress={closeModal}
                disabled={button}
              />
              <Text style={styles.textHeader}>Reset Password </Text>
            </View>
            <Formik
              disabled={button}
              initialValues={{
                email: '',
              }}
              validationSchema={siswaSchema}
              onSubmit={handleSubmit}>
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                values,
                errors,
                touched,
              }) => (
                <View style={styles.inputWrapper}>
                  <TextInput
                    disabled={button}
                    label="Tulis email..."
                    style={styles.textInput}
                    onChangeText={handleChange('email')}
                    value={values.email}
                    onBlur={handleBlur('email')}
                  />
                  <Text style={styles.textError}>
                    {touched.email && errors.email}
                  </Text>

                  <View style={styles.viewButton}>
                    <IconButton
                      disabled={button}
                      icon="send"
                      size={30}
                      color="purple"
                      onPress={(e) => {
                        e.preventDefault();
                        handleSubmit();
                      }}
                    />
                  </View>
                </View>
              )}
            </Formik>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
      <View style={styles.textRegis}>
        <TouchableOpacity onPress={handleForm}>
          <Text style={styles.register}>Forgot Password ?</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
export default React.memo(modal);

const styles = StyleSheet.create({
  textRegis: {
    flexDirection: 'row',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  textInput: {
    marginBottom: 10,
    backgroundColor: '#f2f5f5',
  },
  inputWrapper: {
    padding: 10,
  },
  viewButton: {
    alignItems: 'flex-end',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textHeader: {
    fontSize: 20,
    color: 'black',
  },
  textError: {
    marginBottom: 10,
    color: 'red',
  },
  register: {
    color: 'purple',
    marginLeft: 10,
  },
});
const pickerSelectStyles = StyleSheet.create({
  inputAndroid: {
    fontSize: 16,
    color: 'black',
    backgroundColor: '#f2f5f5',
    elevation: 1,
    paddingRight: 30, // to ensure the text is never behind the icon
    marginBottom: 10,
  },
});
