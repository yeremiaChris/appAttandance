import firestore from '@react-native-firebase/firestore';
import {set} from 'react-native-reanimated';
import item from '../components/item';

// get  data realtime
const templateDaftar = firestore().collection('daftar');
const templateDoa = firestore().collection('doapagi');
const templateLaporan = firestore().collection('laporanDoaPagi');
export const getDaftar = async (set) => {
  const data = await templateDaftar.onSnapshot(function (snabshot) {
    let list = [];
    snabshot.forEach((doc) => {
      const datas = {
        nama: doc.data().nama,
        angkatan: doc.data().angkatan,
        jurusan: doc.data().jurusan,
        key: doc.id,
        check: false,
        kehadiran: '',
      };
      list.push(datas);
    });
    set(list);
  });
};
export const getDoaPagi = async (set, value) => {
  const data = await templateDaftar.onSnapshot(function (snabshot) {
    let list = [];
    snabshot.forEach((doc) => {
      const datas = {
        nama: doc.data().nama,
        angkatan: doc.data().angkatan,
        jurusan: doc.data().jurusan,
        key: doc.id,
        kehadiran: {
          hadir: 'Hadir',
          tidakHadir: 'Tidak Hadir',
        },
        checkHadir: false,
        checkTidakHadir: false,
      };
      list.push(datas);
    });
    set(list);
  });
};
// delete
export const deleteDaftar = async (key) => {
  const data = await templateDaftar
    .where('check', '==', true)
    .delete()
    .then((success) => {
      console.log('sucess');
    })
    .catch((err) => console.log('error'));
};
// ini untuk absen
export const absen = async (doc, angkatan, nama, doapagi, jurusan) => {
  const data = await templateDoa
    .doc(doc)
    .set({
      angkatan,
      nama,
      doapagi,
      jurusan,
    })
    .then((res) => {
      console.log('berhasil');
    })
    .catch((err) => {
      console.log('gagal');
    });
};
// data absen yang hadir
export const yangHadir = async (set) => {
  const data = await templateDoa
    .where('doapagi', '==', 'Hadir')
    .onSnapshot((snabshot) => {
      let list = [];
      snabshot.forEach((doc) => {
        const datas = {
          nama: doc.data().nama,
          angkatan: doc.data().angkatan,
          jurusan: doc.data().jurusan,
          Kehadiran: doc.data().doapagi,
        };
        list.push(datas);
      });
      set(list);
    });
};

export const buatLaporan = async (dataArray) => {
  const data = await firestore()
    .collection('laporanDoaPagi')
    .add({
      jumlahHadir: dataArray.length,
      tanggal: new Date(),
    })
    .then((res) => console.log('berhasil'))
    .catch((err) => console.log(err));
};
