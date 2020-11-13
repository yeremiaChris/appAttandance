import React from 'react';
import {Card, Title, Paragraph} from 'react-native-paper';
import {StyleSheet, View, TouchableOpacity, Image, Text} from 'react-native';
import {BottomNavigation} from 'react-native-paper';

const styles = StyleSheet.create({
  cardWrapper: {
    marginTop: 10,
    justifyContent: 'space-around',
    flexDirection: 'row',
    marginBottom: 10,
  },
  cardContent: {
    height: 100,
    width: 100,
    alignItems: 'center',
    padding: 10,
    elevation: 5,
  },
  groub: {
    alignItems: 'center',
  },
  container: {
    flex: 1,
  },
});

export default function item({props}) {
  // handleTouch
  const handleTouch = () => {
    props.navigation.navigate('Daftar');
  };
  return (
    <>
      <View style={styles.cardWrapper}>
        <TouchableOpacity onPress={handleTouch}>
          <Card style={styles.cardContent}>
            <View style={styles.groub}>
              <Image source={require('../assets/list.png')} />
              <Text>DAFTAR</Text>
            </View>
          </Card>
        </TouchableOpacity>
        <TouchableOpacity>
          <Card style={styles.cardContent}>
            <View style={styles.groub}>
              <Image source={require('../assets/absen.png')} />
              <Text>ABSEN</Text>
            </View>
          </Card>
        </TouchableOpacity>
        <TouchableOpacity>
          <Card style={styles.cardContent}>
            <View style={styles.groub}>
              <Image source={require('../assets/report.png')} />
              <Text>LAPORAN</Text>
            </View>
          </Card>
        </TouchableOpacity>
      </View>
    </>
  );
}
