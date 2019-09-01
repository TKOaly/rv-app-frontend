import { connect } from 'react-redux';
import { errorMessage, successMessage } from '../../reducers/notificationReducer';
import { setPassword, setPasswordAgain } from '../../reducers/userInfoFormReducer';
import React from 'react';
import SuccessBtn from '../buttons/SuccessBtn';
import userService from '../../services/userService';

class ChangePasswordForm extends React.Component {
    componentDidMount = () => {
        this.props.setFormPassword('');
        this.props.setFormPasswordAgain('');
    };

    handleSubmit = async (event) => {
        event.preventDefault();

        if (this.props.formPassword !== this.props.formPasswordAgain) {
            this.props.errorMessage('Passwords do not match');
            return;
        }

        const newPassword = this.props.formPassword;

        try {
            await userService.changePassword(this.props.token, newPassword);
            this.props.successMessage('Password changed successfully');
        } catch (err) {
            this.props.errorMessage('Error while changing password: ' + err.response.data.message);
        }

        this.props.setFormPassword('');
        this.props.setFormPasswordAgain('');
    };

    handlePasswordChange = (event) => {
        this.props.setFormPassword(event.target.value);
    };
    handlePasswordAgainChange = (event) => {
        this.props.setFormPasswordAgain(event.target.value);
    };

    render = () => {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <legend>Change password</legend>
                    <div>
                        <label>New password</label>
                        <input
                            type="password"
                            placeholder="New password"
                            value={this.props.formPassword}
                            onChange={this.handlePasswordChange}
                        />
                    </div>
                    <div>
                        <label>New password again</label>
                        <input
                            type="password"
                            placeholder="New password again"
                            value={this.props.formPasswordAgain}
                            onChange={this.handlePasswordAgainChange}
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
        token: state.authentication.access_token,
        formPassword: state.userInfoForm.password,
        formPasswordAgain: state.userInfoForm.passwordAgain
    };
};

const mapDispatchToProps = {
    setFormPassword: setPassword,
    setFormPasswordAgain: setPasswordAgain,
    errorMessage,
    successMessage
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ChangePasswordForm);
