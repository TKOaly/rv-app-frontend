import { AutoLogout } from '../helpers/AutoLogout';
import { closeModal } from '../../reducers/modalReducer';
import { connect } from 'react-redux';
import { doLogout } from '../../reducers/authenticationReducer';
import { replace } from 'connected-react-router';
import Content from '../sections/Content';
import Header from '../sections/Header';
import React from 'react';

class MainPage extends React.Component {
    componentDidMount = () => {
        if (!this.props.loggedIn) {
            /* If not logged in, go to login page instead. */
            this.props.replace('/login');
        }
    };

    componentWillUnmount = () => {
        this.props.closeModal();
    };

    handleLogout = () => {
        this.props.doLogout();
    };

    render = () => {
        return (
            <div className="mainpage">
                <Header />
                <Content />
                <AutoLogout
                    logUserOut={this.handleLogout}
                    timerMs={Number(process.env.REACT_APP_AUTO_LOGOUT_SECONDS || 60) * 1000000}
                />
            </div>
        );
    };
}

const mapStateToProps = (state) => {
    return {
        loggedIn: state.authentication.loggedIn
    };
};

const mapDispatchToProps = {
    replace,
    closeModal,
    doLogout
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MainPage);
