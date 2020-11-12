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
// stackNavigator
import HomeStack from './routes/homeStack';
import homeStack from './routes/homeStack';
import SearchBar from 'react-native-dynamic-search-bar';
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
          <Drawer.Navigator initialRouteName="Home">
            <Drawer.Screen
              name="Home"
              component={homeStack}
              options={{headerShown: false}}
            />
            <Drawer.Screen
              name="List"
              component={List}
              options={{
                headerTitle: () => (
                  <SearchBar
                    style={styles.search}
                    placeholder="Search here"
                    onChangeText={(text) => {
                      console.log(text);
                    }}
                    onPress={() => alert('onPress')}
                  />
                ),
              }}
            />
          </Drawer.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </>
  );
};
export default App;
