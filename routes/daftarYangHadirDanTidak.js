import React, {useState} from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import list from '../components/list';
import {Modal, StyleSheet, View, Text} from 'react-native';
import {IconButton} from 'react-native-paper';
import HadirDanTidak from '../components/hadirDanTidak';
const Tab = createMaterialTopTabNavigator();
function daftarYangHadirDanTidak({
  modal,
  closeModal,
  hadir,
  tidakHadir,
  jumlahHadir,
  jumlahTidakHadir,
  button,
}) {
  return (
    <Modal animationType="slide" visible={modal}>
      <View style={styles.header}>
        <IconButton
          disabled={button}
          icon="arrow-left"
          size={25}
          onPress={closeModal}
          color="white"
        />
        <Text style={styles.textHeader}>Laporan Detail</Text>
      </View>
      <Tab.Navigator>
        <Tab.Screen name="Hadir">
          {(props) => (
            <HadirDanTidak
              {...props}
              kehadiran={hadir}
              jumlah={jumlahHadir}
              button={button}
            />
          )}
        </Tab.Screen>
        <Tab.Screen name="Tidak Hadir">
          {(props) => (
            <HadirDanTidak
              {...props}
              button={button}
              kehadiran={tidakHadir}
              jumlah={jumlahTidakHadir}
            />
          )}
        </Tab.Screen>
      </Tab.Navigator>
    </Modal>
  );
}
export default React.memo(daftarYangHadirDanTidak);
const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 16,
    right: 200,
    bottom: 0,
  },
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'indigo',
  },
  textHeader: {
    fontSize: 20,
    color: 'white',
  },
});
