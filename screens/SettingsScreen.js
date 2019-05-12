import React, { Component } from 'react';
import { View,Text, TouchableWithoutFeedback,Keyboard, ScrollView } from 'react-native';
import { Button, Input } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { settingUpdate } from '../actions'

class SettingsScreen extends Component {
    state = {
        timeError: '',
        roundError: '',
        passError: ''
    }

        renderError = () => {
            const {time,rounds} = this.props;
            if ((time < 15) || (rounds < 1)) {
               let timeError = (time < 15)? 'Please Enter A Value Of Atleast 15 Seconds' : ''
               this.setState({timeError})
               
               let roundError = (rounds < 1)? 'Please Enter A Value of Alteast 1 Round' : ''
               this.setState({roundError})
            } else {
                this.setState({timeError:'',roundError:'',passError:''})
                Actions.play({type:'reset'})
            }       
        }


    render() {
        const {timeError,roundError,passError} = this.state;
        const {time,rounds,passes, settingUpdate} = this.props;
        const {inputContainer} = styles; 
        return ( 
            <View style ={{flex: 1,marginTop: 20}}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <ScrollView style = {{flex: 1}} >
                <View style = {{marginBottom: 15}}>
                <Input
                    label = 'Seconds'
                    labelStyle = {{color:'#007AFF'}}
                    keyboardType = 'number-pad'
                    selectTextOnFocus={false}
                    placeholder = '60 seconds'
                    value = {time}
                    onChangeText={value => settingUpdate({prop:'time', value})}
                    errorMessage={timeError}
                    errorStyle = {{position:'absolute', bottom: -20}}
                />
                </View>
                
         
                <View style = {{marginBottom: 15}}>
                <Input
                    label = 'Number of Rounds'
                    labelStyle = {{color:'#007AFF'}}
                    keyboardType = 'number-pad'
                    selectTextOnFocus={false}
                    placeholder = '5 rounds'
                    value = {rounds}
                    onChangeText={value => settingUpdate({prop:'rounds', value})}
                    errorMessage={roundError}
                    errorStyle = {{position:'absolute',bottom: -20}}
                />
                </View>
                <Input
                    label = 'Number of Passes'
                    labelStyle = {{color:'#007AFF'}}
                    keyboardType = 'number-pad'
                    selectTextOnFocus={false}
                    placeholder = '0 Passes'
                    value = {passes}
                    onChangeText={value => settingUpdate({prop:'passes', value})}
                    errorMessage={passError}
                    errorStyle = {{position:'absolute',bottom: -20}}
                />
                
         
                </ScrollView>
                </TouchableWithoutFeedback>
                <View style = {{ justifyContent:'center',postion:'absolute', bottom: 30, left: 0, right: 0, }}>
                <Button 
                    title="Play!"
                    titleStyle = {{fontWeight:'bold'}}
                    onPress={this.renderError}
                    buttonStyle = {{width: '33%', alignSelf:'center'}}
                   
                />
                </View>
            </View>
         );
    }
}

const styles = {
    inputContainer: {
        marginBottom: 15,
        marginLeft: 10,
        marginRight: 10,
    }
}
 
const mapStateToProps = (state) => {
    const {time,rounds,team,passes} = state.setting;
    return {time,rounds,team,passes}
}

export default connect(mapStateToProps,{settingUpdate})(SettingsScreen);