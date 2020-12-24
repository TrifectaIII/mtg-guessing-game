import {ScryfallCard} from '../../../scryfall';

//types for actions
export const GUESS_CARD = 'game/GuessCard';
export const NEXT_CARD = 'game/NextCard';
export const RESET_GAME = 'game/resetGame';

//types of actions
interface GuessCard {
    type: typeof GUESS_CARD
    cardName: string
}

interface NextCard {
    type: typeof NEXT_CARD
    card: ScryfallCard
}

interface ResetGame {
    type: typeof RESET_GAME
}

//union all action types
export type GameActionTypes = GuessCard | NextCard | ResetGame;