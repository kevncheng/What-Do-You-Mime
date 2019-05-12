import {
    LOSE_POINT,
    GAIN_POINT,
    GAME_UPDATE
} from './types'

export const pointUpdate = ({turn,isSkip}) => {
    if(isSkip){
        return {
            type: LOSE_POINT,
            payload: turn
        }
    } else {
        return {
            type: GAIN_POINT,
            payload: turn
        }
    }
}

export const GameProgress = ({prop,value}) => {
    return {
    type: GAME_UPDATE,
    payload: {prop,value}
    }
}