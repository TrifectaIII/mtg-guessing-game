import * as React from 'react';
import {connect, ConnectedProps} from 'react-redux';

//get global state from redux
import {GlobalState} from '../redux/store';

//get actions to end game
import {resetMain} from '../redux/reducers/main/actions';
import {resetGame} from '../redux/reducers/game/actions';

import './GameOver.scss';


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
        cardName: state.game.card?.name
    }
}

//add dispatch actions to props
const mapDispatchToProps = {
    resetMain,
    resetGame,
}

//combine into connector to redux store, and get type
const connector = connect(mapStateToProps, mapDispatchToProps);
type ReduxProps = ConnectedProps<typeof connector>;

//type of component props is intersection of non-redux and redux props
type GameOverProps = OwnProps & ReduxProps;


//STATE
///////////////////////////////////////////////////////

//type of internal component state
interface GameOverState {

}


//CLASS
///////////////////////////////////////////////////////

//create component using types
class GameOver 
    extends React.Component 
    <GameOverProps, GameOverState> {

        // constructor (props: GameProps) {
        //     super (props);
        // }

        restart = (): void => {
            this.props.resetGame();
            this.props.resetMain();
        }
  
        render = (): JSX.Element => {

            return (
                <div className='gameOver'>
                    <h1>Game Over</h1>
                    <h3>The card was: {this.props.cardName}</h3>
                    <button onClick={this.restart}>Reset</button>
                </div>
            );
        }
}

//combine with connector and export
export default connector(GameOver);