import React from 'react';
import './styles/LoginForm.css';

import SuccessBtn from './../buttons/SuccessBtn';

import { connect } from 'react-redux';
import { loggingIn, loggedIn, loginFailed } from './../../reducers/authenticationReducer';
import { errorMessage } from './../../reducers/notificationReducer';
import userService from './../../services/userService';
import { handleInputEvent, reset, focusPasswordField, focusUsernameField } from './../../reducers/loginReducer';

import { Link } from 'react-router-dom';

// Remove for something smarter
let timeout;

class LoginForm extends React.Component {
    handleSubmit = (e) => {
        e.preventDefault();
    };

    componentDidMount = () => {
        document.addEventListener('keydown', this.handleKeyPress);
        document.addEventListener('keypress', this.handleKeyPress);
        this.usernameInput.focus();
    };

    componentWillUnmount = () => {
        document.removeEventListener('keydown', this.handleKeyPress);
        document.removeEventListener('keypress', this.handleKeyPress);
        clearTimeout(timeout);
        this.props.reset();
    };

    wait = (timeout) => {
        return new Promise((resolve) => setTimeout(resolve, timeout));
    };

    nextStep = async () => {
        if (this.props.loginStep === 1) {
            this.props.focusPasswordField();
            this.passwordInput.focus();
        } else if (this.props.loginStep === 2) {
            // Set loggingIn
            this.props.loggingIn();
            // Try to login
            try {
                const res = await userService.authenticate({
                    username: this.props.username,
                    password: this.props.password
                });
                // If access token is found, set it and login
                if (res.data.access_token) {
                    this.props.loggedIn(res.data.access_token);
                } else {
                    // Reset form
                    this.props.reset();
                    // Login has failed
                    this.props.loginFailed();
                    // Focus username input
                    this.usernameInput.focus();
                    // Set login step to 1
                    this.props.focusUsernameField();
                    // Send error message
                    this.props.errorMessage('Unknown error while logging in.', 2500);
                }
            } catch (err) {
                // Error response
                const errorResponse = err.response;
                // Reset form
                this.props.reset();
                // Send login failed
                this.props.loginFailed();
                // Focus username input
                this.usernameInput.focus();
                this.props.focusUsernameField();
                // Server error
                if (errorResponse.status === 500) {
                    this.props.errorMessage('Server error', 2500);
                } else if (errorResponse.status === 403 || errorResponse.status === 400) {
                    // Validation error
                    this.props.errorMessage(errorResponse.data.message, 2500);
                }
            }
        }
    };

    handleKeyPress = (event) => {
        switch (event.keyCode) {
            case 13:
                event.preventDefault();
                this.nextStep();
                break;
            case 9:
                event.preventDefault();
                this.nextStep();
                break;
            default:
                break;
        }
    };

    render = () => {
        return (
            <div className={this.props.shadow ? 'form form-shadow loginForm' : 'form loginForm'}>
                <form onSubmit={this.handleSubmit}>
                    <legend>Log in</legend>
                    <div className="formControl">
                        <input
                            type="text"
                            id="username"
                            name="username"
                            placeholder="Username"
                            value={this.props.username}
                            onChange={(event) => this.props.handleInputEvent(event)}
                            onKeyDown={this.handleKeyUp}
                            autoComplete="off"
                            autoCorrect="off"
                            autoCapitalize="off"
                            className="input fullWidth"
                            disabled={this.props.usernameDisabled}
                            ref={(input) => {
                                this.usernameInput = input;
                            }}
                        />
                    </div>
                    <div className="formControl">
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Password"
                            value={this.props.password}
                            onChange={(event) => this.props.handleInputEvent(event)}
                            onKeyDown={this.handleKeyUp}
                            className="input fullWidth"
                            autoComplete="off"
                            autoCorrect="off"
                            autoCapitalize="off"
                            disabled={this.props.passwordDisabled}
                            ref={(input) => {
                                this.passwordInput = input;
                            }}
                        />
                    </div>
                    <div className="formControl">
                        <SuccessBtn
                            fill
                            loader={this.props.isLoggingIn}
                            disabled={
                                !(
                                    !this.props.submitDisabled &&
                                    this.props.password.length > this.props.minPasswordLength
                                )
                            }
                            style={{ width: '100%' }}
                        >
                            Log in (ENTER)
                        </SuccessBtn>
                    </div>
                </form>
                <div>
                    <Link to="/register">New user? Register here!</Link>
                </div>
            </div>
        );
    };
}

const mapDispatchToProps = {
    reset,
    handleInputEvent,
    focusPasswordField,
    focusUsernameField,
    loggingIn,
    loggedIn,
    errorMessage,
    loginFailed
};

const mapStateToProps = (state) => {
    return {
        username: state.login.username,
        password: state.login.password,
        minPasswordLength: state.login.minPasswordLength,
        loginStep: state.login.loginStep,
        usernameDisabled: state.login.usernameDisabled,
        passwordDisabled: state.login.passwordDisabled,
        submitDisabled: state.login.submitDisabled,
        isLoggingIn: state.authentication.isLoggingIn
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
