import React from 'react';
const Drawer = createDrawerNavigator();
import {createDrawerNavigator} from '@react-navigation/drawer';
import SearchBar from 'react-native-dynamic-search-bar';
import {StyleSheet} from 'react-native';
import bottomaBar from './bottomBar';
import drawerDaftar from './drawerDaftar';
import daftarYangHadirDanTidak from './daftarYangHadirDanTidak';
export default function drawerNav() {
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen
        name="Beranda"
        component={drawerDaftar}
        options={{headerShown: false}}
      />
      <Drawer.Screen name="Daftar" component={drawerDaftar} />
      <Drawer.Screen name="Absen" component={drawerDaftar} />
      <Drawer.Screen name="Laporan" component={drawerDaftar} />
      <Drawer.Screen name="hadirDanTidak" component={daftarYangHadirDanTidak} />
    </Drawer.Navigator>
  );
}
const styles = StyleSheet.create({
  search: {
    width: 300,
    right: 10,
  },
});
