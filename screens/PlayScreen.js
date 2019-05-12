import React, { Component } from "react";
import { View, Text, Vibration, Dimensions } from "react-native";
import { connect } from "react-redux";
import _ from "lodash";
import { Button } from "react-native-elements";
import TimerCountdown from "react-native-timer-countdown";
import { pointChange } from "../actions";
import Points from "../components/Points";
import { Actions } from "react-native-router-flux";
import { settingUpdate } from "../actions";

const { width, height } = Dimensions.get("window");

class PlayScreen extends Component {
  endTurn = () => {
    const { firstTurn, gameRound, rounds, settingUpdate } = this.props;
    let value = !firstTurn;
    settingUpdate({ prop: "firstTurn", value });
    Vibration.vibrate(1000);
    console.log(gameRound);
    if (parseInt(gameRound) === rounds * 2) {
      Actions.win({ type: "reset" });
    } else {
      Actions.end({ type: "reset" });
    }
  };

  countDown = (milliseconds) => {
    if(milliseconds < 11) {
      return true
    } return false
  }

  render() {
    const { parentContainer,timerStyle,timerContainer } = styles;
    return (
      <View style = {parentContainer}>

        <Points />
        <View style = {timerContainer}> 
          <TimerCountdown
            initialMilliseconds={1000 * this.props.time}
            onExpire={this.endTurn}
            style={[timerStyle,countDown? styles.countDownStyle : styles.countStyle ]}
            onTick = {this.countDown}
          />
        </View>          
      </View>
    );
  }
}

const styles = {
  parentContainer: {
    flex: 1
  },
  headerStyle: {
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center"
  },
  timerStyle: {
    fontSize: width * 0.09,
    fontWeight: "bold",
  },
  timerContainer: {
    position:'absolute', left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'
  },
  pointStyle: {
    position:'absolute', left: 0, right: 0, bottom: 0, top: 0,justifyContent: 'center', alignItems: 'center'
  },
  countDownStyle : {
    color: 'red'
  },
  countStyle : {
    color: 'black'
  }
};

const mapStateToProps = state => {
  const { time, rounds, firstTurn, passes, gameRound } = state.setting;
  return { time, rounds, firstTurn, passes, gameRound };
};

export default connect(
  mapStateToProps,
  { pointChange, settingUpdate }
)(PlayScreen);
