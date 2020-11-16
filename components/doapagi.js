import React, {useState} from 'react';
import {StyleSheet, View, TouchableOpacity, Text, FlatList} from 'react-native';
import {Card, Title, Paragraph, Avatar, FAB} from 'react-native-paper';
import {CheckBox} from 'react-native-elements';
import {RadioButton} from 'react-native-paper';
import SelectPickker from '../shared/SelectPicker';
import RadioButtonRN from 'radio-buttons-react-native';

const initialDoaPagi = [
  {
    nama: 'Yeremia Chris Saragi',
    angkatan: 2018,
    jurusan: 'Sistem Informasi',
    key: '1',
    check: false,
  },
  {
    nama: 'Yeremia Chris Saragi',
    angkatan: 2018,
    jurusan: 'Sistem Informasi',
    key: '2',
    check: false,
  },
  {
    nama: 'Yeremia Chris Saragi',
    angkatan: 2018,
    jurusan: 'Sistem Informasi',
    key: '3',
    check: false,
  },
  {
    nama: 'Yeremia Chris Saragi',
    angkatan: 2018,
    jurusan: 'Sistem Informasi',
    key: '4',
    check: false,
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
export default function doapagi() {
  // state doapagi
  const [doaPagi, setDoaPagi] = useState(initialDoaPagi);
  // label select
  const label = [
    {label: 'Doa Pagi', value: 'Doa Pagi'},
    {label: 'Ibadah Minggu', value: 'Ibadah Minggu'},
  ];
  const [items, setItems] = useState(label);
  const [nilai, setNilai] = useState({
    tangkapValue: null,
  });
  // ganti data pada select agar ketika kita pilih doa pagi maka data yang di tampilkan adalah doa pagi
  const [title, setTitle] = useState('Doa Pagi');
  const changeTitle = (newTitle) => {
    setTitle(newTitle);
  };
  return (
    <View style={styles.viewForCard}>
      <SelectPickker
        title="Pilih Absen"
        items={items}
        nilai={nilai}
        setNilai={setNilai}
        changeTitle={changeTitle}
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
      <FAB style={styles.fab} small icon="send" />
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
