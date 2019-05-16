import { ConnectedRouter } from 'connected-react-router';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import LoginPage from './components/pages/LoginPage';
import MainPage from './components/pages/MainPage';
import ModalContainer from './components/modals/ModalContainer';
import NotificationDrawer from './components/helpers/NotificationDrawer';
import React from 'react';
import RegistrationPage from './components/pages/RegistrationPage';

class App extends React.Component {
    render = () => {
        const { notifications, purchases, history } = this.props;
        return (
            <div className="App">
                <NotificationDrawer notifications={notifications} purchases={purchases} />
                <ConnectedRouter history={history}>
                    <div className="pages">
                        <Route exact path="/" component={MainPage} />
                        <Route path="/login" component={LoginPage} />
                        <Route path="/register" component={RegistrationPage} />
                    </div>
                </ConnectedRouter>
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
