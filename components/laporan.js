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
import SnackBar from '../shared/snackBar';
import ProgressBar from '../shared/progressBar';
import SearchByTanggal from '../shared/searchByTanggal';
import {log} from 'react-native-reanimated';

// label select
const label = [
  {label: 'Doa Pagi', value: true},
  {label: 'Ibadah Minggu', value: false},
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
export default function laporan({
  visible2,
  onDismissSnackBar,
  setVisible2,
  navigation,
}) {
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

  // progress bar
  const [progress, setProgress] = useState(true);
  const [durasi, setDurasi] = useState(1);

  // data laporan yang hadir
  const [listLaporan, setListLaporan] = useState([]);

  const [dataLapors, setDataLapor] = useState(true);
  const [dataLaporFix, setDataLaporFix] = useState('laporanDoaPagi');
  // untuk search
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  useEffect(() => {
    if (dataLapors == true) {
      setDataLaporFix('laporanIbadahMinggu');
    } else if (dataLapors == false || null) {
      setDataLaporFix('laporanDoaPagi');
    }
    const dataLaporan = firestore()
      .collection(dataLaporFix)
      .orderBy('tanggal', 'asc')
      .onSnapshot(function (snabshot) {
        let list = [];
        snabshot.forEach((doc) => {
          const datas = {
            hadir: doc.data().totalHadir,
            tidakHadir: doc.data().totalTidakHadir,
            tanggal: doc.data().tanggal,
            jam: doc.data().jam,
            key: doc.id,
            dataHadir: doc.data().dataHadir,
            dataTidakHadir: doc.data().dataTidakHadir,
          };
          list.push(datas);
        });
        setListLaporan(list);
        setFilteredDataSource(list);
        setProgress(false);
      });
    return () => dataLaporan;
  }, [dataLapors]);

  // state menampilkan modal
  const [modal, setModal] = useState(false);

  // pass data
  const [hadir, setHadir] = useState([]);
  const [tidakHadir, setTidakHadir] = useState([]);
  const [jumlahHadir, setJumlahHadir] = useState(0);
  const [jumlahTidakHadir, setJumlahTidakHadir] = useState(0);
  // handleModal Form hadir dan tidak
  const handleForm = (
    dataHadir,
    dataTidakHadir,
    jumlahHadir,
    jumlahTidakHadir,
  ) => {
    setModal(true);
    setHadir(dataHadir);
    setTidakHadir(dataTidakHadir);
    setJumlahHadir(jumlahHadir);
    setJumlahTidakHadir(jumlahTidakHadir);
  };

  // closeModal form hadir tidak
  const closeModal = () => {
    setModal(false);
    setHadir();
    setTidakHadir();
  };
  const laporSet = (test, tests, val) => {
    setDataLapor(val);
  };

  const [siswa, setSiswa] = useState('');
  // goback
  const backGo = () => {
    navigation.goBack();
  };
  console.log(filteredDataSource);
  return (
    <>
      <View style={styles.searchWrap}>
        <SearchByTanggal
          handle={backGo}
          data={listLaporan}
          set={setListLaporan}
          setFilteredDataSource={setFilteredDataSource}
        />
      </View>
      <View style={styles.viewForCard}>
        <DaftarHadirDanTidak
          modal={modal}
          closeModal={closeModal}
          hadir={hadir}
          tidakHadir={tidakHadir}
          jumlahHadir={jumlahHadir}
          jumlahTidakHadir={jumlahTidakHadir}
        />
        <ProgressBar progress={progress} durasi={durasi} />

        <SelectPicker
          title="Pilih laporan"
          items={items}
          setNilai={setNilai}
          nilai={nilai}
          changeTitle={changeTitle}
          handlePilih={handlePilihMinggu}
          handlePilihPagi={handlePilihPagi}
          valueLabel="DoaPagi"
          data={laporSet}
          setSiswa={setSiswa}
          setProgress={setProgress}
        />
        <SnackBar
          onDismissSnackBar={onDismissSnackBar}
          visible={visible2}
          setVisible2={setVisible2}
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
          renderItem={({item}) => {
            return (
              <TouchableOpacity
                onPress={() =>
                  handleForm(
                    item.dataHadir,
                    item.dataTidakHadir,
                    item.hadir,
                    item.tidakHadir,
                  )
                }>
                <View>
                  <Card style={styles.container}>
                    <Card.Content style={styles.card}>
                      <View>
                        <Title>{title}</Title>
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
    </>
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
  searchWrap: {
    backgroundColor: 'white',
    padding: 10,
  },
});
