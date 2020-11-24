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
import {getDoaPagi, absen} from '../firestore/daftar';
import SelectPicker from '../shared/SelectPicker';

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
export default function Absen() {
  // mengelola pilihan absen
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

  // alert berhasil take attandance
  const twoOptionAlertHandler = () => {
    //function to make two option alert
    Alert.alert(
      //title
      'Berhasil mengambil absen',
      //body
      'Lihat laporan ?',
      [
        {
          text: 'Yes',
          onPress: () => {
            console.log('masuk ke laporan');
          },
        },
        {
          text: 'No',
          onPress: () => console.log('test'),
          style: 'cancel',
        },
      ],
      {cancelable: false},
      //clicking out side of alert will not cancel
    );
  };

  // state doapagi
  const [doaPagi, setDoaPagi] = useState([]);
  // getData
  useEffect(() => {
    getDoaPagi(setDoaPagi);
  }, []);

  // mengelola radio button pilihan hadir dan tidak hadir
  const [checked, setChecked] = useState(false);

  // mengelola absen doa pagi
  const sett = (doc, angkatan, nama, doapagi) => {
    absen(doc, angkatan, nama, doapagi);
  };
  // key
  const [hadir, setHadir] = useState(true);
  const [tidakHadir, setTidakHadir] = useState(true);
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
                          value={item.kehadiran.hadir}
                          status={
                            item.checkHadir == true &&
                            item.checkTidakHadir == false
                              ? 'checked'
                              : 'unchecked'
                          }
                          onPress={() => {
                            item.checkHadir = hadir;
                            setHadir(!hadir);
                            item.checkTidakHadir = false;
                            if (
                              item.checkHadir == true &&
                              item.checkTidakHadir == false
                            ) {
                              sett(item.key, item.angkatan, item.nama, 'Hadir');
                            } else {
                              item.checkHadir = false;
                              item.checkTidakHadir = false;
                              sett(item.key, item.angkatan, item.nama, '');
                            }
                            // console.log(item.checkHadir);
                            // console.log(item.checkTidakHadir);
                            // console.log(item.checkTidakHadir);
                            // console.log(item.checkTidakHadir);
                            // if (
                            //   item.checkHadir == false &&
                            //   item.checkTidakHadir == false
                            // ) {
                            //   item.checkHadir = hadir;
                            //   setHadir(!hadir);
                            // }
                            // handle absen
                            // if (
                            //   item.checkHadir == true &&
                            //   item.checkTidakHadir == false
                            // ) {
                            //   // sett(item.key, item.angkatan, item.nama, 'Hadir');
                            //   item.checkTidakHadir = tidakHadir;
                            //   setTidakHadir(false);
                            //   console.log(item.checkHadir, 'satu');
                            //   console.log(item.checkTidakHadir, 'satus');
                            // }
                          }}
                        />
                      </View>
                      <View style={styles.radioChild}>
                        <Text>Tiidak Hadir</Text>
                        <RadioButton
                          value={item.kehadiran.tidakHadir}
                          status={
                            item.checkTidakHadir == true &&
                            item.checkHadir == false
                              ? 'checked'
                              : 'unchecked'
                          }
                          onPress={() => {
                            item.checkTidakHadir = tidakHadir;
                            setTidakHadir(!tidakHadir);
                            item.checkHadir = false;
                            if (
                              item.checkTidakHadir == true &&
                              item.checkHadir == false
                            ) {
                              sett(
                                item.key,
                                item.angkatan,
                                item.nama,
                                'Tidak Hadir',
                              );
                            } else {
                              item.checkHadir = false;
                              item.checkTidakHadir = false;
                              sett(item.key, item.angkatan, item.nama, '');
                            }
                            // item.checkTidakHadir = tidakHadir;
                            // setTidakHadir(!tidakHadir);
                            // item.checkHadir = false;
                            // console.log(item.checkTidakHadir);
                            // console.log(item.checkHadir);
                            // if (
                            //   item.checkHadir == true &&
                            //   item.checkTidakHadir == false
                            // ) {
                            //   item.checkHadir = false;
                            //   item.checkTidakHadir = tidakHadir;
                            //   setTidakHadir(!tidakHadir);
                            //   console.log(item.checkHadir, 'hadir');
                            //   console.log(item.checkTidakHadir, 'tidakHadir');
                            // }
                          }}
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
        onPress={() => {
          // console.log('test');
          // datas();
          console.log(key);
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
