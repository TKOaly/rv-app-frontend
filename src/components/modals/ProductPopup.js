import './styles/ProductPopup.css';
import { buyProduct, setBuyAmount } from '../../reducers/productReducer';
import { closeModal } from '../../reducers/modalReducer';
import { connect } from 'react-redux';
import React from 'react';
import moneyFormatter from '../../services/moneyFormatter';

class ProductPopup extends React.Component {
    changeQuantity = (change) => {
        if (this.props.buyAmount + change >= 1) {
            this.props.setBuyAmount(this.props.buyAmount + change);
        }
    };

    componentWillUnmount = () => {
        this.props.setBuyAmount(1);
    };

    render = () => {
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
                        <button onClick={() => this.changeQuantity(-1)}>-</button>
                        <span>{this.props.buyAmount} pcs</span>
                        <button onClick={() => this.changeQuantity(1)}>+</button>
                    </div>
                    <div className="total">
                        <div>Total</div>
                        <div className="sum">
                            {moneyFormatter.centsToString(prod.sellprice * this.props.buyAmount)} €
                        </div>
                    </div>
                </div>
                <div className="product-actions">
                    <button className="cancel-btn" onClick={() => this.props.closeModal()}>
                        Cancel
                    </button>
                    <button
                        className="purchase-btn"
                        onClick={() => {
                            this.props.buyProduct(prod, this.props.buyAmount);
                            this.props.closeModal();
                        }}
                    >
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
