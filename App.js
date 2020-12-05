/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React, {useEffect, useState} from 'react';

// navigation
import {NavigationContainer} from '@react-navigation/native';
import {Provider as PaperProvider} from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
// stackNavigator
import DrawerNav from './routes/drawerNav';
import {StyleSheet, View, Text} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {AuthProvider} from './authentication/authProvider';
const App: () => React$Node = () => {
  const styles = StyleSheet.create({
    search: {
      width: 300,
      right: 10,
    },
  });

  // // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;
  return (
    <>
      <AuthProvider>
        <PaperProvider>
          <NavigationContainer>
            <DrawerNav user={user} />
          </NavigationContainer>
        </PaperProvider>
      </AuthProvider>
    </>
  );
};
export default App;
