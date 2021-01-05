import * as React from 'react';
import {connect, ConnectedProps} from 'react-redux';

//get global state from redux
import {GlobalState} from './redux/store';

//get components
import ChooseDifficulty from './components/ChooseDifficulty';
import Game from './components/Game';
import GameError from './components/GameError';

import './App.scss';


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
        playing: state.main.playing,
        error: state.main.error,
    }
}

//add actions dispatch to props
const mapDispatchToProps = {

}

//combine into connector to redux store, and get type
const connector = connect(mapStateToProps, mapDispatchToProps);
type ReduxProps = ConnectedProps<typeof connector>;

//type of component props is intersection of non-redux and redux props
type AppProps = OwnProps & ReduxProps;


//STATE
///////////////////////////////////////////////////////

//type of internal component state
interface AppState {

}


//CLASS
///////////////////////////////////////////////////////

class App 
    extends React.Component
    <AppProps, AppState> {

        // constructor (props: AppProps) {
        //     super (props);
        // }

        render = (): JSX.Element => {

            return (
                <div>
                    <p>Created by <a href='https://trifectaiii.github.io/'>Dakota Madden-Fong</a><br/>
                    Uses the <a href='https://scryfall.com/docs/api'>Scryfall API</a></p>
                    <h1>MTG Guessing Game</h1>
                    {this.props.error ? (<GameError/>) : null}
                    {!this.props.error && !this.props.playing ? (<ChooseDifficulty/>) : null}
                    {!this.props.error && this.props.playing ? (<Game/>) : null}
                </div>
            );
        }
}

//combine with connector and export
export default connector(App);
