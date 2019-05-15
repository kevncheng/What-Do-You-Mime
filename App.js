import React from 'react';
import { StyleSheet, StatusBar, ActivityIndicator, View } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import Router from './router/Router';
import {ScreenOrientation} from 'expo';
import configureStore from './store'

const { persistor, store } = configureStore();

export default class App extends React.Component {
   changeScreenOrientation() {
    ScreenOrientation.allowAsync(ScreenOrientation.Orientation.LANDSCAPE);
  }

  componentDidMount() {
    this.changeScreenOrientation()
  }
  
  renderLoading = () => {
    <View style = {styles.container}>
      <ActivityIndicator size = 'large'/>
    </View>
  }

  render() {
    
    return (
      <Provider store={store}>
      <PersistGate persistor = {persistor} loading = {this.renderLoading()}>
      <StatusBar hidden/>
        <Router/>
        </PersistGate>
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
