import React from 'react';
const Drawer = createDrawerNavigator();
import {createDrawerNavigator} from '@react-navigation/drawer';
import SearchBar from 'react-native-dynamic-search-bar';
import {StyleSheet} from 'react-native';
import bottomaBar from './bottomBar';
import absenStack from './absenStack';
import laporanStack from './laporanStack';
import bottomDaftar from './bottomDaftar';
import bottomAbsen from './bottomAbsen';
import bottomLaporan from './bottomLaporan';
export default function drawerNav() {
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen
        name="Beranda"
        component={bottomaBar}
        options={{headerShown: false}}
      />
      <Drawer.Screen name="Daftar" component={bottomDaftar} />
      <Drawer.Screen name="Absen" component={bottomAbsen} />
      <Drawer.Screen name="Laporan" component={bottomLaporan} />
    </Drawer.Navigator>
  );
}
const styles = StyleSheet.create({
  search: {
    width: 300,
    right: 10,
  },
});
