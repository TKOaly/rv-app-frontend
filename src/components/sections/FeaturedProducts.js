import './styles/FeaturedProducts.scss';
import { connect } from 'react-redux';
import FeaturedProductItem from './FeaturedProductItem';
import Loader from '../loaders/Loader';
import React from 'react';

class FeaturedProducts extends React.Component {
    getFeaturedProducts = () => {
        // these will some day come from backend, hardcoded for now
        const featuredProductIds = [56, 58, 54, 50, 52, 626, 344];
        return this.props.products.filter((p) => featuredProductIds.includes(p.product_id));
    };

    render = () => {
        return (
            <div className="featured-products">
                <div className="featured-header">
                    <h2>Click 'n' Buy</h2>
                </div>
                {this.props.loading ? (
                    <Loader />
                ) : (
                    <ul>
                        {this.getFeaturedProducts().map((p) => <FeaturedProductItem key={p.product_id} product={p} />)}
                    </ul>
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

export default connect(mapStateToProps)(FeaturedProducts);
