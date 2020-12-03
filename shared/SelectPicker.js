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
  setSiswa,
  setProgress,
  data,
  button,
}) {
  return (
    <View style={styles.select}>
      <RNPickerSelect
        disabled={button}
        style={styles}
        placeholder={{label: `${title}...`, value: null}}
        onValueChange={(value) => {
          setNilai({tangkapValue: value});
          data(setSiswa, setProgress, value);
          switch (value) {
            case true:
              changeTitle('Doa Pagi');
              break;
            case false:
              changeTitle('Ibadah Minggu');
              break;
            case null:
              changeTitle('Doa Pagi');
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
