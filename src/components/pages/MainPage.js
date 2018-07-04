import {
    addProductToNotification,
    clearProductsFromNotification,
    errorMessage,
    successMessage
} from '../../reducers/notificationReducer';
import { connect } from 'react-redux';
import { decreaseBalance, increaseBalance, resetUserData } from '../../reducers/userReducer';
import { getCategories, getProducts } from '../../reducers/productReducer';
import { logout } from '../../reducers/authenticationReducer';
import Content from '../sections/Content';
import Header from '../sections/Header';
import React from 'react';
import userService from '../../services/userService';

class MainPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            timeoutHandler: null,
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
        this.props.getProducts();
        this.props.getCategories();
    };

    componentWillUnmount = () => {
        clearInterval(this.state.notificationInterval);
        this.setState({ notificationInterval: null });
    };

    /**
     * Buys a product.
     */
    buy = async (product) => {
        try {
            await userService.reduceBalance(this.props.token, product.price);

            // If timeout is set, clear it to prevent notification from disappearing
            if (this.state.timeoutHandler) {
                clearTimeout(this.state.timeoutHandler);
                this.setState({ timeoutHandler: null });
            }

            this.props.decreaseBalance(product.price);

            // Add product to notification
            this.props.addProductToNotification(product);

            // Create a new timeout
            const timeoutHandler = setTimeout(
                () => this.props.clearProductsFromNotification(),
                this.props.purchaseNotificationTimeout
            );
            this.setState({
                timeoutHandler
            });
        } catch (error) {
            const errorResponse = error.response;
            this.props.errorMessage(errorResponse.data.message);
        }
    };

    show = () => {
        return (event) => {
            event.preventDefault();
            this.props.toggleVisibility(this.props.modalVisibility);
        };
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

const mapDispatchToProps = {
    successMessage,
    errorMessage,
    logout,
    addProductToNotification,
    clearProductsFromNotification,
    increaseBalance,
    decreaseBalance,
    resetUserData,
    getProducts,
    getCategories
};

const mapStateToProps = (state) => {
    return {
        token: state.authentication.access_token,
        purchaseNotificationTimeout: state.notification.purchaseNotificationTimeout,
        purchaseNotificationStartTime: state.notification.purchaseNotificationStartTime,
        user: state.user,
        terminalInput: state.terminal.terminalInput,
        filter: state.products.filter,
        modalVisibility: state.modal.modalVisibility
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
