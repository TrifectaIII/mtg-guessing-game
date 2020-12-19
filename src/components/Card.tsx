import * as React from 'react';
import {connect, ConnectedProps} from 'react-redux';

//get global state from redux
import {GlobalState} from '../redux/store';

//get dispatch actions
import {guessCard} from '../redux/reducers/game/actions';

//get difficulty types
import {Difficulties} from '../redux/reducers/main/actionTypes';

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
        cardSFID: state.game.cardSFID,
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
    
}


//CLASS
///////////////////////////////////////////////////////

//create component using types
class Card 
    extends React.Component 
    <CardProps, CardState> {

        // constructor (props: CardProps) {
        //     super (props);
        // }

        render = (): JSX.Element => {
            return (
                <div>
                    <img src={'https://api.scryfall.com/cards/' + this.props.cardSFID + '/?format=image&version=art_crop'}/>
                </div>
            );
        }
}

//combine with connector and export
export default connector(Card);
