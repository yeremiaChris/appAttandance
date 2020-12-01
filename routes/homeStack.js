import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Home from '../components/home';
import Laporan from '../components/laporan';
import List from '../components/list';
import Absen from '../components/absen';
const Stack = createStackNavigator();
import Header from '../shared/Header';
import SearchBar from 'react-native-dynamic-search-bar';
import {StyleSheet} from 'react-native';

export default function homeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={({navigation}) => {
          return {
            headerTitle: () => (
              <Header navigation={navigation} title="Beranda" />
            ),
          };
        }}
      />
      <Stack.Screen
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
              onPress={() => console.log('search')}
            />
          ),
        }}
      />
      <Stack.Screen
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
              onPress={() => console.log('search')}
            />
          ),
        }}
      />
      <Stack.Screen
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
    </Stack.Navigator>
  );
}
const styles = StyleSheet.create({
  search: {
    width: 300,
    right: 10,
  },
});
