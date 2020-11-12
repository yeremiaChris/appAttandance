import RNPickerSelect from 'react-native-picker-select';
import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';

export default function SelectPicker() {
  // label pada selectnya
  const label = [
    {label: 'Angkatan 2019', value: '2019'},
    {label: 'Angkatan 2018', value: '2018'},
    {label: 'Angkatan 2017', value: '2017'},
  ];
  const [items, setItems] = useState(label);
  const [nilai, setNilai] = useState({
    tangkapValue: null,
  });
  return (
    <View style={styles.select}>
      <RNPickerSelect
        style={styles}
        placeholder={{label: 'Pilih Angkatan...', value: null}}
        onValueChange={(value) => setNilai({tangkapValue: value})}
        items={items}
        value={nilai.tangkapValue}
        style={pickerSelectStyles}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  select: {
    backgroundColor: 'white',
    elevation: 1,
    marginBottom: 10,
  },
});
const pickerSelectStyles = StyleSheet.create({
  inputAndroid: {
    fontSize: 16,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});
