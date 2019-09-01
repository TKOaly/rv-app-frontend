import { connect } from 'react-redux';
import ChangePasswordForm from '../forms/ChangePasswordForm';
import EditUserForm from '../forms/EditUserForm';
import React from 'react';
import moneyFormatter from '../../services/moneyFormatter';

class UserInfo extends React.Component {
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

export default connect(mapStateToProps)(UserInfo);
