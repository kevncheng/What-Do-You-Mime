import { combineReducers } from 'redux';
import wordReducer from './wordReducer.js'
import settingReducer from './settingReducer.js'


export default combineReducers({
    play:wordReducer,
    setting:settingReducer
})