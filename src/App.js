import { Redirect, Route, BrowserRouter as Router } from 'react-router-dom';
import { connect } from 'react-redux';
import LoginPage from './components/pages/LoginPage';
import MainPage from './components/pages/MainPage';
import ModalContainer from './components/modals/ModalContainer';
import NotificationDrawer from './components/helpers/NotificationDrawer';
import React from 'react';
import RegistrationPage from './components/pages/RegistrationPage';

const AuthenticatedRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={(props) =>
            rest.authenticated ? (
                <Component {...props} />
            ) : (
                <Redirect
                    to={{
                        pathname: '/login',
                        state: { from: props.location }
                    }}
                />
            )
        }
    />
);

// App component passes notifications and products down the prop tree

export const App = ({ notifications, products, loggedIn }) => (
    <div className="App">
        <NotificationDrawer notifications={notifications} products={products} />
        <Router>
            <div className="pages">
                <AuthenticatedRoute exact path="/" authenticated={loggedIn} component={MainPage} />
                <Route path="/login" authenticated={loggedIn} component={LoginPage} />
                <Route path="/register" authenticated={loggedIn} component={RegistrationPage} />
            </div>
        </Router>
        <ModalContainer />
    </div>
);

const mapStateToProps = (state) => {
    return {
        access_token: state.authentication.access_token,
        loggedIn: state.authentication.loggedIn,
        notifications: state.notification.notifications,
        products: state.notification.purchasedItems
    };
};

export default connect(mapStateToProps)(App);
