import React, {useState} from 'react';
import {
  Card,
  Title,
  Paragraph,
  Modal,
  Portal,
  Button,
  Provider,
} from 'react-native-paper';
import {
  StyleSheet,
  View,
  FlatList,
  Text,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {Avatar, IconButton, Colors} from 'react-native-paper';
import SelectPicker from '../shared/SelectPicker';
import SearchBar from 'react-native-dynamic-search-bar';
import ModalForm from './modal';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Checkbox} from 'react-native-paper';
import {object} from 'yup';

const initialSiswa = [
  {
    nama: 'apa Chris Saragi',
    angkatan: 2018,
    jurusan: 'Sistem Informasi',
    key: '20',
    check: false,
  },
  {
    nama: 'Yeremia Chris Saragi',
    angkatan: 2018,
    jurusan: 'Sistem Informasi',
    key: '2',
    check: false,
  },

  {
    nama: 'Yeremia Chris Saragi',
    angkatan: 2018,
    jurusan: 'Sistem Informasi',
    key: '3',
    check: false,
  },
];
export default function list() {
  const [siswa, setSiswa] = useState(initialSiswa);
  const [visible, setVisible] = useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = {backgroundColor: 'white', padding: 20};

  // get key for delete
  const [key, setKey] = useState('');

  // chekcbox
  const [checked, setChecked] = React.useState(false);
  // display
  const [display, setDisplay] = useState(false);
  // checkall
  const [all, setAll] = useState(false);
  const updateAll = () => {
    setSiswa([
      ...siswa.map((data) => {
        setAll(!all);
        return {
          ...data,
          check: !all,
        };
      }),
    ]);
  };

  // deleteAllFunction
  const deleteAll = () => {
    twoOptionAlertHandler();
  };
  // delete alert
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
            setSiswa((prev) => {
              return prev.filter((p) => p.check != true);
            }),
              setDisplay(false);
          },
        },
        {
          text: 'No',
          onPress: () => console.log('No Pressed'),
          style: 'cancel',
        },
      ],
      {cancelable: false},
      //clicking out side of alert will not cancel
    );
  };
  return (
    <View style={styles.cardWrapper}>
      <SelectPicker />
      <View style={styles.containerdua}>
        {display ? (
          <>
            <View style={styles.viewDelete}>
              <Checkbox
                status={all ? 'checked' : 'unchecked'}
                onPress={updateAll}
              />
              <IconButton
                icon="delete"
                color={Colors.grey500}
                size={20}
                onPress={deleteAll}
              />
            </View>
          </>
        ) : null}
        <FlatList
          data={siswa}
          keyExtractor={(item) => item.key}
          renderItem={({item}) => (
            <TouchableOpacity
              onLongPress={() => {
                setDisplay(true);
              }}>
              <View style={styles.viewForCard}>
                <Card style={styles.container}>
                  <Card.Content style={styles.card}>
                    {display ? (
                      <Checkbox
                        status={item.check ? 'checked' : 'unchecked'}
                        onPress={() => {
                          item.check = checked;
                          setChecked(!checked);
                        }}
                      />
                    ) : null}
                    <View>
                      <Title>{item.nama}</Title>
                      <Paragraph>
                        {item.jurusan} {item.angkatan}
                      </Paragraph>
                    </View>
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

        <ModalForm setSiswa={setSiswa} />
      </View>
    </View>
  );
}
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
});
