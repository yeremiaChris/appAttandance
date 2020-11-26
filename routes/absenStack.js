import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Absen from '../components/absen';
import Laporan from '../components/laporan';
const Stack = createStackNavigator();
import Header from '../shared/Header';
import SearchBar from 'react-native-dynamic-search-bar';
import {StyleSheet, View} from 'react-native';
import {IconButton, Colors} from 'react-native-paper';

export default function homeStack({navigation}) {
  const handleMenu = () => {
    navigation.openDrawer();
  };
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Absen"
        component={Absen}
        options={{
          headerTitle: () => (
            <>
              <View style={styles.header}>
                <IconButton
                  style={styles.icon}
                  icon="menu"
                  size={25}
                  onPress={handleMenu}
                />
                <SearchBar
                  style={styles.search}
                  placeholder="Cari Siswa..."
                  onChangeText={(text) => {
                    console.log(text);
                  }}
                  onPress={() => alert('onPress')}
                />
              </View>
            </>
          ),
        }}
      />
      <Stack.Screen
        name="Laporan"
        component={Laporan}
        options={{
          headerTitle: () => (
            <>
              <View style={styles.header}>
                <IconButton
                  style={styles.icon}
                  icon="menu"
                  size={25}
                  onPress={handleMenu}
                />
                <SearchBar
                  style={styles.search}
                  placeholder="Cari Siswa..."
                  onChangeText={(text) => {
                    console.log(text);
                  }}
                  onPress={() => alert('onPress')}
                />
              </View>
            </>
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
  header: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    position: 'relative',
    right: 18,
  },
});
