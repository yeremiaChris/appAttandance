import firestore from '@react-native-firebase/firestore';
import {set} from 'react-native-reanimated';
import item from '../components/item';
import moment from 'moment';

const templateLaporan = firestore().collection('laporanDoaPagi');
// // ini untuk input ke data base laporan yang hadir saja
const idLocale = require('moment/locale/id');
moment.updateLocale('id', idLocale);
export const buatLaporan = (dataArray, dataArray2) => {
  templateLaporan
    .add({
      dataHadir: dataArray2,
      dataTidakHadir: dataArray,
      totalHadir: dataArray2.length,
      totalTidakHadir: dataArray.length,
      tanggal: moment(new Date()).format('dddd,D MMM yyyy'),
      jam: moment(new Date()).format('HH:mm'),
      waktu: firestore.FieldValue.serverTimestamp(),
    })
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
};
// // ini untuk input ke data base laporan yang hadir saja
export const buatLaporanMinggu = (dataArray, dataArray2) => {
  const idLocale = require('moment/locale/id');
  moment.updateLocale('id', idLocale);
  firestore()
    .collection('laporanIbadahMinggu')
    .add({
      dataHadir: dataArray2,
      dataTidakHadir: dataArray,
      totalHadir: dataArray2.length,
      totalTidakHadir: dataArray.length,
      tanggal: moment(new Date()).format('dddd,D MMM yyyy'),
      jam: moment(new Date()).format('HH:mm'),
      waktu: firestore.FieldValue.serverTimestamp(),
    })
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
};

// ini untuk mengatur toggle pada radio button
export const changeRadio = (doc, hadir, kehadiran, tidakHadir, navigation) => {
  const unsubcribe = navigation.addListener('focus', () => {
    firestore()
      .collection('daftar')
      .doc(doc)
      .update({
        hadir,
        kehadiran,
        tidakHadir,
      })
      .then((res) => {
        return;
      })
      .catch((err) => {
        return;
      });
  });

  return () => unsubcribe;
};

// tambah data
export const tambahSiswa = (nama, angkatan, jurusan, set) => {
  firestore()
    .collection('daftar')
    .add({
      nama,
      angkatan,
      jurusan,
      kehadiran: 'Hadir',
      check: false,
      hadir: true,
      tidakHadir: false,
      tanggal: firestore.FieldValue.serverTimestamp(),
    })
    .then((res) => {
      setInterval(() => {
        set(false);
      }, 3000);
    })
    .catch((err) => {
      set(false);
    });
};

// checkbox all list siswa
export const changeCheckAll = (all, setAll) => {
  firestore()
    .collection('daftar')
    .get()
    .then((querySnabShot) => {
      querySnabShot.forEach((doc) => {
        doc.ref.update({
          check: all,
        });
      });
    });
  setAll(!all);
};

// delete siswa
export const deleteSiswa = () => {
  firestore()
    .collection('daftar')
    .where('check', '==', true)
    .get()
    .then((querySnabShot) => {
      const batch = firestore().batch();
      querySnabShot.forEach((doc) => {
        batch.delete(doc.ref);
      });
      // commit the batch
      return batch.commit();
    })
    .then((res) => {
      console.log('berhasil delete');
    })
    .catch((err) => {
      console.log('gagal delete');
    });
};

// update
export const updateDetail = (doc, angkatan, nama, jurusan) => {
  firestore().collection('daftar').doc(doc).update({
    angkatan,
    nama,
    jurusan,
    tanggal: firestore.FieldValue.serverTimestamp(),
  });
};

// orderby angkatan
export const dataAngkatan = (setSiswa, setProgress, angkatan) => {
  firestore()
    .collection('daftar')
    .where('angkatan', '==', angkatan)
    .onSnapshot(function (snabshot) {
      let list = [];
      snabshot.forEach((doc) => {
        const datas = {
          nama: doc.data().nama,
          angkatan: doc.data().angkatan,
          jurusan: doc.data().jurusan,
          key: doc.id,
          check: doc.data().check,
          kehadiran: '',
        };
        list.push(datas);
      });
      setSiswa(list);
      setProgress(false);
    });
};

// laporan
export const urutLaporan = (
  setListLaporan,
  setFilteredDataSource,
  setProgress,
  laporan,
) => {
  firestore()
    .collection(laporan)
    .orderBy('waktu', 'desc')
    .where('waktu', '>', new Date(1529802276644))
    .onSnapshot(function (snabshot) {
      let list = [];
      if (snabshot.empty) {
        setProgress(false);
        setButton(false);
        return;
      }
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
};
