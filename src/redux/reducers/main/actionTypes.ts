import {Difficulties} from '../../../scryfall';

//types for actions
export const SELECT_DIFF = 'main/SelectDiff';
export const RESET_MAIN = 'main/EndGame';
export const FATAL_ERROR = 'main/FatalError';

//types of actions
interface SelectDiff {
    type: typeof SELECT_DIFF
    difficulty: Difficulties
}

interface ResetMain {
    type: typeof RESET_MAIN
}

interface FatalError {
    type: typeof FATAL_ERROR
    message: string
}

//union all action types
export type MainActionTypes = SelectDiff | ResetMain | FatalError;