import React, { Component } from 'react';
import Header from '../sections/Header';
import Content from '../sections/Content';
import { connect } from 'react-redux';
import { logout } from './../../reducers/authenticationReducer';
import {
    successMessage,
    errorMessage,
    addProductToNotification,
    clearProductsFromNotification
} from './../../reducers/notificationReducer';
import {
    increaseBalance,
    decreaseBalance,
    resetUserData
} from './../../reducers/userReducer';
import { getProducts, getCategories } from './../../reducers/productReducer';
import userService from '../../services/userService';
import { closeModal, showModal } from '../../reducers/modalReducer';
import Deposit from '../sections/Deposit';

class MainPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            timeoutHandler: null,
            notificationInterval: null
        };
        this.buy = this.buy.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    handleKeyPress(event) {
        switch (event.keyCode) {
        // Enter
        case 13:
            if (
                this.props.terminalInput === '' &&
                    this.props.filter === ''
            ) {
                this.props.resetUserData();
                this.props.logout();
            }
            break;
            // D
        case 100:
            event.preventDefault();
            this.props.showModal(Deposit, {
                closeModal: this.props.closeModal
            });
            break;
        default:
            break;
        }
    }

    componentDidMount() {
        const notificationInterval = setInterval(() => {
            if (this.props.purchaseNotificationStartTime != null) {
                const delta =
                    new Date().getTime() -
                    this.props.purchaseNotificationStartTime.getTime();
                if (delta > this.props.purchaseNotificationTimeout) {
                    this.props.clearProductsFromNotification();
                }
            }
        }, 100);
        this.setState({ notificationInterval });
        document.addEventListener('keypress', this.handleKeyPress);
        this.props.getProducts();
        this.props.getCategories();
    }

    componentWillUnmount() {
        clearInterval(this.state.notificationInterval);
        this.setState({ notificationInterval: null });
        document.removeEventListener('keypress', this.handleKeyPress);
    }

    /**
     * Buys a product.
     */
    async buy(product) {
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
    }

    show() {
        return event => {
            event.preventDefault();
            this.props.toggleVisibility(this.props.modalVisibility);
        };
    }

    render() {
        return (
            <div className="mainpage">
                <Header logout={this.props.logout} user={this.props.user} />
                <Content />
            </div>
        );
    }
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
    closeModal,
    showModal,
    getCategories
};

const mapStateToProps = state => {
    return {
        token: state.authentication.access_token,
        purchaseNotificationTimeout:
            state.notification.purchaseNotificationTimeout,
        purchaseNotificationStartTime:
            state.notification.purchaseNotificationStartTime,
        user: state.user,
        terminalInput: state.terminal.terminalInput,
        filter: state.products.filter,
        modalVisibility: state.modal.modalVisibility
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
