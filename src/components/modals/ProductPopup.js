import './styles/ProductPopup.css';
import { buyProduct, setBuyAmount } from '../../reducers/productReducer';
import { closeModal } from '../../reducers/modalReducer';
import { connect } from 'react-redux';
import React from 'react';
import moneyFormatter from '../../services/moneyFormatter';

class ProductPopup extends React.Component {
    handleBuy = () => {
        this.props.buyProduct(this.props.product, this.props.buyAmount);
        this.props.closeModal();
    };

    handleCancel = () => {
        this.props.closeModal();
    };

    handleDecreaseAmount = () => {
        if (this.props.buyAmount > 1) {
            this.props.setBuyAmount(this.props.buyAmount - 1);
        }
    };

    handleIncreaseAmount = () => {
        this.props.setBuyAmount(this.props.buyAmount + 1);
    };

    componentWillUnmount = () => {
        // Reset amount back to 1
        this.props.setBuyAmount(1);
    };

    render = () => {
        return (
            <div className="product-popup">
                <div className="product-popup-header">
                    <h3>Buy product</h3>
                </div>
                <div className="product-info">
                    <div className="product-name">{this.props.product.product_name}</div>
                </div>
                <div className="product-quantity">
                    <div>Amount:</div>
                    <div className="quantity-picker">
                        <button onClick={this.handleDecreaseAmount}>-</button>
                        <span>{this.props.buyAmount} pcs</span>
                        <button onClick={this.handleIncreaseAmount}>+</button>
                    </div>
                    <div className="total">
                        <div>Total</div>
                        <div className="sum">
                            {moneyFormatter.centsToString(this.props.product.sellprice * this.props.buyAmount)} €
                        </div>
                    </div>
                </div>
                <div className="product-actions">
                    <button className="cancel-btn" onClick={this.handleCancel}>
                        Cancel
                    </button>
                    <button className="purchase-btn" onClick={this.handleBuy}>
                        Buy
                    </button>
                </div>
            </div>
        );
    };
}

const mapStateToProps = (state) => {
    return {
        buyAmount: state.products.buyAmount
    };
};

const mapDispatchToProps = {
    closeModal,
    buyProduct,
    setBuyAmount
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductPopup);
