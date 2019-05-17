import React, { Component } from 'react';
import TimerCountdown from "react-native-timer-countdown";
import { View, Vibration, Dimensions } from 'react-native'
import { Actions } from '../actions';

const { width, height } = Dimensions.get("window");

class IntervalScreen extends Component {

    onExpire = () => {
        Actions.play({type:'reset'})
        Vibration.vibrate(1000);
    }

  render() {
    return (
      <View style = {{flex:1, alignContent:'center', justifyContent: 'center', alignSelf:'center'}}>
          <TimerCountdown
              initialMilliseconds = {3000}
              onExpire = {this.onExpire}
              style = {{fontWeight: 'bold', fontSize: width * 0.2,color: 'rgb(0, 122 , 255)'}}
              formatMilliseconds={(milliseconds) => {
                const remainingSec = Math.round(milliseconds / 1000);
                const seconds = parseInt((remainingSec % 60).toString(), 10);
                const s = seconds < 10 ? '0' + seconds : seconds;
                return  s[1];
                }}
                
          />
      </View>
    );
  }
}

export default IntervalScreen;