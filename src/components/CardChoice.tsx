import * as React from 'react';
import {connect, ConnectedProps} from 'react-redux';

//get global state from redux
import {GlobalState} from '../redux/store';

//get type of scryfall cards
import {ScryfallCard} from '../scryfall';

//get component
import ChoiceButton from './ChoiceButton';

import './CardChoice.css';


//all basic card types
var cardtypes: string[] = ['Creature', 'Instant', 'Sorcery', 'Enchantment', 'Artifact', 'Land', 'Planeswalker'];


// PROPS
///////////////////////////////////////////////////////

//add non-redux props
interface OwnProps {
    //can use optional properties here like so:
    // propertyName?: type
}

//mutate redux state to props, using ownprops if neccesary
const mapStateToProps = (state:GlobalState, ownProps: OwnProps) => {
    return {
        card: state.game.card,
    }
}

//add dispatch actions to props
const mapDispatchToProps = {

}

//combine into connector to redux store, and get type
const connector = connect(mapStateToProps, mapDispatchToProps);
type ReduxProps = ConnectedProps<typeof connector>;

//type of component props is intersection of non-redux and redux props
type CardChoiceProps = OwnProps & ReduxProps;


//STATE
///////////////////////////////////////////////////////

//type of internal component state
interface CardChoiceState {
    cardNames: string[]
}


//CLASS
///////////////////////////////////////////////////////

//create component using types
class CardChoice 
    extends React.Component 
    <CardChoiceProps, CardChoiceState> {

        constructor (props: CardChoiceProps) {
            super (props);

            this.state = {
                cardNames: [],
            } as CardChoiceState
        }

        componentDidMount = (): void => {

            if (!this.props.card) return;

            //add correct card to names
            this.setState({cardNames: [this.props.card.name]});

            //get setcode from card obj
            var setcode: string = this.props.card.set;

            //find type of card from type line
            var type: string | null = null;
            cardtypes.some((cardtype: string): boolean => {
                if (this.props.card?.type_line.includes(cardtype)) {
                    type = cardtype.toLowerCase();
                    return true
                }
                return false
            });

            //generate url for fetch
            var fetchURL: string = `https://api.scryfall.com/cards/random?q=is:booster+set:${setcode}${(type ? `+type:${type}` : '')}`;

            //fetch 3 more cards
            for (let i = 0; i < 3; i++) {
                fetch(fetchURL)
                    .then((response): Promise<ScryfallCard> => response.json())
                    .then((card: ScryfallCard) => {
                        this.setState({
                            cardNames: shuffle(this.state.cardNames.concat([card.name])),
                        });
                    });
            }
        }
 
        render = (): JSX.Element => {
            
            var imgURL: string | undefined = 
                this.props.card ? 
                `https://api.scryfall.com/cards/${this.props.card.id}/?format=image&version=art_crop` : 
                undefined;

            return (
                <div>
                    <img 
                        src={imgURL}
                        alt="The card art"
                    />
                    <br/>
                    {this.state.cardNames.length === 4 ? 
                        (removeDuplicates(this.state.cardNames).map(
                            (name: string): JSX.Element => {
                                return (
                                    <ChoiceButton 
                                        cardName={name}
                                        key={name}
                                    />
                                )
                            }
                        ))
                    :(
                        <p>Loading Choices...</p>
                    )}
                </div>
            );
        }
}

//combine with connector and export
export default connector(CardChoice);


//helper function to allow array shuffling
function shuffle (array: any[]): any[] {
    var copy: any[] = [...array];
    for (let i: number = copy.length - 1; i > 0; i--) {
        const j: number = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
}


//helper function to remoe duplicates from an array
function removeDuplicates (array: any[]): any[] {
    var uniques: any[] = [];
    array.forEach((elem) => {
        if (!uniques.includes(elem)) uniques.push(elem);
    })
    return uniques;
}