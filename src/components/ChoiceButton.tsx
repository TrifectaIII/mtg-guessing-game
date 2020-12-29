import * as React from 'react';
import {connect, ConnectedProps} from 'react-redux';

//get global state from redux
import {GlobalState} from '../redux/store';

//get dispatch actions
import {guessCard} from '../redux/reducers/game/actions';

import './ChoiceButton.scss';


// PROPS
///////////////////////////////////////////////////////

//add non-redux props
interface OwnProps {
    cardName: string,
}

//mutate redux state to props, using ownprops if neccesary
const mapStateToProps = (state:GlobalState, ownProps: OwnProps) => {
    return {
        
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
type ChoiceButtonProps = OwnProps & ReduxProps;


//STATE
///////////////////////////////////////////////////////

//type of internal component state
interface ChoiceButtonState {

}


//CLASS
///////////////////////////////////////////////////////

//create component using types
class ChoiceButton 
    extends React.Component 
    <ChoiceButtonProps, ChoiceButtonState> {

        // constructor (props: ChoiceButtonProps) {
        //     super (props);
        // }
 
        render = (): JSX.Element => {

            return (
                <>
                    <button 
                        onClick={()=>this.props.guessCard(this.props.cardName)}
                    >
                        {this.props.cardName}
                    </button>
                    <br/>
                </>
            );
        }
}

//combine with connector and export
export default connector(ChoiceButton);
