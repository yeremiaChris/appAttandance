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
import {buatLaporan, buatLaporanMinggu} from '../firestore/daftar';
import SelectPicker from '../shared/SelectPicker';
// firestore
import firestore from '@react-native-firebase/firestore';
import {showMessage, hideMessage} from 'react-native-flash-message';

import ProgressBar from '../shared/progressBar';
import Search from '../shared/search';

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
  {label: 'Doa Pagi', value: true},
  {label: 'Ibadah Minggu', value: false},
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

  // progress
  const [progress, setProgress] = useState(true);
  const [durasi, setDurasi] = useState(1);

  // state doapagi
  const [doaPagi, setDoaPagi] = useState([]);

  // daftar yang tidak hadir saja
  const [tidakHadirSaja, setTidakHadirSaja] = useState([]);

  // mensortir yang hadir saja
  const [hadirSaja, setHadirSaja] = useState([]);

  // untuk search
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  // getData doa pagi
  useEffect(() => {
    const daftarTmp = firestore().collection('daftar');
    const data = daftarTmp
      .orderBy('tanggal', 'asc')
      .onSnapshot(function (snabshot) {
        let list = [];
        snabshot.forEach((doc) => {
          if (doc.exists) {
            const datas = {
              nama: doc.data().nama,
              angkatan: doc.data().angkatan,
              jurusan: doc.data().jurusan,
              key: doc.id,
              hadir: doc.data().hadir,
              tidakHadir: doc.data().tidakHadir,
            };
            list.push(datas);
          } else {
            return;
          }
        });
        setDoaPagi(list);
        setFilteredDataSource(list);
        setProgress(false);
      });
    return data;
  }, []);

  // getData doa pagi
  useEffect(() => {
    const daftarTmp = firestore().collection('daftar');
    const data = daftarTmp
      .where('kehadiran', '==', 'Tidak Hadir')
      .onSnapshot((snabshot) => {
        let list = [];
        snabshot.forEach((doc) => {
          const data = {
            nama: doc.data().nama,
            angkatan: doc.data().angkatan,
            tanggal: doc.data().tanggal,
            jurusan: doc.data().jurusan,
          };
          list.push(data);
        });
        setTidakHadirSaja(list);
      });
    return data;
  }, []);

  useEffect(() => {
    const daftarTmp = firestore().collection('daftar');
    const data = daftarTmp
      .where('kehadiran', '==', 'Hadir')
      .onSnapshot((snabshot) => {
        let list = [];
        snabshot.forEach((doc) => {
          const data = {
            nama: doc.data().nama,
            angkatan: doc.data().angkatan,
            tanggal: doc.data().tanggal,
            jurusan: doc.data().jurusan,
          };
          list.push(data);
        });
        setHadirSaja(list);
      });
    return data;
  }, []);

  // buat laporan yang hadir saja dan tidak hadir
  const [buat, setBuat] = useState(true);
  const buatL = () => {
    buatLaporan(tidakHadirSaja, hadirSaja);
  };
  const buatM = () => {
    buatLaporanMinggu(tidakHadirSaja, hadirSaja);
  };

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
            if (buat == true || buat == null) {
              buatL();
              navigation.navigate('Laporan');
            } else {
              buatM();
              navigation.navigate('Laporan');
            }
          },
        },
        {
          text: 'Tidak',
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

  // select
  const dataSelect = (tests, test, val) => {
    setBuat(val);
  };

  const changeRadio = (doc, hadir, kehadiran, tidakHadir) => {
    firestore()
      .collection('daftar')
      .doc(doc)
      .update({
        hadir,
        kehadiran,
        tidakHadir,
      })
      .then((res) => {
        return;
      })
      .catch((err) => {
        return;
      });
  };

  // goback
  const backGo = () => {
    navigation.goBack();
  };

  return (
    <>
      <View style={styles.searchWrap}>
        <Search
          handle={backGo}
          data={doaPagi}
          setFilteredDataSource={setFilteredDataSource}
        />
      </View>
      <View style={styles.viewForCard}>
        <ProgressBar progress={progress} durasi={durasi} />

        <SelectPickker
          title="Pilih Absen"
          items={items}
          nilai={nilai}
          setNilai={setNilai}
          changeTitle={changeTitle}
          handlePilih={handlePilih}
          setSiswa={setTitle}
          valueLabel="Doa Pagi"
          handlePilihPagi={handlePilih}
          data={dataSelect}
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
          data={filteredDataSource}
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
                              changeRadio(item.key, true, 'Hadir', false);
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
                              changeRadio(item.key, false, 'Tidak Hadir', true);
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
    </>
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
  searchWrap: {
    backgroundColor: 'white',
    padding: 10,
  },
});
