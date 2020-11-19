import React from 'react';
const Drawer = createDrawerNavigator();
import {createDrawerNavigator} from '@react-navigation/drawer';
import List from '../components/list';
import Absen from '../components/absen';
import Laporan from '../components/laporan';
import SearchBar from 'react-native-dynamic-search-bar';
import {StyleSheet} from 'react-native';
import bottomaBar from './bottomBar';
export default function drawerNav() {
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen
        name="Beranda"
        component={bottomaBar}
        options={{headerShown: false}}
      />
      <Drawer.Screen
        name="Daftar"
        component={List}
        options={{
          headerTitle: () => (
            <SearchBar
              style={styles.search}
              placeholder="Cari Siswa..."
              onChangeText={(text) => {
                console.log(text);
              }}
              onPress={() => alert('onPress')}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Absen"
        component={Absen}
        options={{
          headerTitle: () => (
            <SearchBar
              style={styles.search}
              placeholder="Cari Siswa..."
              onChangeText={(text) => {
                console.log(text);
              }}
              onPress={() => alert('onPress')}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Laporan"
        component={Laporan}
        options={{
          headerTitle: () => (
            <SearchBar
              style={styles.search}
              placeholder="Cari Siswa..."
              onChangeText={(text) => {
                console.log(text);
              }}
              onPress={() => alert('onPress')}
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}
const styles = StyleSheet.create({
  search: {
    width: 300,
    right: 10,
  },
});
