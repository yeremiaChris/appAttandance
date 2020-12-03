import React, {useState, useEffect} from 'react';
import Card from './item';
import {BottomNavigation, Text} from 'react-native-paper';
import Item from './item';
import firestore from '@react-native-firebase/firestore';
import ProgressBar from '../shared/progressBar';
export default function home(props) {
  return (
    <>
      <Card props={props} />
    </>
  );
}
