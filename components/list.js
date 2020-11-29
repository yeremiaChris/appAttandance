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
// firestore
import firestore from '@react-native-firebase/firestore';

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
  const [all, setAll] = useState(true);
  // const updateAll = () => {
  //   setSiswa([
  //     ...siswa.map((data) => {
  //       setAll(!all);
  //       return {
  //         ...data,
  //         check: !all,
  //       };
  //     }),
  //   ]);
  // };
  const changeCheckAll = () => {
    firestore()
      .collection('daftar')
      .get()
      .then((querySnabShot) => {
        querySnabShot.forEach((doc) => {
          doc.ref.update({
            check: all,
          });
        });
      });
    setAll(!all);
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
            check: doc.data().check,
            kehadiran: '',
          };
          list.push(datas);
        });
        setSiswa(list);
      });
    return () => getDaftar();
  }, []);

  // change checkbox
  const changeCheckBox = (doc, check) => {
    firestore()
      .collection('daftar')
      .doc(doc)
      .update({
        check: check,
      })
      .then((res) => {
        console.log('berhasil');
      })
      .catch((err) => {
        console.log('gagal');
      });
  };
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
                status={all ? 'unchecked' : 'checked'}
                onPress={() => {
                  changeCheckAll();
                }}
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
                          changeCheckBox(item.key, checked);
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
