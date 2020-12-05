import React, {createContext, useState} from 'react';
import auth from '@react-native-firebase/auth';
import {log} from 'react-native-reanimated';
import {Alert} from 'react-native';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login: async (email, password) => {
          try {
            await auth()
              .signInWithEmailAndPassword(email, password)
              .then((res) => {
                console.log(res);
              })
              .catch((err) => {
                console.log(err);
                switch (err.code) {
                  case 'auth/wrong-password':
                    Alert.alert('Password Salah Cuy');
                    break;
                  case 'auth/user-not-found':
                    Alert.alert('Akun belum terdaftar');
                  default:
                    break;
                }
                // if (err.code == 'auth/wrong-password') {
                //   Alert.alert('Password Salah Cuy');
                // } else if
              });
          } catch (error) {
            console.log('error');
          }
        },
        register: async (email, confirmPassword) => {
          try {
            await auth()
              .createUserWithEmailAndPassword(email, confirmPassword)
              .then((res) => {
                console.log(res);
              })
              .catch((err) => {
                console.log(err);
                switch (err.code) {
                  case 'auth/email-already-in-use':
                    Alert.alert('Email Sudah Di Pakai.');
                    break;
                  default:
                    break;
                }
              });
          } catch (error) {
            console.log(error);
          }
        },
        logout: async () => {
          try {
            await auth().signOut();
          } catch (error) {
            console.log(error);
          }
        },
      }}>
      {children}
    </AuthContext.Provider>
  );
};
