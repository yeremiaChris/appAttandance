import React from 'react';
const Drawer = createDrawerNavigator();
import {createDrawerNavigator} from '@react-navigation/drawer';
import {StyleSheet} from 'react-native';
import DrawerDaftar from './drawerDaftar';

function drawerNav({user}) {
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="Home" options={{headerShown: false}}>
        {(props) => <DrawerDaftar {...props} user={user} />}
      </Drawer.Screen>
    </Drawer.Navigator>
  );
}
export default drawerNav;
const styles = StyleSheet.create({
  search: {
    width: 300,
    right: 10,
  },
});
