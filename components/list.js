import React, {useState} from 'react';
import {
  Card,
  Title,
  Paragraph,
  Modal,
  Portal,
  Button,
  Provider,
} from 'react-native-paper';
import {
  StyleSheet,
  View,
  FlatList,
  Text,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {Avatar} from 'react-native-paper';
import SelectPicker from '../shared/SelectPicker';
import SearchBar from 'react-native-dynamic-search-bar';
import ModalForm from './modal';
import Ionicons from 'react-native-vector-icons/Ionicons';

const initialSiswa = [
  {
    nama: 'apa Chris Saragi',
    angkatan: 2018,
    jurusan: 'Sistem Informasi',
    key: '20',
  },
  {
    nama: 'Yeremia Chris Saragi',
    angkatan: 2018,
    jurusan: 'Sistem Informasi',
    key: '1',
  },
  {
    nama: 'Kamiswara Angga Wijaya',
    angkatan: 2018,
    jurusan: 'Sistem Informasi',
    key: '2',
  },
  {
    nama: 'Alex Saputra',
    angkatan: 2017,
    jurusan: 'Manajemen',
    key: '3',
  },
  {
    nama: 'Alex Saputra',
    angkatan: 2017,
    jurusan: 'Manajemen',
    key: '4',
  },
  {
    nama: 'Alex Saputra',
    angkatan: 2017,
    jurusan: 'Manajemen',
    key: '5',
  },
  {
    nama: 'Alex Saputra',
    angkatan: 2017,
    jurusan: 'Manajemen',
    key: '6',
  },
  {
    nama: 'Alex Saputra',
    angkatan: 2017,
    jurusan: 'Manajemen',
    key: '7',
  },
  {
    nama: 'Alex Saputra',
    angkatan: 2017,
    jurusan: 'Manajemen',
    key: '8',
  },
  {
    nama: 'Alex Saputra',
    angkatan: 2017,
    jurusan: 'Manajemen',
    key: '9',
  },
  {
    nama: 'Alex Saputra',
    angkatan: 2017,
    jurusan: 'Manajemen',
    key: '10',
  },
  {
    nama: 'keren',
    angkatan: 2017,
    jurusan: 'Manajemen',
    key: '11',
  },
  {
    nama: 'kali',
    angkatan: 2017,
    jurusan: 'Manajemen',
    key: '12',
  },
  {
    nama: 'kali',
    angkatan: 2017,
    jurusan: 'Manajemen',
    key: '13',
  },
];
export default function list() {
  const [siswa, setSiswa] = useState(initialSiswa);
  const [visible, setVisible] = useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = {backgroundColor: 'white', padding: 20};

  // get key for delete
  const [key, setKey] = useState('');

  // alert
  const twoOptionAlertHandler = () => {
    //function to make two option alert
    Alert.alert(
      //title
      'Peringatan',
      //body
      'Yakin anda ingin menghapus ?',
      [
        {
          text: 'Yes',
          onPress: () =>
            setSiswa((prev) => {
              return prev.filter((p) => p.key != key);
            }),
        },
        {
          text: 'No',
          onPress: () => console.log('No Pressed'),
          style: 'cancel',
        },
      ],
      {cancelable: false},
      //clicking out side of alert will not cancel
    );
  };
  return (
    <View style={styles.cardWrapper}>
      <SelectPicker />
      <View style={styles.containerdua}>
        <FlatList
          data={siswa}
          keyExtractor={(item) => item.key}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => {
                setKey(item.key);
                twoOptionAlertHandler();
              }}>
              <View style={styles.viewForCard}>
                <Card style={styles.container}>
                  <Card.Content style={styles.card}>
                    <View>
                      <Title>{item.nama}</Title>
                      <Paragraph>
                        {item.jurusan} {item.angkatan}
                      </Paragraph>
                    </View>
                    <Avatar.Image
                      size={50}
                      source={require('../assets/list.png')}
                    />
                  </Card.Content>
                </Card>
              </View>
            </TouchableOpacity>
          )}
        />
        <ModalForm setSiswa={setSiswa} />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  cardWrapper: {
    padding: 10,
    flex: 1,
  },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  container: {
    marginBottom: 10,
  },
  viewForCard: {
    flex: 1,
  },
  containerdua: {
    flex: 1,
  },
  search: {
    backgroundColor: 'white',
  },
  containerSearch: {
    backgroundColor: 'white',
    borderTopWidth: 0,
    borderBottomWidth: 0,
    marginBottom: 10,
    elevation: 1,
  },
  modal: {
    height: 300,
    width: 300,
  },
});
