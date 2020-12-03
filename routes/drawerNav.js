import React from 'react';
const Drawer = createDrawerNavigator();
import {createDrawerNavigator} from '@react-navigation/drawer';
import {StyleSheet} from 'react-native';
import drawerDaftar from './drawerDaftar';
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
    </Drawer.Navigator>
  );
}
const styles = StyleSheet.create({
  search: {
    width: 300,
    right: 10,
  },
});
