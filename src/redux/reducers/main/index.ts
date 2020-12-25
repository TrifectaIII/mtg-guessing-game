import {SELECT_DIFF, RESET_MAIN, FATAL_ERROR, MainActionTypes} from './actionTypes'
import {Difficulties} from '../../../scryfall';

//type of state slice
interface MainState {
    difficulty: Difficulties | null
    playing: boolean
    error: boolean
    errorMessage: string
}

//starting state
const initialState: MainState = {
    difficulty: null,
    playing: false,
    error: false,
    errorMessage: '',
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
            
        case FATAL_ERROR:
            return {
                ...state,
                error: true,
                errorMessage: action.message,
            }

        case RESET_MAIN:
            return initialState;


        default:
            return state;
    }
}