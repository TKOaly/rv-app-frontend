import './styles/LoginForm.css';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { tryLogin } from '../../reducers/authenticationReducer';
import React from 'react';
import SuccessBtn from '../buttons/SuccessBtn';

class LoginForm extends React.Component {
    componentDidMount = () => {
        this.usernameField.getRenderedComponent().focus();
    };

    componentDidUpdate = (prevProps) => {
        // If login failed, focus username field again
        if (prevProps.isLoggingIn && !this.props.isLoggingIn) {
            this.usernameField.getRenderedComponent().focus();
        }
    };

    handleUsernameKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            this.passwordField.getRenderedComponent().focus();
        }
    };

    handleSubmit = (values) => {
        this.props.tryLogin(values.username, values.password);
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
    tryLogin
};

export default reduxForm({
    form: 'login'
})(connect(mapStateToProps, mapDispatchToProps)(LoginForm));
