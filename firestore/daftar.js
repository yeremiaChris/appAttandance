import firestore from '@react-native-firebase/firestore';
import {set} from 'react-native-reanimated';
import item from '../components/item';
import moment from 'moment';

const templateLaporan = firestore().collection('laporanDoaPagi');
// // ini untuk input ke data base laporan yang hadir saja
export const buatLaporan = (dataArray, dataArray2) => {
  templateLaporan
    .add({
      dataHadir: dataArray2,
      dataTidakHadir: dataArray,
      totalHadir: dataArray2.length,
      totalTidakHadir: dataArray.length,
      tanggal: moment(new Date()).format('dddd,D MMM yyyy'),
      jam: moment(new Date()).format('HH:mm'),
      waktu: moment(new Date()).format('llll'),
    })
    .then((res) => console.log('berhasil'))
    .catch((err) => console.log(err));
};

// handle Ke laporan untuk ngabsen hadir tidaknya
export const handleChangeRadioButton = (
  doc,
  nama,
  angkatan,
  jurusan,
  kehadiran,
) => {
  firestore()
    .collection('doapagi')
    .doc(doc)
    .set({
      nama,
      angkatan,
      jurusan,
      kehadiran,
    })
    .then(() => {
      console.log('berhasil');
    })
    .catch(() => {
      console.log('error');
    });
};
// ini untuk mengatur toggle pada radio button
export const changeRadio = (
  doc,
  nama,
  angkatan,
  check,
  hadir,
  jurusan,
  kehadiran,
  tidakHadir,
) => {
  return firestore()
    .collection('daftar')
    .doc(doc)
    .set({
      nama,
      angkatan,
      check,
      hadir,
      jurusan,
      kehadiran,
      tidakHadir,
    })
    .then((res) => console.log('res'))
    .catch((err) => console.log('kereen'));
};
