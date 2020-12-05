import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Button, Snackbar, IconButton, Colors} from 'react-native-paper';

function snackBar({onDismissSnackBar, visible, setVisible2}) {
  return (
    <View style={styles.container}>
      <Snackbar
        visible={visible}
        onDismiss={onDismissSnackBar}
        action={{
          label: 'Tutup',
          onPress: () => {
            setVisible2(false);
          },
        }}>
        Berhasil Menambahkan Siswa
      </Snackbar>
    </View>
  );
}

export default React.memo(snackBar);
const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    position: 'relative',
  },
});
