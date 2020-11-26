import React, {useEffect, useState} from 'react';
import {
  Card,
  Title,
  Paragraph,
  Avatar,
  Surface,
  Text,
} from 'react-native-paper';
import {StyleSheet, View, TouchableOpacity, FlatList} from 'react-native';
import SelectPicker from '../shared/SelectPicker';
// firestore
import firestore from '@react-native-firebase/firestore';
import moment from 'moment';

// label select
const label = [
  {label: 'Doa Pagi', value: 'Doa Pagi'},
  {label: 'Ibadah Minggu', value: 'Ibadah Minggu'},
];
// inital doa pagi
const DoaPagi = [
  {
    title: 'Doa Pagi',
    tanggal: 'Senin 20 Des 2021',
    hadir: '20',
    tidakHadir: '10',
    key: '3',
  },
  {
    title: 'Doa Pagi',
    tanggal: 'Senin 2 Des 2021',
    hadir: '20',
    tidakHadir: '10',
    key: '4',
  },
];
// initial ibadah minggu
const IbadahMinggu = [
  {
    title: 'Ibadah Minggu',
    tanggal: 'Minggu 20 Des 2021',
    hadir: '20',
    tidakHadir: '10',
    key: '1',
  },
  {
    title: 'Ibadah Minggu',
    tanggal: 'Minggu 2 Des 2021',
    hadir: '20',
    tidakHadir: '10',
    key: '2',
  },
];
export default function laporan() {
  // state select
  const [items, setItems] = useState(label);
  const [nilai, setNilai] = useState({
    tangkapValue: null,
  });
  // state laporan doapagi
  const [doaPagi, setDoapagi] = useState(DoaPagi);
  // state ibadah minggu
  const [ibadahMinggu, setIbadahMinggu] = useState(IbadahMinggu);

  // mengelola state pilih
  const [pilih, setPilih] = useState(DoaPagi);
  const handlePilihMinggu = () => {
    setPilih(IbadahMinggu);
  };
  // doa pagi
  const handlePilihPagi = () => {
    setPilih(DoaPagi);
  };
  // ganti data pada select agar ketika kita pilih doa pagi maka data yang di tampilkan adalah doa pagi
  const [title, setTitle] = useState('Doa Pagi');
  const changeTitle = (newTitle) => {
    setTitle(newTitle);
  };

  // data laporan yang hadir
  const [laporan, setLaporan] = useState([]);
  useEffect(() => {
    const dataLaporan = firestore()
      .collection('laporanDoaPagi')
      .onSnapshot(function (snabshot) {
        let list = [];
        const idLocale = require('moment/locale/id');
        const date = new Date();
        snabshot.forEach((doc) => {
          const datas = {
            hadir: doc.data().jumlahHadir,
            tanggal: moment(date).format('D MMM Y'),
            key: doc.id,
          };
          list.push(datas);
        });
        setLaporan(list);
      });
    return () => dataLaporan();
  }, [laporan]);
  return (
    <View style={styles.viewForCard}>
      <SelectPicker
        title="Pilih laporan"
        items={items}
        setNilai={setNilai}
        nilai={nilai}
        changeTitle={changeTitle}
        handlePilih={handlePilihMinggu}
        handlePilihPagi={handlePilihPagi}
        valueLabel="DoaPagi"
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
        data={laporan}
        keyExtractor={(item) => item.key}
        renderItem={({item}) => {
          return (
            <View>
              <Card style={styles.container}>
                <Card.Content style={styles.card}>
                  <View>
                    <Title>Doa Pagi</Title>
                    <Paragraph>{item.tanggal}</Paragraph>
                    <Paragraph>pukul {item.jam}</Paragraph>
                  </View>
                  <View style={styles.surfaceContainer}>
                    <Text>Hadir</Text>
                    <Surface style={styles.surface}>
                      <Text style={styles.textSurface}>{item.hadir}</Text>
                    </Surface>
                  </View>
                  <View style={styles.surfaceContainer}>
                    <Text>Tidak Hadir</Text>
                    <Surface style={styles.surface}>
                      <Text style={styles.textSurface}>10</Text>
                    </Surface>
                  </View>
                </Card.Content>
              </Card>
            </View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  viewForCard: {
    flex: 1,
    marginTop: 10,
    padding: 10,
  },
  container: {
    marginBottom: 10,
  },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  surface: {
    padding: 8,
    height: 40,
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
  },
  textSurface: {
    fontSize: 15,
  },
  surfaceContainer: {
    alignItems: 'center',
    height: 70,
    justifyContent: 'space-between',
  },
});
