import './components/animations/animations.scss';
import './index.scss';
import './reset.scss';
import { Provider } from 'react-redux';
import { history, store } from './reducers/store';
import App from './App';
import React from 'react';
import ReactDOM from 'react-dom';

// Load config
if (process.env.NODE_ENV !== 'production') {
    // Log initial state
    console.log(store.getState());
    console.log('Back-end url: %s', process.env.REACT_APP_BACKEND_URL);
}

ReactDOM.render(
    <Provider store={store}>
        <App history={history} />
    </Provider>,
    document.getElementById('root')
);
