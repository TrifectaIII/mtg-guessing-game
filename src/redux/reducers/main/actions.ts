import {SELECT_DIFF, RESET_MAIN, FATAL_ERROR, MainActionTypes} from './actionTypes';
import {Difficulties} from '../../../scryfall';

//action dispatch functions for each action type
// should match interface in actionTypes.ts

export const selectDiff = (difficulty: Difficulties): MainActionTypes => {
    return {
        type: SELECT_DIFF,
        difficulty,
    }
}

export const resetMain = (): MainActionTypes => {
    return {
        type: RESET_MAIN,
    }
}

export const fatalError = (message: string): MainActionTypes => {
    return {
        type: FATAL_ERROR,
        message,
    }
}