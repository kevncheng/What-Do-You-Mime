import React, { Component } from "react";
import { View, Text, Dimensions } from "react-native";
import { connect } from "react-redux";
import { Button } from "react-native-elements";
import { Actions } from "react-native-router-flux";
import { settingUpdate } from "../actions";

const SCREEN_WIDTH = Dimensions.get("window").width;

class EndTurnScreen extends Component {
  componentDidMount = () => {
    let value = parseInt(this.props.gameRound) + 1;
    this.props.settingUpdate({ prop: "gameRound", value });
  };
  
  whosTurn = () => {
    const {gameRound} = this.props;
    if((gameRound % 2) === 0) {
      return `Team One's Turn`
    } return `Team Two's Turn`
  }

  render() {
    const { TeamOnePoints, TeamTwoPoints, gameRound } = this.props;
    const { parentContainer,importantText,pointContainer, buttonPosition,buttonStyle,roundContainer } = styles;
    return (
      <View style={parentContainer}>
        <View style={roundContainer}>
          <Text style={importantText}>ROUND:{Math.floor(gameRound / 2)}</Text>
        </View>
        <View style={pointContainer}>
          <View style = {{flex:1}}>
            <Text style={[importantText,{fontSize:SCREEN_WIDTH * 0.05}]}>Team One: </Text>
            <Text style={importantText}>{TeamOnePoints} </Text>
          </View>
          <View style = {{flex:1}}>
            <Text style={[importantText,{fontSize:SCREEN_WIDTH * 0.05}]}>Team Two:  </Text>
            <Text style={importantText}>{TeamTwoPoints} </Text>
          </View>
          </View>
          <View style = {buttonPosition}>
            <Button
              title = {this.whosTurn()}
              titleStyle = {{fontWeight:'bold'}}
              onPress={()=>Actions.play({type:'reset'})}
              buttonStyle = {buttonStyle}
              icon = {{name:'arrow-forward', color: 'white'}}
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
    textAlign:'center',fontSize:SCREEN_WIDTH * 0.08, fontWeight: 'bold',
  },
  buttonPosition: {
    position: 'absolute',
    bottom: 20,
    right: 0,
    left: 0
  },
  roundContainer: {
     flex: 0.5 ,justifyContent:'flex-start'
  },
  buttonStyle: {
    width: '33%', alignSelf:'center'
  }
};

const mapStateToProps = state => {
  const {
    passes,
    rounds,
    turn,
    gameRound,
    TeamOnePoints,
    TeamTwoPoints
  } = state.setting;
  return { passes, rounds, turn, gameRound, TeamOnePoints, TeamTwoPoints };
};

export default connect(
  mapStateToProps,
  { settingUpdate }
)(EndTurnScreen);
