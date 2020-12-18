import {createStore} from 'redux';
import {globalReducer} from './reducers';
import {composeWithDevTools} from 'redux-devtools-extension';

//create store with combined reducers
export default createStore(
    
    globalReducer,
    
    composeWithDevTools(),//this line enables redux devtools browser extention
);

//get state for combined states of all reducers
export type GlobalState = ReturnType<typeof globalReducer>;