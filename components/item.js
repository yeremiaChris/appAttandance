import React, {useState, useEffect, useCallback} from 'react';
import {Card, Title, Paragraph, Surface} from 'react-native-paper';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  Text,
  FlatList,
} from 'react-native';
import {BottomNavigation} from 'react-native-paper';
// firestore
import firestore from '@react-native-firebase/firestore';
import DaftarHadirDanTidak from '../routes/daftarYangHadirDanTidak';
import {BaseRouter} from '@react-navigation/native';

const styles = StyleSheet.create({
  cardWrapper: {
    marginTop: 10,
    justifyContent: 'space-around',
    flexDirection: 'row',
    marginBottom: 10,
  },
  cardContent: {
    height: 100,
    width: 100,
    alignItems: 'center',
    padding: 10,
    elevation: 5,
  },
  groub: {
    alignItems: 'center',
  },
  container: {
    padding: 10,
  },
  container2: {
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
  viewForCard: {
    flex: 1,
    padding: 10,
  },
});

function item({props, doaPagi, progress, setProgress}) {
  const [button, setButton] = useState(true);
  // data laporan yang hadir
  const [listLaporan, setListLaporan] = useState([]);
  const [minggu, setMinggu] = useState([]);
  useEffect(() => {
    const dataLaporan = firestore()
      .collection('laporanDoaPagi')
      .orderBy('waktu', 'desc')
      .limit(1)
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
        setButton(false);
      });
    const dataLaporanMinggu = firestore()
      .collection('laporanIbadahMinggu')
      .orderBy('waktu', 'desc')
      .limit(1)
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
        setMinggu(list);
        setButton(false);
      });
    return () => {
      dataLaporan();
      dataLaporanMinggu();
    };
  }, []);

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

  // handleTouchKeDaftar Siswa
  const handleTouch = () => {
    props.navigation.navigate('Daftar');
  };

  // handle ke absen doapagi
  const handleDoapagi = () => {
    props.navigation.navigate('Absen');
  };

  // handle ke laporan
  const handleLaporan = () => {
    props.navigation.navigate('Laporan');
  };
  return (
    <>
      <View style={styles.cardWrapper}>
        <DaftarHadirDanTidak
          modal={modal}
          closeModal={closeModal}
          hadir={hadir}
          tidakHadir={tidakHadir}
          jumlahHadir={jumlahHadir}
          jumlahTidakHadir={jumlahTidakHadir}
        />
        <TouchableOpacity onPress={handleTouch} disabled={button}>
          <Card style={styles.cardContent}>
            <View style={styles.groub}>
              <Image source={require('../assets/list.png')} />
              <Text>DAFTAR</Text>
            </View>
          </Card>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleDoapagi} disabled={button}>
          <Card style={styles.cardContent}>
            <View style={styles.groub}>
              <Image source={require('../assets/absen.png')} />
              <Text>ABSEN</Text>
            </View>
          </Card>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleLaporan} disabled={button}>
          <Card style={styles.cardContent}>
            <View style={styles.groub}>
              <Image source={require('../assets/report.png')} />
              <Text>LAPORAN</Text>
            </View>
          </Card>
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <Card>
          <Card.Content style={styles.card}>
            <TouchableOpacity>
              <View>
                <Title>Terkini</Title>
              </View>
            </TouchableOpacity>
          </Card.Content>
        </Card>
      </View>

      <View style={styles.viewForCard}>
        <FlatList
          data={listLaporan}
          keyExtractor={(item) => item.key}
          renderItem={({item}) => {
            return (
              <TouchableOpacity
                disabled={button}
                onPress={() =>
                  handleForm(
                    item.dataHadir,
                    item.dataTidakHadir,
                    item.hadir,
                    item.tidakHadir,
                  )
                }>
                <Card style={styles.container2}>
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
              </TouchableOpacity>
            );
          }}
        />
        <FlatList
          disabled={button}
          data={minggu}
          keyExtractor={(item) => item.key}
          renderItem={({item}) => {
            return (
              <TouchableOpacity
                disabled={button}
                onPress={() =>
                  handleForm(
                    item.dataHadir,
                    item.dataTidakHadir,
                    item.hadir,
                    item.tidakHadir,
                  )
                }>
                <Card style={styles.container2}>
                  <Card.Content style={styles.card}>
                    <View>
                      <Title>Ibadah Minggu</Title>
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
              </TouchableOpacity>
            );
          }}
        />
      </View>
    </>
  );
}
export default React.memo(item);
