import RNPickerSelect from 'react-native-picker-select';
import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';

function SelectPicker({
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
  setListLaporan,
  setFilteredDataSource,
  setButton,
  laporan,
  button,
  urutLaporan,
}) {
  return (
    <View style={styles.select}>
      <RNPickerSelect
        disabled={button}
        style={styles}
        placeholder={{label: `${title}...`, value: 'laporanDoaPagi'}}
        onValueChange={(value) => {
          setNilai({tangkapValue: value});
          console.log(value);
          urutLaporan(
            setListLaporan,
            setFilteredDataSource,
            setProgress,
            value,
          );
          switch (value) {
            case 'laporanDoaPagi':
              changeTitle('Doa Pagi');
              break;
            case 'laporanIbadahMinggu':
              changeTitle('Ibadah Minggu');
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

export default React.memo(SelectPicker);

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
