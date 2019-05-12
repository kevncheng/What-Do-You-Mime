import { GAIN_POINT, LOSE_POINT, GAME_UPDATE, ROUND_UPDATE } from "../actions/types";

const INITIAL_STATE = {
    TeamOne: 0,
    TeamTwo: 0,
    amountPassed: 0,
    turn: 1
}

export default (state = INITIAL_STATE, action) => {
    switch(action.type){
        case ROUND_UPDATE:
        return { ...state, [action.payload.prop]: action.payload.value };
        case GAIN_POINT:
            return (
                state.turn === 1? state.TeamOne + 1 : state.TeamTwo + 1);
        case LOSE_POINT:
            return state.turn === 1? state.TeamOne - 1 : state.TeamTwo - 1;
        case GAME_UPDATE:
        return { ...state, [action.payload.prop]: action.payload.value }; 
        default:
            return state;
    }
}