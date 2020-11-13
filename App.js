/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React from 'react';

// navigation
import {NavigationContainer} from '@react-navigation/native';
import {Provider as PaperProvider} from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
// stackNavigator
import DrawerNav from './routes/drawerNav';
import {StyleSheet} from 'react-native';

const App: () => React$Node = () => {
  const styles = StyleSheet.create({
    search: {
      width: 300,
      right: 10,
    },
  });
  return (
    <>
      <PaperProvider>
        <NavigationContainer>
          <DrawerNav />
        </NavigationContainer>
      </PaperProvider>
    </>
  );
};
export default App;
