import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import homeStack from './homeStack';
import absenStack from './absenStack';
import daftarStack from './daftarStack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import List from '../components/list';
import laporanStack from './laporanStack';
const Tab = createBottomTabNavigator();
export default function bottomBar({route}) {
  return (
    <Tab.Navigator
      initialRouteName={route.name}
      tabBarOptions={{
        activeTintColor: 'purple',
        inactiveTintColor: 'grey',
      }}>
      <Tab.Screen
        name="Beranda"
        component={homeStack}
        options={{
          tabBarIcon: () => <Ionicons name="ios-home-outline" size={25} />,
        }}
      />
      <Tab.Screen
        name="Daftar"
        component={daftarStack}
        options={{
          tabBarIcon: () => <Ionicons name="ios-people-outline" size={25} />,
        }}
      />
      <Tab.Screen
        name="Absen"
        component={absenStack}
        options={{
          tabBarIcon: () => <Ionicons name="ios-open-outline" size={25} />,
        }}
      />
      <Tab.Screen
        name="Laporan"
        component={laporanStack}
        options={{
          tabBarIcon: () => (
            <Ionicons name="ios-folder-open-outline" size={25} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
