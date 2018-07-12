import './styles/LoginForm.css';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { errorMessage } from '../../reducers/notificationReducer';
import { loggedIn, loggingIn, loginFailed } from '../../reducers/authenticationReducer';
import React from 'react';
import SuccessBtn from '../buttons/SuccessBtn';
import userService from '../../services/userService';

class LoginForm extends React.Component {
    componentDidMount = () => {
        this.usernameField.getRenderedComponent().focus();
    };

    handleUsernameKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            this.passwordField.getRenderedComponent().focus();
        }
    };

    handleSubmit = (values) => {
        this.tryLogin(values);
    };

    tryLogin = async (values) => {
        // Set loggingIn
        this.props.loggingIn();
        // Try to login
        try {
            const res = await userService.authenticate({
                username: values.username,
                password: values.password
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
                this.usernameField.getRenderedComponent().focus();
                // Send error message
                this.props.errorMessage('Unknown error while logging in.', 2500);
            }
        } catch (err) {
            // Reset form
            this.props.reset();
            // Send login failed
            this.props.loginFailed();
            // Focus username input
            this.usernameField.getRenderedComponent().focus();
            // Send error message
            const errorResponse = err.response;
            if (errorResponse.status === 500 || errorResponse.status === 404) {
                // Server error
                this.props.errorMessage('Server error', 2500);
            } else if (errorResponse.status === 403 || errorResponse.status === 400) {
                // Validation error
                this.props.errorMessage(errorResponse.data.message, 2500);
            }
        }
    };

    usernameRef = (field) => {
        this.usernameField = field;
    };

    passwordRef = (field) => {
        this.passwordField = field;
    };

    render = () => {
        return (
            <div className="form form-shadow loginForm">
                <form onSubmit={this.props.handleSubmit(this.handleSubmit)}>
                    <legend>Log in</legend>
                    <div className="formControl">
                        <Field
                            name="username"
                            component="input"
                            type="text"
                            id="username"
                            placeholder="Username"
                            autoComplete="off"
                            autoCorrect="off"
                            autoCapitalize="off"
                            className="input fullWidth"
                            onKeyDown={this.handleUsernameKeyDown}
                            ref={this.usernameRef}
                            withRef
                        />
                    </div>
                    <div className="formControl">
                        <Field
                            name="password"
                            component="input"
                            type="password"
                            id="password"
                            placeholder="Password"
                            autoComplete="off"
                            autoCorrect="off"
                            autoCapitalize="off"
                            className="input fullWidth"
                            ref={this.passwordRef}
                            withRef
                        />
                    </div>
                    <div className="formControl">
                        <SuccessBtn type="submit" fill loader={this.props.isLoggingIn} style={{ width: '100%' }}>
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

const mapStateToProps = (state) => {
    return {
        isLoggingIn: state.authentication.isLoggingIn
    };
};

const mapDispatchToProps = {
    loggingIn,
    loggedIn,
    errorMessage,
    loginFailed
};

export default reduxForm({
    form: 'login'
})(connect(mapStateToProps, mapDispatchToProps)(LoginForm));
