import './styles/ProductBrowser.css';
import { connect } from 'react-redux';
import { showModal } from '../../reducers/modalReducer';
import ProductPopup from '../modals/ProductPopup';
import React from 'react';
import moneyFormatter from '../../services/moneyFormatter';

class ProductBrowserItem extends React.Component {
    handleClick = (event) => {
        event.preventDefault();
        this.props.showModal(ProductPopup, {
            product: this.props.product
        });
    };

    render = () => {
        return (
            <li className="product-list-item">
                <a role="button" href="/" onClick={this.handleClick}>
                    <span className="product-list-item-name">{this.props.product.product_name}</span>
                    <span className="product-list-item-price">
                        {moneyFormatter.centsToString(this.props.product.sellprice)} €
                    </span>
                </a>
            </li>
        );
    };
}

const mapDispatchToProps = {
    showModal
};

export default connect(null, mapDispatchToProps)(ProductBrowserItem);
