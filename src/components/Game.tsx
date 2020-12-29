import * as React from 'react';
import {connect, ConnectedProps} from 'react-redux';

//get global state from redux
import {GlobalState} from '../redux/store';

//get components
import LoadCard from './LoadCard';
import CardChoice from './CardChoice';
import GameOver from './GameOver';

import './Game.scss';


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
        score: state.game.score,
        card: state.game.card,
        wrong: state.game.wrong,
    }
}

//add dispatch actions to props
const mapDispatchToProps = {

}

//combine into connector to redux store, and get type
const connector = connect(mapStateToProps, mapDispatchToProps);
type ReduxProps = ConnectedProps<typeof connector>;

//type of component props is intersection of non-redux and redux props
type GameProps = OwnProps & ReduxProps;


//STATE
///////////////////////////////////////////////////////

//type of internal component state
interface GameState {

}


//CLASS
///////////////////////////////////////////////////////

//create component using types
class Game 
    extends React.Component 
    <GameProps, GameState> {

        // constructor (props: GameProps) {
        //     super (props);
        // }
 
        render = (): JSX.Element => {

            return (
                <div>
                   <h2>Score: {this.props.score}</h2>
                   {this.props.wrong ? (<GameOver/>) : null}
                   {!this.props.wrong && !this.props.card ? (<LoadCard/>) : null} 
                   {!this.props.wrong && this.props.card ? (<CardChoice/>) : null} 
                </div>
            );
        }
}

//combine with connector and export
export default connector(Game);