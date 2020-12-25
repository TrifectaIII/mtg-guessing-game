import {SELECT_DIFF, RESET_MAIN, FATAL_ERROR, MainActionTypes} from './actionTypes'
import {Difficulties} from '../../../scryfall';

//type of state slice
interface MainState {
    difficulty: Difficulties | null
    playing: boolean
    error: boolean
}

//starting state
const initialState: MainState = {
    difficulty: null,
    playing: false,
    error: false,
}

//handle actions
export default 
    function (
        state: MainState = initialState, 
        action: MainActionTypes
    ): MainState {

    switch(action.type) {

        case SELECT_DIFF:
            //make sure not currently in a game
            if (!state.playing) {
                return {
                    ...state,
                    difficulty: action.difficulty,
                    playing: true,
                }
            }
            else {
                return state;
            }
            
        case RESET_MAIN:
            return initialState;

        case FATAL_ERROR:
            return {
                ...state,
                error: true,
            }

        default:
            return state;
    }
}