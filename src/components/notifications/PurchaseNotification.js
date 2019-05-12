import './styles/PurchaseNotification.scss';
import { Fade } from '../animations/Animations';
import { TransitionGroup } from 'react-transition-group';
import React from 'react';
import SuccessNotification from './SuccessNotification';
import moneyFormatter from '../../services/moneyFormatter';

const PurchaseNotificationProduct = ({ purchase }) => {
    return (
        <div className="product" key={purchase.product.barcode}>
            {purchase.count} x {purchase.product.name}{' '}
            <b>{moneyFormatter.centsToString(purchase.product.sellPrice * purchase.count)} €</b>
        </div>
    );
};

/**
 * Purchase notification.
 */
const PurchaseNotification = ({ purchases, shadow }) => {
    return (
        <SuccessNotification shadow={shadow}>
            <div className="products">
                <TransitionGroup>
                    {purchases &&
                        purchases.length > 0 &&
                        purchases.map((purchase, id) => (
                            <Fade key={id}>
                                <PurchaseNotificationProduct purchase={purchase} key={purchase.product.barcode} />
                            </Fade>
                        ))}
                </TransitionGroup>
            </div>
        </SuccessNotification>
    );
};

export default PurchaseNotification;
