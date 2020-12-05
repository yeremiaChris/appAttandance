import React, {useState, useEffect} from 'react';
import {
  Card,
  Title,
  Paragraph,
  Portal,
  Button,
  Modal,
  Avatar,
  IconButton,
  Colors,
} from 'react-native-paper';
import {
  StyleSheet,
  View,
  FlatList,
  Text,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
function HadirDanTidak({kehadiran, jumlah, button}) {
  // modalDetail
  const [visible, setVisible] = useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = {backgroundColor: 'white', padding: 20};
  return (
    <View style={styles.cardWrapper}>
      <View style={styles.containerdua}>
        {jumlah == 0 ? (
          <Text>Data Tidak Ada</Text>
        ) : (
          <FlatList
            data={kehadiran}
            keyExtractor={(item) => Math.random().toString()}
            renderItem={({item}) => (
              <TouchableOpacity disabled={button}>
                <View style={styles.viewForCard}>
                  <Card style={styles.container}>
                    <Card.Content style={styles.card}>
                      <TouchableOpacity disabled={button}>
                        <View>
                          <Title>{item.nama}</Title>
                          <Paragraph>
                            {item.jurusan} {item.angkatan}
                          </Paragraph>
                        </View>
                      </TouchableOpacity>
                      <Avatar.Image
                        size={50}
                        source={require('../assets/list.png')}
                      />
                    </Card.Content>
                  </Card>
                </View>
              </TouchableOpacity>
            )}
          />
        )}
      </View>
    </View>
  );
}
export default React.memo(HadirDanTidak);

const styles = StyleSheet.create({
  modal: {
    flexDirection: 'column',
  },
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
  viewForCard: {
    flex: 1,
  },
  containerdua: {
    flex: 1,
  },
  search: {
    backgroundColor: 'white',
  },
  containerSearch: {
    backgroundColor: 'white',
    borderTopWidth: 0,
    borderBottomWidth: 0,
    marginBottom: 10,
    elevation: 1,
  },
  modal: {
    height: 300,
    width: 300,
  },
  check: {
    display: 'none',
  },
  viewDelete: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  picker: {
    marginBottom: 10,
  },
});
