//types for actions
export const SELECT_DIFF = 'main/SelectDiff';
export const END_GAME = 'main/EndGame';

//enum for different difficulties
export enum Difficulties {
    NONE = 'NONE',
    STANDARD = 'STANDARD',
    MODERN = 'MODERN',
    VINTAGE = 'VINTAGE'
}

//types of actions
interface SelectDiff {
    type: typeof SELECT_DIFF
    difficulty: Difficulties
}

interface EndGame {
    type: typeof END_GAME
}

//union all action types
export type MainActionTypes = SelectDiff | EndGame;