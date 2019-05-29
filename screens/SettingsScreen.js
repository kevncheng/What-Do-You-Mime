import React, { Component } from 'react';
import { View, TouchableWithoutFeedback, Keyboard, ScrollView, Alert } from 'react-native';
import { Button, Input } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { settingUpdate } from '../actions';

class SettingsScreen extends Component {
    state = {
        timeError: '',
        roundError: '',
        passError: ''
    };


    onPressPlay = () => {
        const { time, rounds, MasterWordList } = this.props;
        // Input Value Check
        if (time < 15 || rounds < 1) {
            let timeError = time < 15 ? 'Please Enter A Value Of Atleast 15 Seconds' : '';
            this.setState({ timeError });

            let roundError = rounds < 1 ? 'Please Enter A Value of Alteast 1 Round' : '';
            this.setState({ roundError });
        } else {
            // Check if there are enough words, if so proceed to game, if not proceed to select word screen
            if ( MasterWordList.length < 10){
                Alert.alert(
                    'There are not enough words selected',
                    'Please add atleast 10 words',
                    [
                        {text: 'OK', onPress: () => {
                            Actions.selectWords({type:'reset'})
                    }}
                    ],
                  );
            } else {
                Actions.interval({ type: 'reset' });
            }
            
        }
    };

    render() {
        const { timeError, roundError, passError } = this.state;
        const { time, rounds, passes, settingUpdate } = this.props;
        const {
            parentContainer,
            errorStyle,
            buttonContainer,
            playButtonStyle,
            backButtonContainer,
            inputContainer,
            labelStyle
        } = styles;
        return (
            <View style={parentContainer}>
                <View style={{position:'absolute'}}>
                    <Button
                        title='Go Back'
                        icon={{ name: 'chevron-left', color: '#007AFF' }}
                        type = 'clear'
                        onPress={() => Actions.home()}
                    />
                </View>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <ScrollView style={{ flex: 1,zIndex:-1 }}>
                        <View style={backButtonContainer} />
                        <View style={[inputContainer,{marginTop:35}]}>
                            <Input
                                label='Seconds'
                                labelStyle={labelStyle}
                                keyboardType='number-pad'
                                selectTextOnFocus={false}
                                placeholder='60 seconds'
                                value={time}
                                onChangeText={value => settingUpdate({ prop: 'time', value })}
                                errorMessage={timeError}
                                errorStyle={errorStyle}
                            />
                        </View>

                        <View style={inputContainer}>
                            <Input
                                label='Number of Rounds'
                                labelStyle={labelStyle}
                                keyboardType='number-pad'
                                selectTextOnFocus={false}
                                placeholder='5 rounds'
                                value={rounds}
                                onChangeText={value => settingUpdate({ prop: 'rounds', value })}
                                errorMessage={roundError}
                                errorStyle={errorStyle}
                            />
                        </View>
                        <View style = {inputContainer}>
                        <Input
                            label='Number of Passes'
                            labelStyle={labelStyle}
                            keyboardType='number-pad'
                            selectTextOnFocus={false}
                            placeholder='0 Passes'
                            value={passes}
                            onChangeText={value => settingUpdate({ prop: 'passes', value })}
                            errorMessage={passError}
                            errorStyle={errorStyle}
                        />
                        </View>
                    </ScrollView>
                </TouchableWithoutFeedback>
                <View style={buttonContainer}>
                    <Button
                        title='Play!'
                        titleStyle={{ fontWeight: 'bold' }}
                        onPress={this.onPressPlay}
                        buttonStyle={playButtonStyle}
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
    inputContainer: {
        marginLeft: 10,
        marginBottom: 15
    },
    errorStyle: {
        position: 'absolute',
        bottom: -20
    },
    buttonContainer: {
        justifyContent: 'center',
        postion: 'absolute',
        bottom: 30,
        left: 0,
        right: 0
    },
    playButtonStyle: {
        width: '33%',
        alignSelf: 'center'
    },
    backButtonContainer: {
        alignSelf: 'flex-start'
    },
    labelStyle: {
        color: '#007AFF'
    }
};

const mapStateToProps = state => {
    const { time, rounds, team, passes, selected, MasterWordList } = state.setting;
    return { time, rounds, team, passes, selected, MasterWordList };
};

export default connect(
    mapStateToProps,
    { settingUpdate }
)(SettingsScreen);
