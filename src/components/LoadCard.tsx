import * as React from 'react';
import {connect, ConnectedProps} from 'react-redux';

//get global state from redux
import {GlobalState} from '../redux/store';

//get dispatch actions
import {nextCard} from '../redux/reducers/game/actions';

//get difficulty types
import {Difficulties} from '../redux/reducers/main/actionTypes';

import './LoadCard.css';


//Type of Scryfall API Card Objects
interface SFCard {
    name: string,
    id: string,
    [key: string]: any,//allow any other properties it comes with
}


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
        difficulty: state.main.difficulty,
    }
}

//add dispatch actions to props
const mapDispatchToProps = {
   nextCard,
}

//combine into connector to redux store, and get type
const connector = connect(mapStateToProps, mapDispatchToProps);
type ReduxProps = ConnectedProps<typeof connector>;

//type of component props is intersection of non-redux and redux props
type LoadCardProps = OwnProps & ReduxProps;


//STATE
///////////////////////////////////////////////////////

//type of internal component state
interface LoadCardState {
    
}


//CLASS
///////////////////////////////////////////////////////

//create component using types
class LoadCard 
    extends React.Component 
    <LoadCardProps, LoadCardState> {

        // constructor (props: LoadCardProps) {
        //     super (props);
        // }

        componentDidMount = (): void => {

            //difficulty determines sf api query
            var queryFormat: string = '';
            switch (this.props.difficulty) {

                case Difficulties.STANDARD:
                    queryFormat = 'standard';
                    break;
                
                case Difficulties.MODERN:
                    queryFormat = 'modern';
                    break;

                case Difficulties.VINTAGE:
                    queryFormat = 'vintage';
                    break;
                
                default:
                    return;
            }

            //generate api call
            var fetchURL: string = `https://api.scryfall.com/cards/random?q=legal%3A${queryFormat}`;

            //make api call
            fetch(fetchURL)
                .then ((response): Promise<SFCard> => response.json())
                .then ((card: SFCard) => this.props.nextCard(card.name, card.id));
        }

        render = (): JSX.Element => {
            return (
                <div>
                    <h2>Loading Next Card...</h2>
                </div>
            );
        }
}

//combine with connector and export
export default connector(LoadCard);
