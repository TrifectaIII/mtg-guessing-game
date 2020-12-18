//types for actions
export const ADD = 'exampleReducer/Add';
export const SUBTRACT = 'exampleReducer/Subtract';
export const CHANGE = 'exampleReducer/Change';

//types of actions
interface Add {
    type: typeof ADD
}

interface Subtract {
    type: typeof SUBTRACT
}

interface Change {
    type: typeof CHANGE
    amount: string
}

//union all action types
export type ExampleReducerActionTypes = Add | Subtract | Change;