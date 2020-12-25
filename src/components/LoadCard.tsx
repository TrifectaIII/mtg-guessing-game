import * as React from 'react';
import {connect, ConnectedProps} from 'react-redux';

//get global state from redux
import {GlobalState} from '../redux/store';

//get dispatch actions
import {fatalError} from '../redux/reducers/main/actions';
import {nextCard} from '../redux/reducers/game/actions';

//get difficulty types
import {Difficulties} from '../scryfall';

//get scryfall info
import {ScryfallCard, ScryfallRandom} from '../scryfall';

import './LoadCard.css';


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
   fatalError,
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
            var format: string | null = null;
            switch (this.props.difficulty) {

                case Difficulties.STANDARD:
                    format = 'standard';
                    break;
                
                case Difficulties.MODERN:
                    format = 'modern';
                    break;

                case Difficulties.VINTAGE:
                    format = 'vintage';
                    break;
                
                default:
                    return;
            }

            //make api call
            ScryfallRandom(format ? `is:booster+legal:${format}` : null)
                .then ((response: any): Promise<ScryfallCard> => response.json())
                .then ((card: ScryfallCard) => this.props.nextCard(card))
                .catch((error?: any) => this.props.fatalError('Error with Scryfall API Call'));
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
