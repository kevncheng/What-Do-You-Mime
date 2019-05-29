import React, { Component } from "react";
import { View, Text, Dimensions } from "react-native";
import { Button } from "react-native-elements";
import { connect } from "react-redux";
import { Actions } from "react-native-router-flux";
import { newGame } from "../actions";

const { width, height } = Dimensions.get("window");

class WinScreen extends Component {
  winner = () => {
    const { TeamOnePoints, TeamTwoPoints } = this.props;
    if (TeamOnePoints > TeamTwoPoints) {
      return "Team One Wins!";
    } else if (TeamOnePoints < TeamTwoPoints) {
      return "Team Two Wins!";
    }
    return "Tie Game";
  };

  endOfGame = () => {
    this.props.newGame();
    Actions.home({ type: "reset" });
  };

  render() {
    const {TeamOnePoints,TeamTwoPoints} = this.props;
    const { parentContainer, winnerContainer,importantText,pointContainer, buttonPosition,buttonStyle } = styles;
    return (
      <View style={parentContainer}>
        <View style={winnerContainer}>
          <Text style={importantText}>{this.winner()}</Text>
        </View>
        <View style={pointContainer}>
          <View style = {{flex:1}}>
            <Text style={[importantText,{fontSize:width * 0.05}]}>Team One: </Text>
            <Text style={importantText}>{TeamOnePoints} </Text>
          </View>
          <View style = {{flex:1}}>
            <Text style={[importantText,{fontSize:width * 0.05}]}>Team Two:  </Text>
            <Text style={importantText}>{TeamTwoPoints} </Text>
          </View>
          </View>
          <View style = {buttonPosition}>
            <Button
              title = 'Play Again'
              titleStyle = {{fontWeight:'bold'}}
              onPress={this.endOfGame}
              buttonStyle = {buttonStyle}
              icon = {{name:'replay', color: 'white'}}
              iconRight
            />
          </View>
        
      </View>
    );
  }
}

const styles = {
  parentContainer: {
    flex: 1,
    alignContent: "center",
    justifyContent: 'center',
  },
  pointContainer: {
    justifyContent: "space-around", flexDirection: "row", flex: 1
  },
  importantText: {
    textAlign:'center',fontSize:width * 0.08, fontWeight: 'bold',
  },
  buttonPosition: {
    position: 'absolute',
    bottom: 20,
    right: 0,
    left: 0
  },
  buttonStyle: {
    width: '33%', alignSelf:'center'
  },
  winnerContainer: {
    flex: 0.5 ,justifyContent:'flex-start'
  }
};

const mapStateToProps = state => {
  const { TeamOnePoints, TeamTwoPoints } = state.setting;
  return { TeamOnePoints, TeamTwoPoints };
};

export default connect(
  mapStateToProps,
  { newGame }
)(WinScreen);
