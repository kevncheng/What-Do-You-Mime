export { Actions } from "react-native-router-flux";
import { SETTINGS_UPDATE, REMOVE_WORD, RESET_WORDS, NEW_GAME, GENERATE_WORD } from "./types";

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

export const newGame = () => {
  return {
    type: NEW_GAME
  };
};
