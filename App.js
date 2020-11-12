/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React from 'react';

// drawer
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {Provider as PaperProvider} from 'react-native-paper';
const Drawer = createDrawerNavigator();

// components
import Home from './components/home';
import List from './components/list';

const App: () => React$Node = () => {
  return (
    <>
      <PaperProvider>
        <NavigationContainer>
          <Drawer.Navigator initialRouteName="Home">
            <Drawer.Screen name="Home" component={Home} />
            <Drawer.Screen name="List" component={List} />
          </Drawer.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </>
  );
};
export default App;
