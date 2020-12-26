//type for card object from scryfall api
export interface ScryfallCard {
    name: string
    id: string
    set: string
    type_line: string
    artist?: string | null
    color_identity: string[]
    [key: string]: any,//allow any other properties it comes with
}

//all basic card types
export const cardtypes: string[] = ['Creature', 'Instant', 'Sorcery', 'Enchantment', 'Artifact', 'Land', 'Planeswalker'];

//enum for different difficulties
export enum Difficulties {
    STANDARD = 'STANDARD',
    MODERN = 'MODERN',
    VINTAGE = 'VINTAGE'
}

export function ScryfallRandom(query: string | null) {
    return (
        query ?
        fetch(`https://api.scryfall.com/cards/random?q=${query}`) :
        fetch('https://api.scryfall.com/cards/random')
    );
}

export function ScryfallImageURL(id: string) {
    return `https://api.scryfall.com/cards/${id}/?format=image&version=art_crop`;
}