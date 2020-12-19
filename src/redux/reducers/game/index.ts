import {GUESS_CARD, NEXT_CARD, GameActionTypes} from './actionTypes'


//type of state slice
interface GameState {
    cardName: string | null,
    cardSFID: string | null,
    score: number,
}

//starting state
const initialState: GameState = {
    cardName: null,
    cardSFID: null,
    score: 0,
}

//handle actions
export default 
    function (
        state: GameState = initialState, 
        action: GameActionTypes
    ): GameState {

    switch(action.type) {

        case GUESS_CARD:
            //if guess is right
            if (state.cardName && state.cardName === action.cardName) {
                return {
                    ...state,
                    score: state.score + 1,
                    cardName: null,
                    cardSFID: null,
                }
            }
            //if guess is wrong
            else if (state.cardName) {
                return {
                    ...state,
                    score: state.score - 1,
                    cardName: null,
                    cardSFID: null,
                }
            }
            return state;

        case NEXT_CARD:
            //only change state if next card is required
            if (!state.cardName) {
                return {
                    ...state,
                    cardName: action.cardName,
                    cardSFID: action.cardSFID,
                }
            }
            return state;

        default:
            return state;
    }
}