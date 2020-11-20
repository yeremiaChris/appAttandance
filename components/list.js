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
import ModalForm from './modal';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Checkbox} from 'react-native-paper';
import {object} from 'yup';
import ModalDetail from '../shared/modalDetail';
import firestore from '@react-native-firebase/firestore';
import {getDaftar, deleteDaftar} from '../firestore/daftar';
const initialSiswa = [
  {
    nama: '',
    angkatan: '',
    jurusan: '',
    key: '',
    check: '',
  },
];
// initialDetail
const initialDetail = {
  nama: '',
  angkatan: '',
  jurusan: '',
  key: '',
};
// label pada select
const label = [
  {label: 'Angkatan 2019', value: '2019'},
  {label: 'Angkatan 2018', value: '2018'},
  {label: 'Angkatan 2017', value: '2017'},
];
export default function list() {
  const [siswa, setSiswa] = useState([]);
  // modalDetail
  const [visible, setVisible] = useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = {backgroundColor: 'white', padding: 20};

  const [detail, setDetail] = useState(initialDetail);
  // akhir ModalDetail
  // get key for delete
  const [key, setKey] = useState('');

  // chekcbox
  const [checked, setChecked] = React.useState(false);
  // display
  const [display, setDisplay] = useState(false);
  // checkall
  const [all, setAll] = useState(false);
  const updateAll = () => {
    setSiswa([
      ...siswa.map((data) => {
        setAll(!all);
        return {
          ...data,
          check: !all,
        };
      }),
    ]);
  };

  // deleteAllFunction
  const deleteAll = () => {
    twoOptionAlertHandler();
  };
  // alert delete
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
          onPress: () => {
            console.log(siswa);
          },
        },
        {
          text: 'No',
          onPress: () => setDisplay(false),
          style: 'cancel',
        },
      ],
      {cancelable: false},
      //clicking out side of alert will not cancel
    );
  };
  // state
  const [items, setItems] = useState(label);
  const [nilai, setNilai] = useState({
    tangkapValue: null,
  });
  // get data from firestore
  useEffect(() => {
    getDaftar(setSiswa);
  }, []);
  return (
    <View style={styles.cardWrapper}>
      {/* modal */}
      <ModalDetail
        visible={visible}
        hideModal={hideModal}
        containerStyle={containerStyle}
        detail={detail}
      />
      {/* akhir modal */}
      <SelectPicker
        title="Pilih Angkatan"
        items={items}
        nilai={nilai}
        setNilai={setNilai}
      />
      <View style={styles.containerdua}>
        {display ? (
          <>
            <View style={styles.viewDelete}>
              <Checkbox
                status={all ? 'checked' : 'unchecked'}
                onPress={updateAll}
              />
              <IconButton
                icon="delete"
                color={Colors.grey500}
                size={20}
                onPress={deleteAll}
              />
            </View>
          </>
        ) : null}
        <FlatList
          data={siswa}
          keyExtractor={(item) => item.key}
          renderItem={({item}) => (
            <TouchableOpacity
              onLongPress={() => {
                setDisplay(true);
              }}>
              <View style={styles.viewForCard}>
                <Card style={styles.container}>
                  <Card.Content style={styles.card}>
                    {/* kalo di tahan lama maka checkbox ini akan muncul */}
                    {display ? (
                      <Checkbox
                        status={item.check ? 'checked' : 'unchecked'}
                        onPress={() => {
                          item.check = checked;
                          setChecked(!checked);
                        }}
                      />
                    ) : null}
                    <TouchableOpacity
                      onPress={() => {
                        setDetail({
                          nama: item.nama,
                          angkatan: item.angkatan,
                          jurusan: item.jurusan,
                          key: item.key,
                        });
                        showModal();
                      }}
                      onLongPress={() => setDisplay(true)}>
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

        <ModalForm setSiswa={setSiswa} />
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
});
