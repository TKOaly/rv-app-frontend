import './styles/FeaturedProducts.css';
import { buyProduct } from '../../reducers/productReducer';
import { connect } from 'react-redux';
import Loader from '../loaders/Loader';
import React from 'react';
import moneyFormatter from '../../services/moneyFormatter';

const FeaturedProductsList = (props) => {
    const products = props.products;

    const productsList = products.map((p) => (
        <li key={p.product_id}>
            <a
                href="/"
                role="button"
                onClick={(e) => {
                    e.preventDefault();
                    props.buy(p);
                }}
            >
                <div className="featured-name">{p.product_name}</div>
                <div className="featured-price">{moneyFormatter.centsToString(p.sellprice)} €</div>
            </a>
        </li>
    ));

    return <ul>{productsList}</ul>;
};

class FeaturedProducts extends React.Component {
    buyProduct = (product) => {
        this.props.buyProduct(product, 1);
    };

    render = () => {
        // these will some day come from backend, hardcoded for now
        const featuredProductIds = [56, 58, 54, 50, 52, 626, 344];
        const featuredProducts = this.props.products.filter((p) => featuredProductIds.includes(p.product_id));

        return (
            <div className="featured-products">
                <div className="featured-header">
                    <h2>Click 'n' Buy</h2>
                </div>
                {this.props.loading ? (
                    <Loader />
                ) : (
                    <FeaturedProductsList products={featuredProducts} buy={this.buyProduct} />
                )}
            </div>
        );
    };
}

const mapStateToProps = (state) => {
    return {
        products: state.products.products,
        loading: state.products.gettingProducts
    };
};

const mapDispatchToProps = {
    buyProduct
};

export default connect(mapStateToProps, mapDispatchToProps)(FeaturedProducts);
