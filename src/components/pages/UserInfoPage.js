import { AutoLogout } from '../helpers/AutoLogout';
import { connect } from 'react-redux';
import { doLogout } from '../../reducers/authenticationReducer';
import { replace } from 'connected-react-router';
import DepositHistory from '../sections/DepositHistory';
import PurchaseHistory from '../sections/PurchaseHistory';
import React from 'react';
import UserHeader from '../sections/UserHeader';

class UserInfoPage extends React.Component {
    componentDidMount = () => {
        if (!this.props.loggedIn) {
            /* If not logged in, go to login page instead. */
            this.props.replace('/login');
        }
    };

    handleLogout = () => {
        this.props.doLogout();
    };

    render = () => {
        return (
            <div className="userinfopage">
                <UserHeader />
                <div>
                    <div>UserInfo</div>
                    <DepositHistory />
                    <PurchaseHistory />
                </div>
                <AutoLogout
                    logUserOut={this.handleLogout}
                    timerMs={Number(process.env.REACT_APP_AUTO_LOGOUT_SECONDS || 60) * 1000}
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
    doLogout
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserInfoPage);
