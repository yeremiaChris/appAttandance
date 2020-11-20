import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import list from '../components/list';
const Stack = createStackNavigator();
import Header from '../shared/Header';
import SearchBar from 'react-native-dynamic-search-bar';
import {StyleSheet} from 'react-native';

export default function homeStack(props) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Daftar"
        component={list}
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