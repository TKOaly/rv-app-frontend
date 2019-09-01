import { connect } from 'react-redux';
import { reset } from '../../reducers/userInfoFormReducer';
import ChangePasswordForm from '../forms/ChangePasswordForm';
import EditUserForm from '../forms/EditUserForm';
import React from 'react';
import moneyFormatter from '../../services/moneyFormatter';

class UserInfo extends React.Component {
    componentWillUnmount = () => {
        this.props.resetForms();
    };

    render = () => {
        return (
            <div>
                <table>
                    <tbody>
                        <tr>
                            <th>Username</th>
                            <td>{this.props.username}</td>
                        </tr>
                        <tr>
                            <th>Full name</th>
                            <td>{this.props.fullName}</td>
                        </tr>
                        <tr>
                            <th>Email</th>
                            <td>{this.props.email}</td>
                        </tr>
                        <tr>
                            <th>Money balance</th>
                            <td>{moneyFormatter.centsToString(this.props.moneyBalance)} €</td>
                        </tr>
                    </tbody>
                </table>
                <div>
                    <EditUserForm />
                    <ChangePasswordForm />
                </div>
            </div>
        );
    };
}

const mapStateToProps = (state) => {
    return {
        username: state.user.username,
        fullName: state.user.fullName,
        email: state.user.email,
        moneyBalance: state.user.moneyBalance
    };
};

const mapDispatchToProps = {
    resetForms: reset
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserInfo);
