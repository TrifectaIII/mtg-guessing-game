import * as React from 'react';
import {connect, ConnectedProps} from 'react-redux';

//get global state from redux
import {GlobalState} from './redux/store';

//get components
import ExampleComponent from './components/ExampleComponent';

import './App.css';


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
                    <h1>React-Redux Template</h1>
                    <ExampleComponent/>
                </div>
            );
        }
}

//combine with connector and export
export default connector(App);
