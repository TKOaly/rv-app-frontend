import { ConnectedRouter } from 'connected-react-router';
import { Route } from 'react-router-dom';
import LoginPage from './components/pages/LoginPage';
import MainPage from './components/pages/MainPage';
import ModalContainer from './components/helpers/ModalContainer';
import NotificationDrawer from './components/helpers/NotificationDrawer';
import React from 'react';
import RegistrationPage from './components/pages/RegistrationPage';

class App extends React.Component {
    render = () => {
        return (
            <div className="App">
                <NotificationDrawer />
                <ConnectedRouter history={this.props.history}>
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

export default App;
