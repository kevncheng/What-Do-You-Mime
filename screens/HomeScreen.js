import React, { Component } from "react";
import { View, Text, Dimensions } from "react-native";
import { Actions } from "react-native-router-flux";
import { Button, Icon } from "react-native-elements";

const SCREEN_WIDTH = Dimensions.get("window").width;

class HomeScreen extends Component {
  render() {
    const { gameTitle, buttonStyle, titleContainer, container } = styles;
    return (
      <View style={container}>
        <View style={titleContainer}>
          <Text style={[gameTitle]}>WHAT DO YOU </Text>
          <Text style={[gameTitle,{fontSize: SCREEN_WIDTH * 0.175, fontWeight: "bold",color: 'rgb(0, 122 , 255)'}]}>"MIME"</Text>
        </View>
        <View style = {buttonStyle}>
        <View >
          <Button
            title="Add Words"
            titleStyle ={{fontWeight:'bold'}}
            onPress={Actions.addWords()}
          />
          </View>
          
        <View >
          <Button 
            title="START!"
            titleStyle ={{fontWeight:'bold'}}
            onPress={() => Actions.settings()} 
            />
        </View>
        </View>
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
    margin: 'auto'
  },
  titleContainer: {
    flex: 3,
    justifyContent: 'center',
  },
  gameTitle: {
    fontSize: SCREEN_WIDTH * 0.05,
    textAlign: 'center',
    
  },
  buttonStyle: {
      flex: 1,
      justifyContent:'space-evenly',
      flexDirection: 'row',
  }
};

export default HomeScreen;
