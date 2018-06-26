import React, { Component } from 'react';
import MainPage from './components/pages/MainPage';
import LoginPage from './components/pages/LoginPage';
import RegistrationPage from './components/pages/RegistrationPage';
import NotificationDrawer from './components/helpers/NotificationDrawer';
import ModalContainer from './components/modals/ModalContainer';

import { connect } from 'react-redux';

import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

const AuthenticatedRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>
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

class App extends Component {
    render = () => {
        // let page = this.props.loggedIn ? <MainPage /> : <LoginPage />;
        return (
            <div className="App">
                <NotificationDrawer
                    notifications={this.props.notifications}
                    products={this.props.products}
                />
                <Router>
                    <div className="pages">
                        <AuthenticatedRoute
                            exact
                            path="/"
                            authenticated={this.props.loggedIn}
                            component={MainPage}
                        />
                        <Route path="/login" component={LoginPage} />
                        <Route path="/register" component={RegistrationPage} />
                    </div>
                </Router>
                <ModalContainer />
            </div>
        );
    };
}

const mapStateToProps = state => {
    return {
        access_token: state.authentication.access_token,
        loggedIn: state.authentication.loggedIn,
        notifications: state.notification.notifications,
        products: state.notification.purchasedItems
    };
};

export default connect(mapStateToProps)(App);
