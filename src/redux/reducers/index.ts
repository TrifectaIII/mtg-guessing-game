import {combineReducers} from 'redux'
import exampleReducer from './exampleReducer'

//combine all reducers and export
export const globalReducer = combineReducers({

    exampleReducer,
    
});