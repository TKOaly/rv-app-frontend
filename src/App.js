import { ConnectedRouter } from 'connected-react-router';
import { Route } from 'react-router-dom';
import LoginPage from './components/pages/LoginPage';
import MainPage from './components/pages/MainPage';
import ModalContainer from './components/helpers/ModalContainer';
import NotificationDrawer from './components/helpers/NotificationDrawer';
import React from 'react';
import RegistrationPage from './components/pages/RegistrationPage';
import UserInfoPage from './components/pages/UserInfoPage';

class App extends React.Component {
    render = () => {
        const { history } = this.props;
        return (
            <div className="App">
                <NotificationDrawer />
                <ConnectedRouter history={history}>
                    <div className="pages">
                        <Route exact path="/" component={MainPage} />
                        <Route path="/user" component={UserInfoPage} />
                        <Route path="/login" component={LoginPage} />
                        <Route path="/register" component={RegistrationPage} />
                    </div>
                </ConnectedRouter>
                <ModalContainer />
            </div>
        );
    };
}

export default App;
