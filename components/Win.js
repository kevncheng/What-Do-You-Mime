import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { newGame } from '../actions'

class Win extends Component {

    winner = () =>{
        const {TeamOnePoints,TeamTwoPoints} = this.props;
        if(TeamOnePoints > TeamTwoPoints){
            return 'Team One Wins!'
        } else if (TeamOnePoints < TeamTwoPoints){
            return 'Team Two Wins!'
        } return 'Tie Game' 
        
    }

    endOfGame = () => {
        this.props.newGame()
        Actions.play({type:'reset'})
    }

  render() {
    return (
      <View>
        <Text>{this.winner()}</Text>
          <Button title='Play again' onPress={this.endOfGame}/>
      </View>
    );
  }
}

const mapStateToProps = state => {
    const {TeamOnePoints,TeamTwoPoints} = state.setting
    return { TeamOnePoints, TeamTwoPoints }
}

export default connect(mapStateToProps,{newGame})(Win);