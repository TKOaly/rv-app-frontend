import './styles/LoginForm.scss';
import './styles/RegisterForm.scss';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { tryRegister } from '../../reducers/registerReducer';
import React from 'react';
import SuccessBtn from '../buttons/SuccessBtn';
import validator from 'validator';

const required = (value) => (value ? undefined : 'Field is required');

const passwordLength = (value) => (value && value.length < 12 ? 'Consider using a stronger password' : undefined);

const email = (value) => (value && !validator.isEmail(value) ? 'Invalid E-mail address' : undefined);

const passwordsMatch = (value, allValues) => (value !== allValues.password ? 'Passwords do not match' : undefined);

const renderField = ({ input, label, type, className, inputRef, meta: { touched, error, warning }, ...props }) => (
    <div>
        <label>{label}</label>
        <div>
            <input
                {...input}
                placeholder={label}
                type={type}
                {...props}
                ref={inputRef}
                className={className + (touched && error ? ' error-field' : '')}
            />
            {touched &&
                ((error && <span className="error-msg">{error}</span>) ||
                    (warning && <span className="warning-msg">{warning}</span>))}
        </div>
    </div>
);

class RegisterForm extends React.Component {
    componentDidMount = () => {
        this.usernameInput.focus();
    };

    handleSubmit = (values) => {
        this.props.tryRegister({
            username: values.username ? values.username : '',
            password: values.password ? values.password : '',
            email: values.email ? values.email : '',
            realname: values.realname ? values.realname : ''
        });
    };

    usernameRef = (input) => {
        this.usernameInput = input;
    };

    render = () => {
        return (
            <form onSubmit={this.props.handleSubmit(this.handleSubmit)} className="form form-shadow loginForm">
                <legend>
                    Register &nbsp;&nbsp;&nbsp;<span style={{ fontSize: 13 }}>Tip: Use TAB to change form fields</span>
                </legend>
                <div className="formControl">
                    <Field
                        name="username"
                        component={renderField}
                        type="text"
                        id="registerUsername"
                        placeholder="Username"
                        autoComplete="off"
                        autoCorrect="off"
                        autoCapitalize="off"
                        className="input fullWidth"
                        inputRef={this.usernameRef}
                        validate={required}
                    />
                </div>
                <div className="formControl">
                    <Field
                        name="email"
                        component={renderField}
                        type="email"
                        id="registerEmail"
                        placeholder="E-mail address"
                        autoComplete="off"
                        autoCorrect="off"
                        autoCapitalize="off"
                        className="input fullWidth"
                        validate={[required, email]}
                    />
                </div>
                <div className="formControl">
                    <Field
                        name="realname"
                        component={renderField}
                        type="text"
                        id="registerRealname"
                        placeholder="First name and last name"
                        autoComplete="off"
                        autoCorrect="off"
                        autoCapitalize="off"
                        className="input fullWidth"
                        validate={[required]}
                    />
                </div>
                <div className="formControl">
                    <Field
                        name="password"
                        component={renderField}
                        type="password"
                        id="registerPassword"
                        placeholder="Password"
                        autoComplete="off"
                        autoCorrect="off"
                        autoCapitalize="off"
                        className="input fullWidth"
                        validate={required}
                        warn={passwordLength}
                    />
                </div>
                <div className="formControl">
                    <Field
                        name="passwordAgain"
                        component={renderField}
                        type="password"
                        id="registerPasswordConfirm"
                        placeholder="Password again"
                        autoComplete="off"
                        autoCorrect="off"
                        autoCapitalize="off"
                        className="input fullWidth"
                        validate={[required, passwordsMatch]}
                    />
                </div>
                <div className="formControl">
                    <SuccessBtn type="submit" fill loader={this.props.registering} style={{ width: '100%' }}>
                        Register (ENTER)
                    </SuccessBtn>
                </div>
                <div style={{ textAlign: 'center' }}>
                    <Link to="/" className="backbutton">
                        Back to login page
                    </Link>
                </div>
            </form>
        );
    };
}

const mapStateToProps = (state) => {
    return {
        registering: state.register.registering
    };
};

const mapDispatchToProps = {
    tryRegister
};

export default reduxForm({
    form: 'register'
})(connect(mapStateToProps, mapDispatchToProps)(RegisterForm));
