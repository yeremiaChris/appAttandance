import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import homeStack from './homeStack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import List from '../components/list';
const Tab = createBottomTabNavigator();
export default function bottomBar() {
  return (
    <Tab.Navigator
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
    </Tab.Navigator>
  );
}
