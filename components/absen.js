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
import RadioButtonRN from 'radio-buttons-react-native';
import {getDaftar} from '../firestore/daftar';
const initialDoaPagi = [
  {
    nama: '',
    angkatan: '',
    jurusan: '',
    key: '',
    check: '',
  },
];
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
  // state doapagi
  const [doaPagi, setDoaPagi] = useState([]);
  // state select
  const [items, setItems] = useState(label);
  const [nilai, setNilai] = useState({
    tangkapValue: null,
  });
  // ganti data pada select agar ketika kita pilih doa pagi maka data yang di tampilkan adalah doa pagi
  const [title, setTitle] = useState('Doa Pagi');
  const changeTitle = (newTitle) => {
    setTitle(newTitle);
  };
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
  // getData
  useEffect(() => {
    getDaftar(setDoaPagi);
  });

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
                    <RadioButtonRN
                      textStyle={{marginLeft: 10}}
                      boxStyle={styles.box}
                      box={false}
                      textColor="black"
                      data={data}
                      selectedBtn={(e) => console.log(e)}
                      style={styles.radio}
                    />
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
      <FAB style={styles.fab} medium icon="send" />
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
    flexDirection: 'row',
    color: 'black',
    justifyContent: 'space-between',
  },
  box: {
    width: 120,
  },
});
