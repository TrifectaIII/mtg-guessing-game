import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import reportWebVitals from './reportWebVitals';
import {Provider} from 'react-redux';

//access redux store
import store from './redux/store';

//access main application component
import App from './App';

import './index.scss';


//render whole app, while providing store to components
ReactDOM.render(

    <React.StrictMode>

        <Provider store={store}>
            <App />
        </Provider>

    </React.StrictMode>,

    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
