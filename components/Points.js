import React, { Component } from "react";
import { View, Text, Dimensions, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { Button } from "react-native-elements";
import _ from "lodash";
import { settingUpdate, removeWord, resetWords } from "../actions";

const { width, height } = Dimensions.get("window");

class Points extends Component {
  state = {
    amountPassed: 0,
    playWord: ''
  };
  componentDidMount() {
    this.generateWord();
  }

  generateWord = () => {
    const { CharadeWords, removeWord, resetWords } = this.props;
    let playWord = _.sample(CharadeWords);
    removeWord(playWord);
    if (CharadeWords.length < 5) {
      resetWords();
    }
    return this.setState({ playWord });
  };

  passesAvailable = () => {
    let passesAvailable = this.props.passes - this.state.amountPassed;
    if (passesAvailable > 0) {
      return <Text>{passesAvailable}</Text>;
    } else {
      return <Text>No More Free Passes Available</Text>;
    }
  };

  onPassPressed = () => {
    this.generateWord();
    const { amountPassed } = this.state;
    this.setState({ amountPassed: amountPassed + 1 });
    if (amountPassed >= this.props.passes) {
      const { TeamOnePoints, TeamTwoPoints, firstTurn } = this.props;
      if (firstTurn) {
        let value = parseInt(TeamOnePoints) - 1;
        this.props.settingUpdate({ prop: "TeamOnePoints", value });
      } else {
        let value = parseInt(TeamTwoPoints) - 1;
        this.props.settingUpdate({ prop: "TeamTwoPoints", value });
      }
    }
  };

  onCorrectPressed = () => {
    this.generateWord();
    const { TeamOnePoints, TeamTwoPoints, firstTurn } = this.props;
    if (firstTurn) {
      let value = parseInt(TeamOnePoints) + 1;
      this.props.settingUpdate({ prop: "TeamOnePoints", value });
    } else {
      let value = parseInt(TeamTwoPoints) + 1;
      this.props.settingUpdate({ prop: "TeamTwoPoints", value });
    }
  };

  render() {
    const { TeamOnePoints, TeamTwoPoints } = this.props;
    const { buttonContainer, auxStyle, wordStyle,wordContainer,teamPointsContainer } = styles;
    return (
      <View style = {{flex:1, flexDirection:'column'}}>
        
        <Button
          onPress={this.onCorrectPressed}
          icon = {{name: "keyboard-arrow-left", color:"rgba(0, 0, 0, 0.1)"}}
          iconContainerStyle = {{position:'absolute',left: 0}}
          type="clear"
          title="Correct"
          titleStyle = {{position:'absolute',left: 25,color:'rgba(0, 0, 0, 0.1)'}}
          buttonStyle={[buttonContainer, { left: 0 }]}
        />
        <Button
          onPress={this.onPassPressed}
          icon={{name:"keyboard-arrow-right", color:'rgba(0, 0, 0, 0.1)'}}
          iconContainerStyle = {{position:'absolute',right: 0}}
          iconRight
          type="clear"
          title="Pass"
          titleStyle = {{position:'absolute',right: 25,color:'rgba(0, 0, 0, 0.1)'}}
          buttonStyle={[buttonContainer, { right: 0 }]}
        />
        <View style = {teamPointsContainer}>
            <Text style={auxStyle}>Team One:{TeamOnePoints}</Text>
            <Text style={auxStyle}>Team Two:{TeamTwoPoints}</Text>
        </View>
          <Text style={auxStyle}>Passes Left: {this.passesAvailable()} </Text>
          <View style = {wordContainer}>
            <Text style = {wordStyle}>{this.state.playWord}</Text>
            </View>
      </View>
    );
  }
}

const styles = {
  wordStyle: {
    fontWeight: "bold",
    fontSize: width * 0.15,
    color: 'rgb(0, 122 , 255)',
    textAlign:'center'
  },
  wordContainer: {
    position:'absolute', left: 0, right: 0, bottom: 0, top: 0, justifyContent: 'center', zIndex: -1,
  },
  auxStyle: {
    fontSize: 18,
    fontWeight: "bold"
  },
  buttonContainer: {
    position: "absolute",
    width: width / 2,
    height
  },
  scoreContainer: {
    position: "absolute",
    top: 0,
    right: 0,
    left: 0,
  },
  teamPointsContainer: {
    flexDirection:'row',justifyContent:'space-evenly'
  }
};

const mapStateToProps = state => {
  const {
    time,
    rounds,
    passes,
    TeamOnePoints,
    TeamTwoPoints,
    firstTurn,
    CharadeWords
  } = state.setting;

  return {
    time,
    rounds,
    passes,
    TeamOnePoints,
    TeamTwoPoints,
    firstTurn,
    CharadeWords
  };
};

export default connect(
  mapStateToProps,
  { settingUpdate, removeWord, resetWords }
)(Points);
