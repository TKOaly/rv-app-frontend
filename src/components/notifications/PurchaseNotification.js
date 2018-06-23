import React from 'react';
import './styles/PurchaseNotification.css';
import SuccessNotification from './SuccessNotification';

import { TransitionGroup } from 'react-transition-group';

import { Fade } from './../animations/Animations';
import moneyFormatter from './../../services/moneyFormatter';

const PurchaseNotificationProduct = ({ product }) => {
    return (
        <div className="product" key={product.barcode}>
            {product.quantity} x {product.product_name}{' '}
            <b>
                {moneyFormatter.centsToString(product.price * product.quantity)}{' '}
                €
            </b>
        </div>
    );
};

/**
 * Purchase notification.
 */
const PurchaseNotification = ({ products, shadow }) => {
    return (
        <SuccessNotification shadow={shadow}>
            <div className="products">
                <TransitionGroup>
                    {products &&
                        products.length > 0 &&
                        products.map((product, id) => (
                            <Fade key={id}>
                                <PurchaseNotificationProduct
                                    product={product}
                                    key={product.barcode}
                                />
                            </Fade>
                        ))}
                </TransitionGroup>
            </div>
        </SuccessNotification>
    );
};

export default PurchaseNotification;
