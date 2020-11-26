import React, {useState} from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import list from '../components/list';
import laporan from '../components/laporan';
import {Modal, StyleSheet, View, Text} from 'react-native';
import {IconButton} from 'react-native-paper';
import HadirDanTidak from '../components/hadirDanTidak';
const Tab = createMaterialTopTabNavigator();
export default function daftarYangHadirDanTidak({modal, closeModal}) {
  // state modal

  return (
    <Modal animationType="slide" visible={modal}>
      <View style={styles.header}>
        <IconButton
          icon="arrow-left"
          size={25}
          onPress={closeModal}
          color="white"
        />
        <Text style={styles.textHeader}>Laporan Detail</Text>
      </View>
      <Tab.Navigator>
        <Tab.Screen name="Hadir" component={HadirDanTidak} />
        <Tab.Screen name="Tidak Hadir" component={laporan} />
        <Tab.Screen name="Tanpa Keterangan" component={laporan} />
      </Tab.Navigator>
    </Modal>
  );
}

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
