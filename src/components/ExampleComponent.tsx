import * as React from 'react';
import {connect, ConnectedProps} from 'react-redux';

//get global state from redux
import {GlobalState} from '../redux/store';

//get dispatch actions
import {add, subtract, change} from '../redux/reducers/exampleReducer/actions';

import './ExampleComponent.css';


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
        counter: state.exampleReducer.counter,
    }
}

//add dispatch actions to props
const mapDispatchToProps = {
   add, subtract, change,
}

//combine into connector to redux store, and get type
const connector = connect(mapStateToProps, mapDispatchToProps);
type ReduxProps = ConnectedProps<typeof connector>;

//type of component props is intersection of non-redux and redux props
type ExampleComponentProps = OwnProps & ReduxProps;


//STATE
///////////////////////////////////////////////////////

//type of internal component state
interface ExampleComponentState {
    inputValue: string
}


//CLASS
///////////////////////////////////////////////////////

//create component using types
class ExampleComponent 
    extends React.Component 
    <ExampleComponentProps, ExampleComponentState> {

        constructor (props: ExampleComponentProps) {
            super (props);

            //construc state using interface
            this.state = {
                inputValue: '0',
            } as ExampleComponentState;
        }

        //input event handler using React typing
        handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
            this.setState({inputValue: event.target.value});
        }

        render = (): JSX.Element => {
            return (
                <div>

                    <button onClick = {this.props.add}>Add</button><br/>

                    <button onClick = {this.props.subtract}>Subtract</button><br/>

                    <input type="number" value={this.state.inputValue} onChange={this.handleChange} />
                    <button onClick={() => this.props.change(this.state.inputValue)}>Change</button>
                    
                    <h2>{this.props.counter}</h2>

                </div>
            );
        }
}

//combine with connector and export
export default connector(ExampleComponent);
