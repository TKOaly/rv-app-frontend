import { connect } from 'react-redux';
import React from 'react';
import dateFormatter from '../../services/dateFormatter';
import moneyFormatter from '../../services/moneyFormatter';

class PurchaseHistory extends React.Component {
    render = () => {
        return (
            <div>
                <table>
                    <caption>Purchases</caption>
                    <thead>
                        <tr>
                            <th>Time</th>
                            <th>Product</th>
                            <th>Price</th>
                            <th>Change</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.purchaseHistory.map((purchase) => (
                            <tr key={purchase.purchaseId}>
                                <td>{dateFormatter.dateStringToHumanReadable(purchase.time)}</td>
                                <td>{purchase.product.name}</td>
                                <td>{moneyFormatter.centsToString(purchase.price)} €</td>
                                <td>
                                    {moneyFormatter.centsToString(purchase.balanceAfter - purchase.price)} € ->{' '}
                                    {moneyFormatter.centsToString(purchase.balanceAfter)} €
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
        purchaseHistory: state.history.purchaseHistory
    };
};

export default connect(mapStateToProps)(PurchaseHistory);
