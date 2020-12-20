//type for card object from scryfall api
export interface ScryfallCard {
    name: string
    id: string
    set: string
    [key: string]: any,//allow any other properties it comes with
}