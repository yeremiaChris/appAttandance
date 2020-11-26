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
// modal daftar hadir dan tidak
import DaftarHadirDanTidak from '../routes/daftarYangHadirDanTidak';
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
  const [listLaporan, setListLaporan] = useState([]);
  useEffect(() => {
    const dataLaporan = firestore()
      .collection('laporanDoaPagi')
      .orderBy('waktu', 'desc')
      .onSnapshot(function (snabshot) {
        let list = [];
        snabshot.forEach((doc) => {
          const datas = {
            hadir: doc.data().totalHadir,
            tidakHadir: doc.data().totalTidakHadir,
            tanggal: doc.data().tanggal,
            jam: doc.data().jam,
            key: doc.id,
          };
          list.push(datas);
        });
        setListLaporan(list);
      });
    return () => dataLaporan();
  }, []);

  // handleModal Form hadir dan tidak
  const [modal, setModal] = useState(false);
  // handle button tambah
  const handleForm = () => {
    setModal(true);
  };

  // closeModal form hadir tidak
  const closeModal = () => {
    setModal(false);
  };
  return (
    <View style={styles.viewForCard}>
      <DaftarHadirDanTidak modal={modal} closeModal={closeModal} />
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
        data={listLaporan}
        keyExtractor={(item) => item.key}
        renderItem={({item}) => {
          return (
            <TouchableOpacity onPress={() => handleForm()}>
              <View>
                <Card style={styles.container}>
                  <Card.Content style={styles.card}>
                    <View>
                      <Title>Doa Pagi</Title>
                      <Paragraph>{item.tanggal}</Paragraph>
                      <Paragraph>pukul {item.jam} </Paragraph>
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
                        <Text style={styles.textSurface}>
                          {item.tidakHadir}
                        </Text>
                      </Surface>
                    </View>
                  </Card.Content>
                </Card>
              </View>
            </TouchableOpacity>
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
