import firestore from '@react-native-firebase/firestore';
import item from '../components/item';

// get  data realtime
const templateDaftar = firestore().collection('daftar');
const templateDoa = firestore().collection('doapagi');
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
          hadir: 'hadir',
          tidakHadir: 'tidakHadir',
        },
        doa: '',
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
export const absen = async (doc, angkatan, nama, doapagi) => {
  const data = await templateDoa
    .doc(doc)
    .set({
      angkatan,
      nama,
      doapagi,
    })
    .then((res) => {
      console.log('berhasil');
    })
    .catch((err) => {
      console.log('gagal');
    });
};
