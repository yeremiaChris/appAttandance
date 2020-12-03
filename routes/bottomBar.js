import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import homeStack from './homeStack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import list from '../components/list';
import home from '../components/home';
import absen from '../components/absen';
import laporan from '../components/laporan';
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
        component={list}
        options={{
          tabBarIcon: () => <Ionicons name="ios-people-outline" size={25} />,
        }}
      />
      <Tab.Screen
        name="Absen"
        component={absen}
        options={{
          tabBarIcon: () => <Ionicons name="ios-open-outline" size={25} />,
        }}
      />
      <Tab.Screen
        name="Laporan"
        component={laporan}
        options={{
          tabBarIcon: () => (
            <Ionicons name="ios-folder-open-outline" size={25} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
