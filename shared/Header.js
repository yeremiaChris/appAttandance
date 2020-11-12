import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Button} from 'react-native-paper';
import {IconButton, Colors} from 'react-native-paper';
export default function Header({navigation, title}) {
  // menuHandle
  const handleMenu = () => {
    navigation.openDrawer();
  };
  return (
    <View style={styles.header}>
      <IconButton
        style={styles.icon}
        icon="menu"
        size={25}
        onPress={handleMenu}
      />
      <View>
        <Text style={styles.headerText}>{title}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 20,
    color: '#333',
    letterSpacing: 1,
  },
  icon: {
    position: 'relative',
    right: 18,
  },
});
