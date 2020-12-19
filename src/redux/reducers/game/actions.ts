import {GUESS_CARD, NEXT_CARD, GameActionTypes} from './actionTypes';

//action dispatch functions for each action type
// should match interface in actionTypes.ts

export const guessCard = (cardName: string): GameActionTypes => {
    return {
        type: GUESS_CARD,
        cardName,
    }
}

export const nextCard = (cardName: string, cardSFID: string): GameActionTypes => {
    return {
        type: NEXT_CARD,
        cardName,
        cardSFID,
    }
}