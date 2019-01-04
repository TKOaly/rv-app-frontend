import './styles/FeaturedProducts.scss';
import { buyProduct } from '../../reducers/productReducer';
import { connect } from 'react-redux';
import React from 'react';
import moneyFormatter from '../../services/moneyFormatter';

class FeaturedProductItem extends React.Component {
    handleClick = (event) => {
        event.preventDefault();
        this.props.buyProduct(this.props.product, 1);
    };

    render = () => {
        return (
            <li>
                <a href="/" role="button" onClick={this.handleClick}>
                    <div className="featured-name">{this.props.product.product_name}</div>
                    <div className="featured-price">{moneyFormatter.centsToString(this.props.product.sellprice)} €</div>
                </a>
            </li>
        );
    };
}

const mapDispatchToProps = {
    buyProduct
};

export default connect(null, mapDispatchToProps)(FeaturedProductItem);
