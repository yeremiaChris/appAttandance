import React, {useState, useEffect} from 'react';
import {
  Card,
  Title,
  Paragraph,
  Portal,
  Button,
  Modal,
  Avatar,
  IconButton,
  Colors,
} from 'react-native-paper';
import {
  StyleSheet,
  View,
  FlatList,
  Text,
  TouchableOpacity,
  Alert,
} from 'react-native';
import SelectPicker from '../shared/SelectPicker';
import SearchBar from 'react-native-dynamic-search-bar';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ModalDetail from '../shared/modalDetail';
// firestore
import firestore from '@react-native-firebase/firestore';
// label pada select
const label = [
  {label: 'Angkatan 2019', value: '2019'},
  {label: 'Angkatan 2018', value: '2018'},
  {label: 'Angkatan 2017', value: '2017'},
];
export default function HadirDanTidak() {
  // modalDetail
  const [visible, setVisible] = useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = {backgroundColor: 'white', padding: 20};

  // get key for delete
  const [items, setItems] = useState(label);
  const [nilai, setNilai] = useState({
    tangkapValue: null,
  });

  // get data from firestore
  const [siswa, setSiswa] = useState([]);
  useEffect(() => {
    const getDaftar = firestore()
      .collection('daftar')
      .onSnapshot(function (snabshot) {
        let list = [];
        snabshot.forEach((doc) => {
          const datas = {
            nama: doc.data().nama,
            angkatan: doc.data().angkatan,
            jurusan: doc.data().jurusan,
            key: doc.id,
            check: false,
            kehadiran: '',
          };
          list.push(datas);
        });
        setSiswa(list);
      });
    return () => getDaftar();
  }, []);
  return (
    <View style={styles.cardWrapper}>
      <View style={styles.picker}>
        <SearchBar placeholder="Cari Siswa ... " />
      </View>
      <SelectPicker
        title="Pilih Angkatan"
        items={items}
        nilai={nilai}
        setNilai={setNilai}
      />
      <View style={styles.containerdua}>
        <FlatList
          data={siswa}
          keyExtractor={(item) => item.key}
          renderItem={({item}) => (
            <TouchableOpacity>
              <View style={styles.viewForCard}>
                <Card style={styles.container}>
                  <Card.Content style={styles.card}>
                    <TouchableOpacity>
                      <View>
                        <Title>{item.nama}</Title>
                        <Paragraph>
                          {item.jurusan} {item.angkatan}
                        </Paragraph>
                      </View>
                    </TouchableOpacity>
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
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  modal: {
    flexDirection: 'column',
  },
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
  check: {
    display: 'none',
  },
  viewDelete: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  picker: {
    marginBottom: 10,
  },
});
