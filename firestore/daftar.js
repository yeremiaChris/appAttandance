import firestore from '@react-native-firebase/firestore';
import {set} from 'react-native-reanimated';
import item from '../components/item';
import moment from 'moment';

const templateLaporan = firestore().collection('laporanDoaPagi');
// // ini untuk input ke data base laporan yang hadir saja
export const buatLaporan = (dataArray, dataArray2) => {
  const idLocale = require('moment/locale/id');
  moment.updateLocale('id', idLocale);
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

// tambah data
export const tambahSiswa = (nama, angkatan, jurusan) => {
  firestore()
    .collection('daftar')
    .add({
      nama,
      angkatan,
      jurusan,
      hadir: true,
      tidakHadir: false,
      tanggal: new Date().toDateString(),
    })
    .then((res) => {
      console.log('berhasil');
    })
    .catch((err) => {
      console.log('gagal');
    });
};

// checkbox siswa
