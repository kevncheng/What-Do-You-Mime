import { SETTINGS_UPDATE, REMOVE_WORD, NEW_GAME, RESET_WORDS } from '../actions/types'
import { words } from '../words'
import _ from 'lodash'

const INITIAL_STATE = {
    time: '60',
    rounds:'3',
    gameRound: '1',
    firstTurn: true,
    passes: '2',
    TeamOnePoints: '0',
    TeamTwoPoints: '0',
    CharadeWords: [...words],
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case SETTINGS_UPDATE:
        return { ...state, [action.payload.prop]: action.payload.value };
      case REMOVE_WORD:
        return {...state, CharadeWords: _.without(state.CharadeWords,action.payload)}
      case RESET_WORDS:
        return {...state, CharadeWords: INITIAL_STATE.CharadeWords}
      case NEW_GAME:
        return INITIAL_STATE
      default:
        return state;
    }
  };