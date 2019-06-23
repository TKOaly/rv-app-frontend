import { connect } from 'react-redux';
import React from 'react';
import dateFormatter from '../../services/dateFormatter';
import moneyFormatter from '../../services/moneyFormatter';

class DepositHistory extends React.Component {
    render = () => {
        return (
            <div>
                <table>
                    <caption>Deposits</caption>
                    <thead>
                        <tr>
                            <th>Time</th>
                            <th>Amount</th>
                            <th>Change</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.depositHistory.map((deposit) => (
                            <tr>
                                <td>{dateFormatter.dateStringToHumanReadable(deposit.time)}</td>
                                <td>{moneyFormatter.centsToString(deposit.amount)} €</td>
                                <td>
                                    {moneyFormatter.centsToString(deposit.balanceAfter - deposit.amount)} € ->{' '}
                                    {moneyFormatter.centsToString(deposit.balanceAfter)} €
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    };
}

const mapStateToProps = (state) => {
    return {
        depositHistory: state.history.depositHistory
    };
};

export default connect(mapStateToProps)(DepositHistory);
