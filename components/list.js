import React from 'react';
import {Card, Title, Paragraph} from 'react-native-paper';
import {StyleSheet, View, Image, Text} from 'react-native';
import {Avatar} from 'react-native-paper';
import SelectPicker from '../shared/SelectPicker';
export default function list() {
  return (
    <View style={styles.cardWrapper}>
      <SelectPicker />
      <Card style={styles.container}>
        <Card.Content style={styles.card}>
          <View>
            <Title>Yeremia Chris Saragi</Title>
            <Paragraph>Sistem Informasi 2018</Paragraph>
          </View>
          <Avatar.Image size={50} source={require('../assets/list.png')} />
        </Card.Content>
      </Card>
    </View>
  );
}
const styles = StyleSheet.create({
  cardWrapper: {
    padding: 10,
    flex: 1,
  },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  container: {
    marginBottom: 10,
  },
});
