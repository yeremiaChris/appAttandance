import React from 'react';
const Drawer = createDrawerNavigator();
import {createDrawerNavigator} from '@react-navigation/drawer';
import SearchBar from 'react-native-dynamic-search-bar';
import {StyleSheet} from 'react-native';
import bottomBar from './bottomBar';
import absenStack from './absenStack';
import laporanStack from './laporanStack';
import daftarStack from './daftarStack';
import homeStack from './homeStack';
export default function drawerDaftar({route}) {
  return (
    <Drawer.Navigator initialRouteName={route.name}>
      <Drawer.Screen
        name="Beranda"
        component={bottomBar}
        options={{headerShown: false}}
      />
      <Drawer.Screen name="Daftar" component={bottomBar} />
      <Drawer.Screen name="Absen" component={bottomBar} />
      <Drawer.Screen name="Laporan" component={bottomBar} />
    </Drawer.Navigator>
  );
}
const styles = StyleSheet.create({
  search: {
    width: 300,
    right: 10,
  },
});
