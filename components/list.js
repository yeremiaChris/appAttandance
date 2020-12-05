import React, {useState, useEffect, useCallback} from 'react';
import {
  Card,
  Title,
  Paragraph,
  Portal,
  Button,
  Modal,
  Avatar,
  IconButton,
  Colors,
} from 'react-native-paper';
import {
  StyleSheet,
  View,
  FlatList,
  Text,
  TouchableOpacity,
  Alert,
} from 'react-native';
import SelectPicker from '../shared/SelectPicker';
import SearchBar from 'react-native-dynamic-search-bar';
import ModalForm from './modal';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Checkbox} from 'react-native-paper';
import {object} from 'yup';
import ModalDetail from '../shared/modalDetail';
// firestore
import firestore from '@react-native-firebase/firestore';
import {changeCheckAll, deleteSiswa, dataAngkatan} from '../firestore/daftar';
import SnackBar from '../shared/snackBar';
import ProgressBar from '../shared/progressBar';
import Search from '../shared/search';

// label select
const label = [
  {label: 'Angkatan 2019', value: '2019'},
  {label: 'Angkatan 2018', value: '2018'},
  {label: 'Angkatan 2017', value: '2017'},
];

function list({navigation, selectedLocation}) {
  // disbale button
  const [button, setButton] = useState(true);

  // modalDetail
  const [visible, setVisible] = useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = {backgroundColor: 'white', padding: 20};

  const [detail, setDetail] = useState([]);
  // akhir ModalDetail

  // get key for delete
  const [key, setKey] = useState('');

  // chekcbox
  const [checked, setChecked] = React.useState(false);

  // display
  const [display, setDisplay] = useState(false);

  // checkall
  const [all, setAll] = useState(true);
  // const updateAll = () => {
  //   setSiswa([
  //     ...siswa.map((data) => {
  //       setAll(!all);
  //       return {
  //         ...data,
  //         check: !all,
  //       };
  //     }),
  //   ]);
  // };

  // deleteAllFunction
  const deleteAll = () => {
    twoOptionAlertHandler();
  };
  // alert delete
  const twoOptionAlertHandler = () => {
    //function to make two option alert
    Alert.alert(
      //title
      'Peringatan',
      //body
      'Yakin anda ingin menghapus ?',
      [
        {
          text: 'Yes',
          onPress: () => {
            deleteSiswa();
            setDisplay(false);
          },
        },
        {
          text: 'No',
          onPress: () => setDisplay(false),
          style: 'cancel',
        },
      ],
      {cancelable: false},
      //clicking out side of alert will not cancel
    );
  };

  // state select picker
  const [items, setItems] = useState(label);
  const [nilai, setNilai] = useState({
    tangkapValue: null,
  });

  // progress bar
  const [progress, setProgress] = useState(true);
  const [durasi, setDurasi] = useState(1);

  // get data from firestore
  const [siswa, setSiswa] = useState([]);

  // untuk search
  const [filteredDataSource, setFilteredDataSource] = useState([]);

  useEffect(() => {
    const getDaftar = firestore()
      .collection('daftar')
      .onSnapshot(function (snabshot) {
        if (snabshot.empty) {
          setProgress(false);
          setButton(false);
          return;
        }
        setProgress(false);
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
        setFilteredDataSource(list);
        setButton(false);
      });

    return () => getDaftar();
  }, []);

  // change checkbox
  const changeCheckBox = useCallback((doc, check) => {
    firestore()
      .collection('daftar')
      .doc(doc)
      .update({
        check: check,
      })
      .then((res) => {
        setButton(false);
      })
      .catch((err) => {
        setButton(true);
      });
  });

  // snackbar
  const [visible2, setVisible2] = useState(false);

  const onToggleSnackBar = () => setVisible2(true);

  const onDismissSnackBar = () => setVisible(false);
  // akhir snacbbar

  // title
  const [title, setTitle] = useState('Doa Pagi');
  const changeTitle = useCallback(
    (newTitle) => {
      setTitle(newTitle);
    },
    [title],
  );
  //   (newTitle) => {
  //   setTitle(newTitle);
  // };

  // goback
  const backGo = () => {
    navigation.goBack();
    setButton(false);
  };
  return (
    <>
      <View style={styles.searchWrap}>
        <Search
          button={button}
          handle={backGo}
          data={siswa}
          set={setSiswa}
          setFilteredDataSource={setFilteredDataSource}
        />
      </View>
      <View style={styles.cardWrapper}>
        <ModalDetail
          button={button}
          visible={visible}
          hideModal={hideModal}
          containerStyle={containerStyle}
          detail={detail}
          setVisible={setVisible}
        />
        {/* akhir modal */}
        <ProgressBar progress={progress} durasi={durasi} />
        <SelectPicker
          button={button}
          title="Pilih Angkatan"
          items={items}
          nilai={nilai}
          setNilai={setNilai}
          data={dataAngkatan}
          setSiswa={setFilteredDataSource}
          setProgress={setProgress}
          changeTitle={changeTitle}
        />
        <SnackBar
          onDismissSnackBar={onDismissSnackBar}
          visible={visible2}
          setVisible2={setVisible2}
        />
        <View style={styles.containerdua}>
          {display ? (
            <>
              <View style={styles.viewDelete}>
                <Checkbox
                  disabled={button}
                  status={all ? 'unchecked' : 'checked'}
                  onPress={(e) => {
                    e.preventDefault();
                    changeCheckAll(all, setAll);
                  }}
                />
                <IconButton
                  disabled={button}
                  icon="delete"
                  color={Colors.grey500}
                  size={20}
                  onPress={twoOptionAlertHandler}
                />
              </View>
            </>
          ) : null}

          <FlatList
            disabled={button}
            data={filteredDataSource}
            keyExtractor={(item) => item.key}
            renderItem={({item}) => (
              <TouchableOpacity
                disabled={button}
                onLongPress={(e) => {
                  e.preventDefault();
                  setDisplay(true);
                }}>
                <View style={styles.viewForCard}>
                  <Card style={styles.container}>
                    <Card.Content style={styles.card}>
                      {/* kalo di tahan lama maka checkbox ini akan muncul */}
                      {display ? (
                        <Checkbox
                          disabled={button}
                          status={item.check ? 'checked' : 'unchecked'}
                          onPress={(e) => {
                            e.preventDefault();
                            setChecked(!checked);
                            changeCheckBox(item.key, checked);
                          }}
                        />
                      ) : null}
                      <TouchableOpacity
                        disabled={button}
                        onPress={(e) => {
                          e.preventDefault();
                          setDetail({
                            nama: item.nama,
                            angkatan: item.angkatan,
                            jurusan: item.jurusan,
                            key: item.key,
                          });
                          showModal();
                        }}
                        onLongPress={(e) => {
                          e.preventDefault();
                          setDisplay(true);
                        }}>
                        <View>
                          <Title>{item.nama}</Title>
                          <Paragraph>
                            {item.jurusan} {item.angkatan}
                          </Paragraph>
                        </View>
                      </TouchableOpacity>
                      <Avatar.Image
                        size={50}
                        source={require('../assets/list.png')}
                      />
                    </Card.Content>
                  </Card>
                </View>
              </TouchableOpacity>
            )}
          />

          <ModalForm
            button={button}
            setSiswa={setSiswa}
            onToggleSnackBar={onToggleSnackBar}
            setVisible2={setVisible2}
          />
        </View>
      </View>
    </>
  );
}

export default React.memo(list);

const styles = StyleSheet.create({
  modal: {
    flexDirection: 'column',
  },
  cardWrapper: {
    padding: 10,
    flex: 1,
  },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  container: {
    marginBottom: 10,
  },
  viewForCard: {
    flex: 1,
  },
  containerdua: {
    flex: 1,
  },
  search: {
    backgroundColor: 'white',
  },
  containerSearch: {
    backgroundColor: 'white',
    borderTopWidth: 0,
    borderBottomWidth: 0,
    marginBottom: 10,
    elevation: 1,
  },
  modal: {
    height: 300,
    width: 300,
  },
  check: {
    display: 'none',
  },
  viewDelete: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  searchWrap: {
    backgroundColor: 'white',
    padding: 10,
  },
});
