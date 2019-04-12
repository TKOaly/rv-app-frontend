import './styles/LoginForm.scss';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { tryLogin } from '../../reducers/authenticationReducer';
import React from 'react';
import ReactDOM from 'react-dom';
import SuccessBtn from '../buttons/SuccessBtn';

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.usernameRef = React.createRef();
        this.passwordRef = React.createRef();
    }

    componentDidMount() {
        ReactDOM.findDOMNode(this.usernameRef.current).focus();
    }

    componentDidUpdate(prevProps) {
        // If login failed, focus username field again
        if (prevProps.isLoggingIn && !this.props.isLoggingIn) {
            ReactDOM.findDOMNode(this.usernameRef.current).focus();
        }
    }

    handleUsernameKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            ReactDOM.findDOMNode(this.passwordRef.current).focus();
        }
    };

    handleSubmit = (values) => {
        const username = values.username ? values.username : '';
        const password = values.password ? values.password : '';
        this.props.tryLogin(username, password);
    };

    render() {
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
    }
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
})(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(LoginForm)
);
