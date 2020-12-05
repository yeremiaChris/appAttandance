import React, {useState, useContext} from 'react';
const Drawer = createDrawerNavigator();
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import {Alert} from 'react-native';
import bottomBar from './bottomBar';
import auth from '@react-native-firebase/auth';
import Login from '../authentication/login';
import {AuthContext} from '../authentication/authProvider';

function drawerDaftar({route, navigation, user}) {
  const {logout} = useContext(AuthContext);
  const logoutAccount = () => {
    Alert.alert('Peringatan', 'Yakin ingin keluar ?', [
      {
        text: 'Tidak',
        style: 'cancel',
      },
      {
        text: 'Ya',
        onPress: () => {
          logout();
        },
      },
    ]);
  };
  function CustomDrawerContent(props) {
    return (
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
        <DrawerItem label="Logout" onPress={() => logoutAccount()} />
      </DrawerContentScrollView>
    );
  }

  return (
    <>
      {!user ? (
        <Login navigation={navigation} />
      ) : (
        <Drawer.Navigator
          initialRouteName={route.name}
          drawerContent={(props) => <CustomDrawerContent {...props} />}>
          <Drawer.Screen
            name="Beranda"
            component={bottomBar}
            options={{headerShown: false}}
          />
          <Drawer.Screen name="Daftar" component={bottomBar} />
          <Drawer.Screen name="Absen" component={bottomBar} />
          <Drawer.Screen name="Laporan" component={bottomBar} />
        </Drawer.Navigator>
      )}
    </>
  );
}
export default drawerDaftar;
