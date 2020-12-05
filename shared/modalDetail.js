import React from 'react';
import {
  Card,
  Title,
  Paragraph,
  Modal,
  Portal,
  Text,
  Button,
  Provider,
  IconButton,
  Colors,
} from 'react-native-paper';
import {StyleSheet, View} from 'react-native';
import Update from '../components/update';
function modalDelete({
  visible,
  hideModal,
  containerStyle,
  detail,
  setVisible,
  button,
}) {
  // console.log(detail);
  return (
    <Portal>
      <Modal visible={visible} onDismiss={hideModal}>
        <Card>
          <Card.Content style={styles.container}>
            <View>
              <Title>{detail.nama}</Title>
              <Paragraph>{detail.jurusan}</Paragraph>
              <Paragraph>{detail.angkatan}</Paragraph>
            </View>
            <View>
              <Update
                button={button}
                nama={detail.nama}
                ang={detail.angkatan}
                jur={detail.jurusan}
                kunci={detail.key}
                setVisible={setVisible}
              />
            </View>
          </Card.Content>
        </Card>
      </Modal>
    </Portal>
  );
}
export default React.memo(modalDelete);
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
