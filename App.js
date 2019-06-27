
import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View , StatusBar} from 'react-native';

import Routes from './src/Routes'
import { Root } from 'native-base'

export default class App extends Component {


  render() {
    return (
      <Root>
        <StatusBar backgroundColor={'#000'}></StatusBar>
        <Routes />
      </Root>
    )
  }
}