import {GUESS_CARD, NEXT_CARD, RESET_GAME, GameActionTypes} from './actionTypes'
import {ScryfallCard} from '../../../scryfall';

//type of state slice
interface GameState {
    card: ScryfallCard | null
    score: number
    wrong: boolean
}

//starting state
const initialState: GameState = {
    card: null,
    score: 0,
    wrong: false
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
            if (state.card && state.card.name === action.cardName) {
                return {
                    ...state,
                    score: state.score + 1,
                    card: null,
                }
            }
            //if guess is wrong
            else if (state.card) {
                return {
                    ...state,
                    wrong: true,
                }
            }
            return state;

        case NEXT_CARD:
            //only change state if next card is required
            if (!state.card) {
                return {
                    ...state,
                    card: action.card,
                }
            }
            return state;

        case RESET_GAME:
            return initialState;

        default:
            return state;
    }
}