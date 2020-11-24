import React, {useState} from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button';
import RadioGroup from 'react-native-radio-button-group';
const value = [
  {id: 0, label: 'Button1'},
  {id: 1, label: 'Button2'},
  {id: 2, label: 'Button3'},
  {id: 3, label: 'Button4'},
];
export default function radio() {
  const [brg, setBrg] = useState(value);
  const [value, setValue] = useState('');
  const arrayOfChoices = ['First option', 'Second option', 'Third option'];
  return <RadioGroup options={brg} />;
}
const styles = StyleSheet.create({
  container: {
    marginBottom: 35,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  radioText: {
    marginRight: 35,
    fontSize: 20,
    color: '#000',
    fontWeight: '700',
  },
  radioCircle: {
    height: 30,
    width: 30,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: '#3740ff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedRb: {
    width: 15,
    height: 15,
    borderRadius: 50,
    backgroundColor: '#3740ff',
  },
  result: {
    marginTop: 20,
    color: 'white',
    fontWeight: '600',
    backgroundColor: '#F3FBFE',
  },
});
