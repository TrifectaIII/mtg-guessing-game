import {combineReducers} from 'redux';
import main from './main';
import game from './game';

//combine all reducers and export
export const globalReducer = combineReducers({

    main,
    game,
    
});