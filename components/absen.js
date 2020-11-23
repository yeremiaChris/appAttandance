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
  const [value, setValue] = React.useState('first');
  const sett = (doc, angkatan, nama, doapagi) => {
    absen(doc, angkatan, nama, doapagi);
  };
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
                      <RadioButton.Group
                        key={item.key}
                        style={styles.radio}
                        onValueChange={(newValue) => {
                          console.log(newValue);
                          console.log(item.key);
                          setValue(newValue);
                          sett(item.key, item.angkatan, item.nama, newValue);
                        }}
                        value={value}>
                        <View style={styles.radioChild}>
                          <Text>Hadir</Text>
                          <RadioButton value="Hadir" />
                        </View>
                        <View style={styles.radioChild}>
                          <Text>Tiidak Hadir</Text>
                          <RadioButton value="Tidak Hadir" />
                        </View>
                      </RadioButton.Group>
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
});
