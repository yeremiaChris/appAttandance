import RNPickerSelect from 'react-native-picker-select';
import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';

export default function SelectPicker({
  title,
  items,
  setNilai,
  nilai,
  changeTitle,
  handlePilih,
  handlePilihPagi,
  valueLabel,
}) {
  return (
    <View style={styles.select}>
      <RNPickerSelect
        style={styles}
        placeholder={{label: `${title}...`, value: null}}
        onValueChange={(value) => {
          setNilai({tangkapValue: value});
          switch (value) {
            case null:

            case 'Doa Pagi':
              changeTitle(value);
              handlePilihPagi();
              break;
            case 'Ibadah Minggu':
              changeTitle(value);
              handlePilih();
              break;
          }
        }}
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
