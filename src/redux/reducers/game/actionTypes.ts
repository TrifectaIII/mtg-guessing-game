//types for actions
export const GUESS_CARD = 'game/GuessCard';
export const NEXT_CARD = 'game/NextCard';

//types of actions
interface GuessCard {
    type: typeof GUESS_CARD
    cardName: string
}

interface NextCard {
    type: typeof NEXT_CARD
    cardName: string
    cardSFID: string
}

//union all action types
export type GameActionTypes = GuessCard | NextCard;