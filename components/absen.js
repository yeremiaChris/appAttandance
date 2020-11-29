import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  FlatList,
  Alert,
} from 'react-native';
import {
  Card,
  Title,
  Paragraph,
  Avatar,
  FAB,
  RadioButton,
} from 'react-native-paper';
import {CheckBox} from 'react-native-elements';
import SelectPickker from '../shared/SelectPicker';
import {buatLaporan, changeRadio} from '../firestore/daftar';
import SelectPicker from '../shared/SelectPicker';
// firestore
import firestore from '@react-native-firebase/firestore';
import {showMessage, hideMessage} from 'react-native-flash-message';

// radio button
const data = [
  {
    label: 'Hadir',
  },
  {
    label: 'Tidak Hadir',
  },
];
// label select
const label = [
  {label: 'Doa Pagi', value: 'Doa Pagi'},
  {label: 'Ibadah Minggu', value: 'Ibadah Minggu'},
];
const brg = [
  {id: 0, label: 'Button1'},
  {id: 1, label: 'Button2'},
  {id: 2, label: 'Button3'},
  {id: 3, label: 'Button4'},
];
export default function Absen({navigation}) {
  // mengelola pilihan absen pada select picker
  const [items, setItems] = useState(label);
  const [nilai, setNilai] = useState({
    tangkapValue: null,
  });

  // ganti data pada select agar ketika kita pilih doa pagi maka data yang di tampilkan adalah doa pagi
  const [title, setTitle] = useState('Doa Pagi');
  const changeTitle = (newTitle) => {
    setTitle(newTitle);
  };

  // pilihan dari select
  const handlePilih = () => console.log('test');

  // mensortir yang hadir saja
  const [hadirSaja, setHadirSaja] = useState([]);
  useEffect(() => {
    const yangHadir = firestore()
      .collection('daftar')
      .where('kehadiran', '==', 'Hadir')
      .onSnapshot((snabshot) => {
        let list = [];
        snabshot.forEach((doc) => {
          list.push(doc.data());
        });
        setHadirSaja(list);
      });
  }, []);

  // daftar yang tidak hadir saja
  const [tidakHadirSaja, setTidakHadirSaja] = useState([]);
  useEffect(() => {
    const yangTidakHadir = firestore()
      .collection('daftar')
      .where('kehadiran', '==', 'Tidak Hadir')
      .onSnapshot((snabshot) => {
        let list = [];
        snabshot.forEach((doc) => {
          list.push(doc.data());
        });
        setTidakHadirSaja(list);
      });
    return () => yangTidakHadir();
  }, []);
  // buat laporan yang hadir saja dan tidak hadir
  const buatL = () => {
    buatLaporan(tidakHadirSaja, hadirSaja);
  };

  // state doapagi
  const [doaPagi, setDoaPagi] = useState([]);
  // getData doa pagi
  useEffect(() => {
    const getDoaPagi = firestore()
      .collection('daftar')
      .onSnapshot(function (snabshot) {
        let list = [];
        snabshot.forEach((doc) => {
          const datas = {
            nama: doc.data().nama,
            angkatan: doc.data().angkatan,
            jurusan: doc.data().jurusan,
            key: doc.id,
            hadir: doc.data().hadir,
            tidakHadir: doc.data().tidakHadir,
          };
          list.push(datas);
        });
        setDoaPagi(list);
      });
    return () => getDoaPagi();
  }, []);

  // mengelola absen doa pagi
  const sett = (doc, angkatan, nama, doapagi, jurusan) => {
    absen(doc, angkatan, nama, doapagi, jurusan);
  };

  // alert berhasil take attandance
  const twoOptionAlertHandler = () => {
    //function to make two option alert
    Alert.alert(
      //title
      'Berhasil mengabsen',
      //body
      'Simpan Laporan.',
      [
        {
          text: 'Ya',
          onPress: () => {
            console.log('masuk ke laporan');
            buatL();
            navigation.navigate('Laporan');
          },
        },
        {
          text: 'Tidak',
          onPress: () => console.log('test'),
          style: 'cancel',
        },
      ],
      {cancelable: false},
      //clicking out side of alert will not cancel
    );
  };

  // key;
  const [hadir, setHadir] = useState(false);
  const [tidakHadir, setTidakHadir] = useState(false);
  return (
    <View style={styles.viewForCard}>
      <SelectPickker
        title="Pilih Absen"
        items={items}
        nilai={nilai}
        setNilai={setNilai}
        changeTitle={changeTitle}
        handlePilih={handlePilih}
        valueLabel="Doa Pagi"
        handlePilihPagi={handlePilih}
      />
      <View>
        <Card style={styles.container}>
          <Card.Content style={styles.card}>
            <TouchableOpacity>
              <View>
                <Title>{title}</Title>
              </View>
            </TouchableOpacity>
          </Card.Content>
        </Card>
      </View>
      <FlatList
        data={doaPagi}
        keyExtractor={(item) => item.key}
        renderItem={({item}) => (
          <View>
            <Card style={styles.container}>
              <Card.Content style={styles.card}>
                <TouchableOpacity>
                  <View>
                    <Title>{item.nama}</Title>
                    <Paragraph>
                      {item.jurusan} {item.angkatan}
                    </Paragraph>
                  </View>
                  <View>
                    <Title style={styles.keterangan}>Keterangan</Title>
                    <View style={styles.radio}>
                      <View style={styles.radioChild}>
                        <Text>Hadir</Text>
                        <RadioButton
                          status={
                            item.hadir === true && item.tidakHadir === false
                              ? 'checked'
                              : 'unchecked'
                          }
                          onPress={() => {
                            changeRadio(
                              item.key,
                              item.nama,
                              item.angkatan,
                              item.check,
                              true,
                              item.jurusan,
                              'Hadir',
                              false,
                            );
                          }}
                          value="Hadir"
                        />
                      </View>
                      <View style={styles.radioChild}>
                        <Text>Tiidak Hadir</Text>
                        <RadioButton
                          status={
                            item.hadir == false && item.tidakHadir == true
                              ? 'checked'
                              : 'unchecked'
                          }
                          onPress={() => {
                            changeRadio(
                              item.key,
                              item.nama,
                              item.angkatan,
                              item.check,
                              false,
                              item.jurusan,
                              'Tidak Hadir',
                              true,
                            );
                          }}
                          value="Tidak Hadir"
                        />
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
                <View>
                  <Avatar.Image
                    size={50}
                    source={require('../assets/list.png')}
                  />
                </View>
              </Card.Content>
            </Card>
          </View>
        )}
      />
      <FAB
        style={styles.fab}
        medium
        icon="send"
        onPress={(key) => {
          twoOptionAlertHandler();
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  viewForCard: {
    flex: 1,
    marginTop: 10,
    padding: 10,
  },
  keterangan: {
    fontSize: 15,
  },
  checkBox: {
    flexDirection: 'row',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
  radio: {
    width: 250,
    flexDirection: 'row',
    color: 'black',
    justifyContent: 'space-between',
  },
  radioChild: {
    flexDirection: 'row',
    width: 120,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  box: {
    width: 120,
  },
  test: {
    elevation: 10,
  },
});
