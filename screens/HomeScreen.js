import React, { Component } from 'react';
import { View, Text, Dimensions } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Button, Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { appClosed } from '../actions';

const SCREEN_WIDTH = Dimensions.get('window').width;

class HomeScreen extends Component {
    componentDidMount = () => {
      this.props.appClosed();
    };
    
    render() {
        const { gameTitle, secondaryTitle, buttonStyle, titleContainer, container } = styles;
        return (
            <View style={container}>
                <View style={titleContainer}>
                    <Text style={gameTitle}>WHAT DO YOU </Text>
                    <Text style={[gameTitle, secondaryTitle]}>"MIME"</Text>
                </View>
                <View style={buttonStyle}>
                    {/* <View>
                        <Button
                            title='Add Words'
                            titleStyle={{ fontWeight: 'bold' }}
                            onPress={()=> {Actions.addWords()}}
                        />
                    </View> */}

                    <View>
                        <Button
                            title='PLAY'
                            titleStyle={{ fontWeight: 'bold' }}
                            onPress={() => Actions.settings()}
                            icon = {{name: 'play-arrow', color:'white'}}
                            iconRight
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
        justifyContent: 'center'
    },
    gameTitle: {
        fontSize: SCREEN_WIDTH * 0.05,
        textAlign: 'center'
    },
    secondaryTitle: {
        fontSize: SCREEN_WIDTH * 0.175,
        fontWeight: 'bold',
        color: 'rgb(0, 122 , 255)'
    },
    buttonStyle: {
        flex: 1,
        justifyContent: 'space-evenly',
        flexDirection: 'row'
    }
};

export default connect(null,{ appClosed })(HomeScreen);
