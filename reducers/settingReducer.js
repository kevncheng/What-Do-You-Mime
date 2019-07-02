import {
    SETTINGS_UPDATE,
    REMOVE_WORD,
    NEW_GAME,
    RESET_WORDS,
    SELECT_WORD,
    UNSELECT_WORD,
    APP_CLOSED,
    CREATE_WORD_LIST,
    DELETE_WORD_LIST,
    OPEN_FIRST_TIME
} from '../actions/types';
import _ from 'lodash';

export const INITIAL_STATE = {
    time: '60',
    rounds: '3',
    gameRound: '1',
    firstTurn: true,
    passes: '2',
    TeamOnePoints: '0',
    TeamTwoPoints: '0',
    CharadeWords: [],
    MasterWordList: [],
    selected: {},
    wordList: {},
    firstOpen: true
};

export default (state = INITIAL_STATE, action) => {
    const { payload, type } = action;
    const {
        time,
        rounds,
        gameRound,
        firstTurn,
        passes,
        TeamOnePoints,
        TeamTwoPoints,
        CharadeWords,
        MasterWordList,
        selected
    } = INITIAL_STATE;
    switch (type) {
        case SETTINGS_UPDATE:
            return { ...state, [action.payload.prop]: action.payload.value };
        case REMOVE_WORD:
            return { ...state, CharadeWords: _.without(state.CharadeWords, action.payload) };
        case RESET_WORDS:
            return { ...state, CharadeWords: [...state.MasterWordList] };
        case NEW_GAME:
            return {
                ...state,
                time,
                rounds,
                gameRound,
                firstTurn,
                passes,
                TeamOnePoints,
                TeamTwoPoints
            };
        case APP_CLOSED:
            return {
                ...state,
                time,
                rounds,
                gameRound,
                firstTurn,
                passes,
                TeamOnePoints,
                TeamTwoPoints
            };
        case SELECT_WORD:
            return {
                ...state,
                selected: { ...state.selected, [payload.title]: payload },
                MasterWordList: _.union(state.MasterWordList,payload.words),
                CharadeWords: [...state.MasterWordList]
            };

        case UNSELECT_WORD:
            // const obj = { a: 1, b:2, c:3 }
            // const { b, ...rest } = obj => rest = { a:1, c:3 }
            const { [payload.title]: omitted, ...selected } = state.selected;
            return {
                ...state,
                selected,
                MasterWordList: _.difference(state.MasterWordList, payload.words),
                CharadeWords: [state.MasterWordList]
            };
        case CREATE_WORD_LIST:
            return { ...state, wordList: { ...state.wordList, [payload.title]: payload } };
        case DELETE_WORD_LIST:
            const { [payload.title]: removed, ...wordList } = state.wordList;
            return { ...state, wordList };
        case OPEN_FIRST_TIME:
            return { ...state, firstOpen: false };
        default:
            return state;
    }
};
