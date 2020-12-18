import {SELECT_DIFF, END_GAME, Difficulties, MainActionTypes} from './actionTypes'


//type of state slice
interface MainState {
    difficulty: Difficulties
    playing: boolean
}

//starting state
const initialState: MainState = {
    difficulty: Difficulties.NONE,
    playing: false
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
            
        case END_GAME:
            return {
                ...state,
                difficulty: Difficulties.NONE,
                playing: false,
            }

        default:
            return state;
    }
}