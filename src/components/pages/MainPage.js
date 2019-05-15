import { connect } from 'react-redux';
import { getCategories, getProducts } from '../../reducers/productReducer';
import { logout } from '../../reducers/authenticationReducer';
import { replace } from 'connected-react-router';
import Content from '../sections/Content';
import Header from '../sections/Header';
import React from 'react';

class MainPage extends React.Component {
    componentDidMount = () => {
        if (!this.props.loggedIn) {
            /* If not logged in, go to login page instead. */
            this.props.replace('/login');
        } else {
            this.props.getProducts(this.props.token);
            this.props.getCategories(this.props.token);
        }
    };

    componentWillUnmount = () => {
        if (this.props.loggedIn) {
            this.props.logout();
        }
    };

    render = () => {
        return (
            <div className="mainpage">
                <Header logout={this.props.logout} user={this.props.user} />
                <Content />
            </div>
        );
    };
}

const mapStateToProps = (state) => {
    return {
        token: state.authentication.access_token,
        user: state.user,
        loggedIn: state.authentication.loggedIn
    };
};

const mapDispatchToProps = {
    logout,
    getProducts,
    getCategories,
    replace
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MainPage);
