import './styles/LoginForm.scss';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {
    setFormPassword,
    setFormUsername,
    tryLogin
} from '../../reducers/authenticationReducer';
import React from 'react';
import ReactDOM from 'react-dom';
import SuccessBtn from '../buttons/SuccessBtn';

class LoginForm extends React.Component {

    usernameRef = React.createRef();
    passwordRef = React.createRef();

    componentDidMount() {
        if (this.usernameRef.current !== null) {
            ReactDOM.findDOMNode(this.usernameRef.current).focus();
        }
    }

    componentDidUpdate(prevProps) {
    // If login failed, focus username field again
        if (prevProps.isLoggingIn && !this.props.isLoggingIn) {
            if(this.usernameRef.current !== null) {
                ReactDOM.findDOMNode(this.usernameRef.current).focus();
            }
        }
    }

  handleUsernameKeyDown = (event) => {
      if (event.key === 'Enter') {
          event.preventDefault();
          if (this.props.username === '') {
              this.props.errorMessage('Username cannot be empty');
          } else {
              if (this.passwordRef.current !== null) {
                  ReactDOM.findDOMNode(this.passwordRef.current).focus();
              }
          }
      }
  };

  handleSubmit = (event) => {
      event.preventDefault();
      const { username, password, tryLogin } = this.props;
      tryLogin(username, password);
  };

  resetForm() {
      this.setState({ username: '', password: '' });
      if (this.usernameRef.current !== null) {
          ReactDOM.findDOMNode(this.usernameRef.current).focus();
      }
  }

  handleUsernameChange = (event) => {
      event.preventDefault();
      this.props.setFormUsername(event.target.value);
  };

  handlePasswordChange = (event) => {
      event.preventDefault();
      this.props.setFormPassword(event.target.value);
  };

  render = () => {
      const { username, password, isLoggingIn } = this.props;
      return (
          <div className="form form-shadow loginForm">
              <form onSubmit={this.handleSubmit}>
                  <legend>Log in</legend>
                  <div className="formControl">
                      <input
                          name="username"
                          type="text"
                          id="username"
                          placeholder="Username"
                          autoComplete="off"
                          autoCorrect="off"
                          autoCapitalize="off"
                          className="input fullWidth"
                          onKeyDown={this.handleUsernameKeyDown}
                          onChange={this.handleUsernameChange}
                          disabled={isLoggingIn}
                          ref={this.usernameRef}
                          value={username}
                      />
                  </div>
                  <div className="formControl">
                      <input
                          name="password"
                          type="password"
                          id="password"
                          placeholder="Password"
                          autoComplete="off"
                          autoCorrect="off"
                          autoCapitalize="off"
                          className="input fullWidth"
                          ref={this.passwordRef}
                          onChange={this.handlePasswordChange}
                          disabled={isLoggingIn}
                          value={password}
                      />
                  </div>
                  <div className="formControl">
                      <SuccessBtn
                          type="submit"
                          fill
                          loader={isLoggingIn}
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

const mapStateToProps = (state) => {
    return {
        isLoggingIn: state.authentication.isLoggingIn,
        username: state.authentication.formUsername,
        password: state.authentication.formPassword
    };
};

const mapDispatchToProps = {
    tryLogin,
    setFormUsername,
    setFormPassword
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginForm);
