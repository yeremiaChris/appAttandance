import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {IconButton, Colors} from 'react-native-paper';
import SearchBar from 'react-native-dynamic-search-bar';
import {log} from 'react-native-reanimated';

export default function search({
  handleMenu,
  handle,
  data,
  set,
  setFilteredDataSource,
  button,
}) {
  // pencarian
  // const [datas, setDatas] = useState(datas);
  // const searchText = (e) => {
  //   let text = e.toLowerCase();
  //   let trucks = data;

  //   let filteredName = trucks.filter((truck) => {
  //     return truck.nama.toLowerCase().match(text);
  //   });
  //   // if no match and text is empty
  //   if (!text || text === '') {
  //     set(trucks);
  //   } else if (!Array.isArray(filteredName) && !filteredName.length) {
  //     set([]);
  //   } else if (Array.isArray(filteredName)) {
  //     set(filteredName);
  //     return trucks;
  //   }
  // };

  const [search, setSearch] = useState('');

  const searchFilterFunction = (text) => {
    // Check if searched text is not blank
    if (text) {
      // Inserted text is not blank
      // Filter the masterDataSource
      // Update FilteredDataSource
      const newData = data.filter((item) => {
        const itemData = item.nama ? item.nama.toUpperCase() : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      setFilteredDataSource(data);
      setSearch(text);
    }
  };

  return (
    <View style={styles.header}>
      <IconButton
        disabled={button}
        style={styles.icon}
        icon="arrow-left"
        size={25}
        onPress={handle}
      />
      <SearchBar
        disabled={button}
        style={styles.search}
        placeholder="Cari Siswa..."
        value={search}
        onChangeText={(text) => {
          searchFilterFunction(text);
        }}
        onPress={() => console.log('search')}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  search: {
    right: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 5,
    paddingLeft: 5,
  },
  icon: {
    position: 'relative',
    right: 18,
  },
});
