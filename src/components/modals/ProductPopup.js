import React from 'react';
import './styles/ProductPopup.css';
import { connect } from 'react-redux';
import { closeModal } from '../../reducers/modalReducer';
import { buyProduct } from '../../reducers/productReducer';
import moneyFormatter from './../../services/moneyFormatter';

export class ProductPopup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            quantity: 1
        };

        this.changeQuantity = this.changeQuantity.bind(this);
    }

    changeQuantity(delta) {
        if (this.state.quantity + delta >= 1) {
            this.setState({
                quantity: this.state.quantity + delta
            });
        }
    }

    render() {
        const prod = this.props.product;

        return (
            <div className="product-popup">
                <div className="product-popup-header">
                    <h3>Buy product</h3>
                </div>
                <div className="product-info">
                    <div className="product-name">{prod.product_name}</div>
                </div>
                <div className="product-quantity">
                    <div>Amount:</div>
                    <div className="quantity-picker">
                        <button onClick={() => this.changeQuantity(-1)}>
                            -
                        </button>
                        <span>{this.state.quantity} kpl</span>
                        <button onClick={() => this.changeQuantity(1)}>
                            +
                        </button>
                    </div>
                    <div className="total">
                        <div>Total</div>
                        <div className="sum">
                            {moneyFormatter.centsToString(
                                prod.sellprice * this.state.quantity
                            )}{' '}
                            €
                        </div>
                    </div>
                </div>
                <div className="product-actions">
                    <button
                        className="cancel-btn"
                        onClick={() => this.props.closeModal()}
                    >
                        Cancel
                    </button>
                    <button
                        className="purchase-btn"
                        onClick={() => {
                            this.props.buyProduct(prod, this.state.quantity);
                            this.props.closeModal();
                        }}
                    >
                        Buy
                    </button>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = {
    closeModal,
    buyProduct
};

export default connect(null, mapDispatchToProps)(ProductPopup);
