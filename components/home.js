import React, {useState} from 'react';
import Card from './item';
import {BottomNavigation, Text} from 'react-native-paper';
import Item from './item';
export default function home(props) {
  return (
    <>
      <Card props={props} />
    </>
  );
}
