import * as React from 'react';
import {connect, ConnectedProps} from 'react-redux';

//get global state from redux
import {GlobalState} from '../redux/store';

//get dispatch actions
import {selectDiff} from '../redux/reducers/main/actions';

//get difficulty types
import {Difficulties} from '../scryfall';

import './ChooseDifficulty.scss';


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
        
    }
}

//add dispatch actions to props
const mapDispatchToProps = {
   selectDiff,
}

//combine into connector to redux store, and get type
const connector = connect(mapStateToProps, mapDispatchToProps);
type ReduxProps = ConnectedProps<typeof connector>;

//type of component props is intersection of non-redux and redux props
type ChooseDifficultyProps = OwnProps & ReduxProps;


//STATE
///////////////////////////////////////////////////////

//type of internal component state
interface ChooseDifficultyState {
    inputValue: string
}


//CLASS
///////////////////////////////////////////////////////

//create component using types
class ChooseDifficulty 
    extends React.Component 
    <ChooseDifficultyProps, ChooseDifficultyState> {

        constructor (props: ChooseDifficultyProps) {
            super (props);

            //construc state using interface
            this.state = {
                inputValue: '0',
            } as ChooseDifficultyState;
        }

        //input event handler using React typing
        handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
            this.setState({inputValue: event.target.value});
        }

        render = (): JSX.Element => {
            return (
                <div className='ChooseDifficulty'>
                    <h2>Choose Difficulty:</h2>
                    <button onClick={()=>this.props.selectDiff(Difficulties.STANDARD)}>Standard</button>
                    <br/>
                    <button onClick={()=>this.props.selectDiff(Difficulties.MODERN)}>Modern</button>
                    <br/>
                    <button onClick={()=>this.props.selectDiff(Difficulties.VINTAGE)}>Vintage</button>
                </div>
            );
        }
}

//combine with connector and export
export default connector(ChooseDifficulty);
