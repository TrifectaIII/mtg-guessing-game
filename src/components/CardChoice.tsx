import * as React from 'react';
import {connect, ConnectedProps} from 'react-redux';

//get global state from redux
import {GlobalState} from '../redux/store';

//get dispatch actions
import {fatalError} from '../redux/reducers/main/actions';

//get scryfall info
import {ScryfallCard, cardtypes, ScryfallRandom, ScryfallImageURL} from '../scryfall';

//get component
import ChoiceButton from './ChoiceButton';

import './CardChoice.scss';


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
    fatalError,
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
            // var setcode: string = this.props.card.set;

            //find type of card from type line
            var type: string | null = null;
            cardtypes.some((cardtype: string): boolean => {
                if (this.props.card?.type_line.includes(cardtype)) {
                    type = cardtype.toLowerCase();
                    return true
                }
                return false
            });
            const typeq = type ? `+type:${type}` : '';
    
            //match colors
            const colors: string = this.props.card.color_identity.map((color: string): string => {
                return `color>=${color}`;
            }).join('+OR+');
            var colorsq = colors.length ? `+(${colors})` : '+color=C';

            //match creature types
            var creaturetypesq: string = '';
            if (type === 'creature') {
                var creaturetypes: string[] = [];
                const typeline: string = this.props.card?.type_line;
                const typelines: string[] = typeline.split('//');
                for (let i: number = 0; i < typelines.length; i++) {
                    const tl: string = typelines[i];
                    if (tl.includes('Creature')) {
                        const ct = tl.split('—')[1].split(' ').filter((type: string):boolean => type.length > 0);
                        creaturetypes = creaturetypes?.concat(ct);
                    }
                }
                const creaturetypesCombined: string = creaturetypes.map((ct: string): string => {
                    return `type=${ct}`;
                }).join('+OR+')
                creaturetypesq = `+(${creaturetypesCombined})`;
                //dont search by color if searching by creature type
                colorsq = '';
                console.log(creaturetypes);
            }
            


            //fetch 3 more cards
            for (let i = 0; i < 3; i++) {
                ScryfallRandom(`is:booster${typeq}${colorsq}${creaturetypesq}`)
                    .then((response): Promise<ScryfallCard> => response.json())
                    .then((card: ScryfallCard) => {
                        this.setState({
                            cardNames: shuffle<string>(this.state.cardNames.concat([card.name])),
                        });
                    })
                    .catch((error?: any) => this.props.fatalError('Error with Scryfall API Call'));
            }
        }
 
        render = (): JSX.Element => {
            
            var imgURL: string | undefined = 
                this.props.card ? 
                ScryfallImageURL(this.props.card.id) : 
                undefined;

            return (
                <div>
                    <img 
                        src={imgURL}
                        alt="The card art"
                    />
                    {
                        this.props.card?.artist ? 
                        (<p>Artist: {this.props.card.artist}</p>) : 
                        null
                    }
                    {this.state.cardNames.length === 4 ? 
                        (removeDuplicates<string>(this.state.cardNames).map(
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
function shuffle <T> (array: T[]): T[] {
    var copy: T[] = [...array];
    for (let i: number = copy.length - 1; i > 0; i--) {
        const j: number = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
}


//helper function to remoe duplicates from an array
function removeDuplicates <T> (array: T[]): T[] {
    var uniques: T[] = [];
    array.forEach((elem) => {
        if (elem && !uniques.includes(elem)) uniques.push(elem);
    })
    return uniques;
}