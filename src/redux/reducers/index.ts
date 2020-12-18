import {combineReducers} from 'redux'
import main from './main'

//combine all reducers and export
export const globalReducer = combineReducers({

    main,
    
});