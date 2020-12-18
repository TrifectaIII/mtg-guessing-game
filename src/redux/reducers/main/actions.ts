import {SELECT_DIFF, END_GAME, Difficulties, MainActionTypes} from './actionTypes';

//action dispatch functions for each action type
// should match interface in actionTypes.ts

export const selectDiff = (difficulty: Difficulties): MainActionTypes => {
    return {
        type: SELECT_DIFF,
        difficulty,
    }
}

export const endGame = (): MainActionTypes => {
    return {
        type: END_GAME,
    }
}