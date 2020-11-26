import firestore from '@react-native-firebase/firestore';
import {set} from 'react-native-reanimated';
import item from '../components/item';
import moment from 'moment';
// get  data realtime
const templateDaftar = firestore().collection('daftar');
const templateDoa = firestore().collection('doapagi');
const templateLaporan = firestore().collection('laporanDoaPagi');
// daftar siswa agar masuk di daftar absen
// export const deleteDaftar = async (key) => {
//   const data = await templateDaftar
//     .where('check', '==', true)
//     .delete()
//     .then((success) => {
//       console.log('sucess');
//     })
//     .catch((err) => console.log('error'));
//   return () => {
//     data();
//   };
// };

// ini untuk absen pada radio button
export const absen = (doc, angkatan, nama, doapagi, jurusan) => {
  templateDoa
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
// // ini untuk input ke data base laporan yang hadir saja
export const buatLaporan = (dataArray) => {
  templateLaporan
    .add({
      jumlahHadir: dataArray.length,
    })
    .then((res) => console.log('berhasil'))
    .catch((err) => console.log(err));
};

// ambil laporan
