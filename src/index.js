import './components/animations/animations.scss';
import './index.scss';
import './reset.scss';
import { Provider } from 'react-redux';
import { store } from './store';
import App from './App';
import React from 'react';
import ReactDOM from 'react-dom';

if (process.env.NODE_ENV !== 'production') {
    // Log initial state
    // eslint-disable-next-line no-console
    console.log(store.getState());
    // eslint-disable-next-line no-console
    console.log('Back-end url: %s', process.env.REACT_APP_BACKEND_URL);
}

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
