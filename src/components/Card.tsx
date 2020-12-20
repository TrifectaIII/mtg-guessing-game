import * as React from 'react';
import {connect, ConnectedProps} from 'react-redux';

//get global state from redux
import {GlobalState} from '../redux/store';

//get dispatch actions
import {guessCard} from '../redux/reducers/game/actions';

//get type of scryfall cards
import {ScryfallCard} from '../scryfall';

import './Card.css';


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
   guessCard,
}

//combine into connector to redux store, and get type
const connector = connect(mapStateToProps, mapDispatchToProps);
type ReduxProps = ConnectedProps<typeof connector>;

//type of component props is intersection of non-redux and redux props
type CardProps = OwnProps & ReduxProps;


//STATE
///////////////////////////////////////////////////////

//type of internal component state
interface CardState {
    cardNames: string[]
}


//CLASS
///////////////////////////////////////////////////////

//create component using types
class Card 
    extends React.Component 
    <CardProps, CardState> {

        constructor (props: CardProps) {
            super (props);

            this.state = {
                cardNames: [],
            } as CardState
        }

        componentDidMount = (): void => {

            if (!this.props.card) return;

            this.setState({cardNames: [this.props.card.name]});

            var setcode: string = this.props.card.set;
            var fetchURL: string = `https://api.scryfall.com/cards/random?q=is%3Abooster+set%3A${setcode}`;

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
                    {this.state.cardNames.length === 4 ? 
                    (this.state.cardNames.map(
                        (name: string): JSX.Element => {
                            return (
                                <button 
                                    key={name} 
                                    onClick={()=>this.props.guessCard(name)}
                                >
                                    {name}
                                </button>
                            )
                        }
                    ))
                    : null}
                </div>
            );
        }
}

//combine with connector and export
export default connector(Card);


//helper function to allow array shuffling
function shuffle (array: any[]): any[] {
    var copy: any[] = [...array];
    for (let i: number = copy.length - 1; i > 0; i--) {
        const j: number = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
}
