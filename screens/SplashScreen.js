import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { LinearGradient } from 'expo';

class SplashScreen extends Component {

  render() {
    return (
      <View style = {{flex:1}}>
        <View style={{ backgroundColor: 'orange', flex: 1 }} />
        <LinearGradient
          colors={['rgba(0,0,0,0.8)', 'transparent']}
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            height: 300,
          }}
        />
      </View>
    );
  }
}

export default SplashScreen;