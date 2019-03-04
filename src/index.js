import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from 'redux-thunk';
import {Provider} from "react-redux";
import { BrowserRouter } from 'react-router-dom';

import * as serviceWorker from './serviceWorker';

import './index.css';
import App from './App';
import reducer from './Reducers/IndexReducer';

const store = createStore( reducer, composeWithDevTools(applyMiddleware(thunk)));

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);

serviceWorker.unregister();
