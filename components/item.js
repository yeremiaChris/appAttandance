import React from 'react';
import {Card, Title, Paragraph} from 'react-native-paper';
import {StyleSheet, View, TouchableOpacity, Image, Text} from 'react-native';

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
});
const Cards = () => (
  <View style={styles.cardWrapper}>
    <TouchableOpacity>
      <Card style={styles.cardContent}>
        <View style={styles.groub}>
          <Image source={require('../assets/list.png')} />
          <Text>LIST</Text>
        </View>
      </Card>
    </TouchableOpacity>
    <TouchableOpacity>
      <Card style={styles.cardContent}>
        <View style={styles.groub}>
          <Image source={require('../assets/absen.png')} />
          <Text>TAKE</Text>
        </View>
      </Card>
    </TouchableOpacity>
    <TouchableOpacity>
      <Card style={styles.cardContent}>
        <View style={styles.groub}>
          <Image source={require('../assets/report.png')} />
          <Text>REPORT</Text>
        </View>
      </Card>
    </TouchableOpacity>
  </View>
);
export default Cards;
