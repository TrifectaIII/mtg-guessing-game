import {ADD, SUBTRACT, CHANGE, ExampleReducerActionTypes} from './actionTypes'

//type of state slice
interface ExampleReducerState {
    counter: number
}

//starting state
const initialState: ExampleReducerState = {
    counter: 0,
}

//handle actions
export default 
    function (
        state: ExampleReducerState = initialState, 
        action: ExampleReducerActionTypes
    ): ExampleReducerState {

    switch(action.type) {

        case ADD:
            return {
                ...state,
                counter: state.counter + 1,
            };

        case SUBTRACT:
            return {
                ...state,
                counter: state.counter - 1,
            };

        case CHANGE:
            return {
                ...state,
                counter: state.counter + parseFloat(action.amount),
            };

        default:
            return state;
    }
}