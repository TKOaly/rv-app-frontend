import { connect } from 'react-redux';
import { editUser } from '../../reducers/userReducer';
import { errorMessage } from '../../reducers/notificationReducer';
import { setEmail, setFullName, setUsername } from '../../reducers/userInfoFormReducer';
import React from 'react';
import SuccessBtn from '../buttons/SuccessBtn';

class EditUserForm extends React.Component {
    componentDidMount = () => {
        this.props.setFormUsername(this.props.username);
        this.props.setFormFullName(this.props.fullName);
        this.props.setFormEmail(this.props.email);
    };

    handleSubmit = (event) => {
        event.preventDefault();

        if (
            this.props.username === this.props.formUsername &&
            this.props.fullName === this.props.formFullName &&
            this.props.email === this.props.formEmail
        ) {
            this.props.errorMessage('Nothing was changed');
            return;
        }

        const editedUserFields = {};

        if (this.props.username !== this.props.formUsername) {
            editedUserFields.username = this.props.formUsername;
        }
        if (this.props.fullName !== this.props.formFullName) {
            editedUserFields.fullName = this.props.formFullName;
        }
        if (this.props.email !== this.props.formEmail) {
            editedUserFields.email = this.props.formEmail;
        }

        this.props.editUser(this.props.token, editedUserFields);
    };

    handleUsernameChange = (event) => {
        this.props.setFormUsername(event.target.value);
    };
    handleFullNameChange = (event) => {
        this.props.setFormFullName(event.target.value);
    };
    handleEmailChange = (event) => {
        this.props.setFormEmail(event.target.value);
    };

    render = () => {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <legend>Edit your account</legend>
                    <div>
                        <label>Username</label>
                        <input
                            type="text"
                            placeholder="Username"
                            value={this.props.formUsername}
                            onChange={this.handleUsernameChange}
                        />
                    </div>
                    <div>
                        <label>Full name</label>
                        <input
                            type="text"
                            placeholder="Full name"
                            value={this.props.formFullName}
                            onChange={this.handleFullNameChange}
                        />
                    </div>
                    <div>
                        <label>Email</label>
                        <input
                            type="email"
                            placeholder="Email"
                            value={this.props.formEmail}
                            onChange={this.handleEmailChange}
                        />
                    </div>
                    <div>
                        <SuccessBtn type="submit" fill>
                            Submit
                        </SuccessBtn>
                    </div>
                </form>
            </div>
        );
    };
}

const mapStateToProps = (state) => {
    return {
        username: state.user.username,
        fullName: state.user.fullName,
        email: state.user.email,
        token: state.authentication.access_token,
        formUsername: state.userInfoForm.username,
        formFullName: state.userInfoForm.fullName,
        formEmail: state.userInfoForm.email
    };
};

const mapDispatchToProps = {
    editUser,
    setFormUsername: setUsername,
    setFormFullName: setFullName,
    setFormEmail: setEmail,
    errorMessage
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EditUserForm);
