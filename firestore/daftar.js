import firestore from '@react-native-firebase/firestore';
import item from '../components/item';

// get  data realtime
export const getDaftar = async (set) => {
  const data = await firestore()
    .collection('daftar')
    .onSnapshot(function (snabshot) {
      let list = [];
      snabshot.forEach((doc) => {
        const datas = {
          nama: doc.data().nama,
          angkatan: doc.data().angkatan,
          jurusan: doc.data().jurusan,
          key: doc.id,
          check: doc.data().check,
        };
        list.push(datas);
      });
      set(list);
    });
  // function data ini untuk unsubcribe agar berhenti untuk berubah karna kalo nggak di buat dia akan error
};

export const deleteDaftar = async (key) => {
  const data = await firestore()
    .collection('daftar')
    .where('check', '==', true)
    .delete()
    .then((success) => {
      console.log('sucess');
    })
    .catch((err) => console.log('error'));
};
