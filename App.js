import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import Router from './router/Router'
import store from './store'
import {ScreenOrientation} from 'expo'

export default class App extends React.Component {
   changeScreenOrientation() {
    ScreenOrientation.allowAsync(ScreenOrientation.Orientation.LANDSCAPE);
  }

  componentDidMount() {
    this.changeScreenOrientation()
  }
  
  render() {
    
    return (
      <Provider store={store}>
      <StatusBar hidden/>
        <Router/>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
