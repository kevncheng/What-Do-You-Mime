import { combineReducers } from 'redux';
import settingReducer from './settingReducer.js'


export default combineReducers({
    setting:settingReducer
})