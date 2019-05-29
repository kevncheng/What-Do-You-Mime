import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Scene, Router, Actions } from 'react-native-router-flux';
import HomeScreen from '../screens/HomeScreen';
import SettingsScreen from '../screens/SettingsScreen';
import PlayScreen from '../screens/PlayScreen';
import EndTurnScreen from '../screens/EndTurnScreen';
import SelectWordsScreen from '../screens/SelectWordsScreen';
import CreateWordListScreen from '../screens/CreateWordListScreen';
import WinScreen from '../screens/WinScreen';
import IntervalScreen from '../screens/IntervalScreen';
import SplashScreen from '../screens/SplashScreen';


const RouterComponent = () => {
    return (
        <Router >
            <Scene key = 'main' hideNavBar={true} >
                <Scene key = 'splash' component = {SplashScreen} />
                <Scene key = 'home' component={HomeScreen} />
                <Scene key = 'settings' component={SettingsScreen} />
                <Scene key = 'play' component={PlayScreen} />
                <Scene key = 'interval' component={IntervalScreen} />
                <Scene key = 'end' component={EndTurnScreen}/>
                <Scene key = 'win' component={WinScreen}/>
                <Scene key = 'selectWords' component={SelectWordsScreen}/>
                <Scene key = 'createWords' component={CreateWordListScreen}/>
            </Scene>
        </Router>
    )
}

const styles = {
    SceneStyle: {
        backgroundColor: 'red'
    }
}

export default RouterComponent;