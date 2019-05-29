export { Actions } from 'react-native-router-flux';
import {
    SETTINGS_UPDATE,
    REMOVE_WORD,
    RESET_WORDS,
    NEW_GAME,
    SELECT_WORD,
    UNSELECT_WORD,
    APP_CLOSED,
    CREATE_WORD_LIST,
    DELETE_WORD_LIST,
    CLEAR_WORDS,
    OPEN_FIRST_TIME
} from './types';

export const settingUpdate = ({ prop, value }) => {
    return {
        type: SETTINGS_UPDATE,
        payload: { prop, value }
    };
};

export const removeWord = playWord => {
    return {
        type: REMOVE_WORD,
        payload: playWord
    };
};

export const resetWords = () => {
    return {
        type: RESET_WORDS
    };
};

export const selectWordList = payload => {
    return {
        type: SELECT_WORD,
        payload
    };
};
export const unselectWordList = payload => {
    return {
        type: UNSELECT_WORD,
        payload
    };
};

export const newGame = () => {
    return {
        type: NEW_GAME
    };
};
export const clearWords = () => {
    return {
        type: CLEAR_WORDS
    };
};

export const appClosed = () => {
    return {
        type: APP_CLOSED
    };
};

export const openFirstTime = () => {
    return {
        type: OPEN_FIRST_TIME
    };
};

export const createWordList = payload => {
    return {
        type: CREATE_WORD_LIST,
        payload
    };
};
export const deleteWordList = payload => {
    return {
        type: DELETE_WORD_LIST,
        payload
    };
};
