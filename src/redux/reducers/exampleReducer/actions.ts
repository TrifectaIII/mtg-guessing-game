import {ADD, SUBTRACT, CHANGE, ExampleReducerActionTypes} from './actionTypes';

//action dispatch functions for each action type
// should match interface in actionTypes.ts

export const add = (): ExampleReducerActionTypes => {
    return {
        type: ADD,
    }
}

export const subtract = (): ExampleReducerActionTypes => {
    return {
        type: SUBTRACT,
    }
}

export const change = (amount: string): ExampleReducerActionTypes => {
    return {
        type: CHANGE,
        amount,
    }
}