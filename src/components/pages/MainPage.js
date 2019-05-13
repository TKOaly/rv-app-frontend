import { connect } from 'react-redux';
import { getCategories, getProducts } from '../../reducers/productReducer';
import { logout } from '../../reducers/authenticationReducer';
import Content from '../sections/Content';
import Header from '../sections/Header';
import React from 'react';

class MainPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            notificationInterval: null
        };
    }

    componentDidMount = () => {
        this.props.getProducts(this.props.token);
        this.props.getCategories(this.props.token);
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
        user: state.user
    };
};

const mapDispatchToProps = {
    logout,
    getProducts,
    getCategories
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MainPage);
