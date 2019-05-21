import { connect } from 'react-redux';
import { replace } from 'connected-react-router';
import React from 'react';
import UserHeader from '../sections/UserHeader';

class UserInfoPage extends React.Component {
    componentDidMount = () => {
        if (!this.props.loggedIn) {
            /* If not logged in, go to login page instead. */
            this.props.replace('/login');
        }
    };

    render = () => {
        return (
            <div class="userinfopage">
                <UserHeader />
                <div>
                    <div>UserInfo</div>
                    <div>DepositHistory</div>
                    <div>PurchaseHistory</div>
                </div>
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
    replace
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserInfoPage);
