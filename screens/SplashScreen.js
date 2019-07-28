import React, { Component } from 'react';
import { View, Text, Animated, Image, Dimensions, ActivityIndicator } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Icon, CheckBox } from 'react-native-elements';
import { connect } from 'react-redux';
import { words } from '../words'
import {openFirstTime, selectWordList, resetWords } from '../actions'

const { width, height } = Dimensions.get('window');

class SplashScreen extends Component {
    // openFirst = (title,words) => {
    //     const { selectWordList, openFirstTime, resetWords } = this.props;
    //     selectWordList({title,words})
    //     resetWords()
    //     openFirstTime()
    // }

    componentDidMount = () => {
            setTimeout(() => Actions.home({ type: 'reset' }), 500)
    }
    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignSelf:'center' }}>
                <ActivityIndicator size ='large' />
                <View style = {{positon:'abosulte', top: 0}}>
                {/* Preload Icons */}
                  <Icon name = 'add' color = 'rgba(0, 0, 0, 0)' size = {0}/>
                  <CheckBox  size = {0} containerStyle = {{backgroundColor:'rgba(0, 0, 0, 0)', position: 'absolute', top : 2000}}/>
                </View>
            </View>
        );
    }
}

const mapStateToProps = state => {
    const { firstOpen } = state.setting;
    return { firstOpen };
}

export default connect(mapStateToProps,{openFirstTime, selectWordList, resetWords})(SplashScreen);
