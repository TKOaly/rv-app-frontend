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

class App extends React.Component {
    render = () => {
        // let page = this.props.loggedIn ? <MainPage /> : <LoginPage />;
        return (
            <div className="App">
                <NotificationDrawer notifications={this.props.notifications} purchases={this.props.purchases} />
                <Router>
                    <div className="pages">
                        <AuthenticatedRoute exact path="/" authenticated={this.props.loggedIn} component={MainPage} />
                        <Route path="/login" component={LoginPage} />
                        <Route path="/register" component={RegistrationPage} />
                    </div>
                </Router>
                <ModalContainer />
            </div>
        );
    };
}

const mapStateToProps = (state) => {
    return {
        access_token: state.authentication.access_token,
        loggedIn: state.authentication.loggedIn,
        notifications: state.notification.notifications,
        purchases: state.notification.purchasedItems
    };
};

export default connect(mapStateToProps)(App);
