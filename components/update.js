import React, {useState} from 'react';
import {
  Button,
  Modal,
  StyleSheet,
  View,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {FAB} from 'react-native-paper';
import {IconButton, TextInput, Colors} from 'react-native-paper';
import {Formik} from 'formik';
import RNPickerSelect from 'react-native-picker-select';
import * as yup from 'yup';
import {updateDetail} from '../firestore/daftar';
// angkatan select
const label = [
  {label: 'Angkatan 2019', value: '2019'},
  {label: 'Angkatan 2018', value: '2018'},
  {label: 'Angkatan 2017', value: '2017'},
];
// jurusan select
const jurusans = [
  {label: 'Sistem Informasi', value: 'Sistem Informasi'},
  {label: 'Teknik Informatika', value: 'Teknik Informatika'},
  {label: 'Manajemen', value: 'Manajemen'},
  {label: 'Sastra Ingris', value: 'Sastra Inggris'},
  {label: 'Perpajakan', value: 'Perpajakan'},
];
// schema
const siswaSchema = yup.object({
  nama: yup
    .string()
    .required('Field ini tidak boleh kosong ...')
    .min(4, 'Tidak boleh kurang dari 4 huruf ...'),
  angkatan: yup.string().required('Field ini tidak boleh kosong ...'),
  jurusan: yup.string().required('Field ini tidak boleh kosong ...'),
});
function modal({nama, ang, jur, kunci, setVisible, button}) {
  // state modal
  const [modal, setModal] = useState(false);
  // handle button tambah
  const handleForm = () => {
    setModal(true);
  };
  // close modal
  const closeModal = () => {
    setModal(false);
  };
  // items angkatan
  const [items, setItems] = useState(label);
  // items jurusan
  const [jurusan, setJurusan] = useState(jurusans);
  // dismis keyboard
  const dismisKeyboard = () => {
    Keyboard.dismiss();
  };
  // handleSubmit
  const handleSubmit = (values) => {
    // values.key = Math.random().toString();
    // setSiswa((prevState) => {
    //   return [values, ...prevState];
    // });
    // console.log(values);
    // console.log(values);
    updateDetail(values.kunci, values.angkatan, values.nama, values.jurusan);
    setVisible(false);
    setModal(false);
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
              <Text style={styles.textHeader}>Update Siswa</Text>
            </View>
            <Formik
              disabled={button}
              initialValues={{
                nama: nama,
                angkatan: ang,
                jurusan: jur,
                kunci: kunci,
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
                    label="Tulis nama..."
                    style={styles.textInput}
                    onChangeText={handleChange('nama')}
                    value={values.nama}
                    onBlur={handleBlur('nama')}
                  />
                  <Text style={styles.textError}>
                    {touched.nama && errors.nama}
                  </Text>
                  <RNPickerSelect
                    disabled={button}
                    style={styles}
                    placeholder={{label: 'Pilih Angkatan...', value: null}}
                    onValueChange={handleChange('angkatan')}
                    items={items}
                    style={pickerSelectStyles}
                    value={values.angkatan}
                  />
                  <Text style={styles.textError}>
                    {touched.angkatan && errors.angkatan}
                  </Text>
                  <RNPickerSelect
                    disabled={button}
                    style={styles}
                    placeholder={{label: 'Pilih Jurusan...', value: null}}
                    onValueChange={handleChange('jurusan')}
                    items={jurusans}
                    value={values.jurusan}
                    style={pickerSelectStyles}
                  />
                  <Text style={styles.textError}>
                    {touched.jurusan && errors.jurusan}
                  </Text>
                  <View style={styles.viewButton}>
                    <IconButton
                      disabled={button}
                      icon="send"
                      size={30}
                      color="purple"
                      onPress={handleSubmit}
                    />
                  </View>
                </View>
              )}
            </Formik>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
      <IconButton
        disabled={button}
        icon="pencil"
        color={Colors.grey500}
        size={25}
        onPress={handleForm}
      />
    </View>
  );
}

export default React.memo(modal);

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
  container: {
    flex: 1,
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
