import { clearProductsFromNotification } from '../../reducers/notificationReducer';
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
        const notificationInterval = setInterval(() => {
            if (this.props.purchaseNotificationStartTime != null) {
                const delta = new Date().getTime() - this.props.purchaseNotificationStartTime.getTime();
                if (delta > this.props.purchaseNotificationTimeout) {
                    this.props.clearProductsFromNotification();
                }
            }
        }, 100);
        this.setState({ notificationInterval });
        this.props.getProducts(this.props.token);
        this.props.getCategories(this.props.token);
    };

    componentWillUnmount = () => {
        clearInterval(this.state.notificationInterval);
        this.setState({ notificationInterval: null });
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
        purchaseNotificationTimeout: state.notification.purchaseNotificationTimeout,
        purchaseNotificationStartTime: state.notification.purchaseNotificationStartTime,
        user: state.user
    };
};

const mapDispatchToProps = {
    logout,
    clearProductsFromNotification,
    getProducts,
    getCategories
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MainPage);
