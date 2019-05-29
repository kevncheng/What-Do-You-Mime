import React, { Component } from 'react';
import { View, Text, Dimensions, Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Button, Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { appClosed, resetWords } from '../actions';

const SCREEN_WIDTH = Dimensions.get('window').width;

class HomeScreen extends Component {
    componentDidMount = () => {
        this.props.appClosed();
    };

    onPressSettings = () => {
        Alert.alert(
            'Reset list of words?',
            '',
            [
                {
                    text: 'OK',
                    onPress: () => {
                        this.props.resetWords();
                    }
                },
                {
                    text: 'Cancel',
                    onPress: () => {},
                    style: 'cancel'
                },
                ,
            ],
            { cancelable: false }
        );
    };

    render() {
        const {
            gameTitle,
            secondaryTitle,
            buttonStyle,
            titleContainer,
            parentContainer,
            settingIconContainer
        } = styles;
        return (
            <View style={parentContainer}>
                <Icon
                    containerStyle={settingIconContainer}
                    name='settings'
                    size={30}
                    onPress={this.onPressSettings}
                />
                <View style={titleContainer}>
                    <Text style={gameTitle}>WHAT DO YOU </Text>
                    <Text style={[gameTitle, secondaryTitle]}>"MIME"</Text>
                </View>
                <View style={buttonStyle}>
                    <View>
                        <Button
                            title='Add Words'
                            titleStyle={{ fontWeight: 'bold' }}
                            icon={{ name: 'add', color: 'white' }}
                            iconRight
                            onPress={() => {
                                Actions.selectWords();
                            }}
                        />
                    </View>

                    <View>
                        <Button
                            title='PLAY'
                            titleStyle={{ fontWeight: 'bold' }}
                            onPress={() => Actions.settings()}
                            icon={{ name: 'play-arrow', color: 'white' }}
                            iconRight
                        />
                    </View>
                </View>
            </View>
        );
    }
}

const styles = {
    parentContainer: {
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
    },
    settingIconContainer: {
        position: 'absolute',
        top: 8,
        right: 8,
        zIndex: 1
    }
};

export default connect(
    null,
    { appClosed, resetWords }
)(HomeScreen);
