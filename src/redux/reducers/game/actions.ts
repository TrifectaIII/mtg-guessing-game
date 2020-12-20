import {GUESS_CARD, NEXT_CARD, GameActionTypes} from './actionTypes';
import {ScryfallCard} from '../../../scryfall';

//action dispatch functions for each action type
// should match interface in actionTypes.ts

export const guessCard = (cardName: string): GameActionTypes => {
    return {
        type: GUESS_CARD,
        cardName,
    }
}

export const nextCard = (card: ScryfallCard): GameActionTypes => {
    return {
        type: NEXT_CARD,
        card,
    }
}