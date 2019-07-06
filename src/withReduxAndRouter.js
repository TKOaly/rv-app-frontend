import { ConnectedRouter } from 'connected-react-router';
import { Provider } from 'react-redux';
import { history, store } from './reducers/store';
import React from 'react';

const withReduxAndRouter = (story) => (
    <Provider store={store}>
        <ConnectedRouter history={history}>{story()}</ConnectedRouter>
    </Provider>
);

export default withReduxAndRouter;
