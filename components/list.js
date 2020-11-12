import React, {useState} from 'react';
import {Card, Title, Paragraph} from 'react-native-paper';
import {StyleSheet, View, FlatList} from 'react-native';
import {Avatar} from 'react-native-paper';
import SelectPicker from '../shared/SelectPicker';
import {FAB} from 'react-native-paper';
import SearchBar from 'react-native-dynamic-search-bar';
const initialSiswa = [
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
];
export default function list() {
  const [siswa, setSiswa] = useState(initialSiswa);
  return (
    <View style={styles.cardWrapper}>
      <SelectPicker />
      <View style={styles.containerdua}>
        <FlatList
          data={siswa}
          keyExtractor={(item) => item.key}
          renderItem={({item}) => (
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
          )}
        />
      </View>
      <FAB
        style={styles.fab}
        medium
        icon="plus"
        onPress={() => console.log('Pressed')}
      />
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
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
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
});
