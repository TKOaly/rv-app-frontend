import './styles/FeaturedProducts.scss';
import { connect } from 'react-redux';
import { filterByPositiveStock } from '../../productUtils';
import { resetFeaturedProducts, setFeaturedProducts } from '../../reducers/productReducer';
import FeaturedProductItem from './FeaturedProductItem';
import Loader from '../loaders/Loader';
import React from 'react';

class FeaturedProducts extends React.Component {
    calculateFeaturedProducts = () => {
        const productBuyCounts = new Map();

        /* Stores products ids and purchase counts into the map for the last 100 purchases. */
        for (let i = 0; i < this.props.purchaseHistory.length && i < 100; i++) {
            const productId = this.props.purchaseHistory[i].product.productId;

            /* Increment or create new entry. */
            if (productBuyCounts.has(productId)) {
                productBuyCounts.set(productId, productBuyCounts.get(productId) + 1);
            } else {
                productBuyCounts.set(productId, 1);
            }
        }

        /* 10 most purchased product ids within the last 100 purchases. */
        const mostBought = [...productBuyCounts.entries()]
            .sort((a, b) => b[1] - a[1])
            .slice(0, 10)
            .map((mapEntry) => mapEntry[0]);

        const mostBoughtProducts = mostBought
            .map((productId) => this.props.products.find((product) => product.productId === productId))
            .filter((product) => product !== undefined);

        if(this.props.showOnlyPositiveStock) {
            return mostBoughtProducts.filter(filterByPositiveStock);
        }
        return mostBoughtProducts;
    };

    onComponentMountOrUpdate = () => {
        if (!this.props.fetchingProducts && !this.props.fetchingPurchases && !this.props.featuredProductsLoaded) {
            this.props.setFeaturedProducts(this.calculateFeaturedProducts());
        }
    };

    componentDidUpdate = this.onComponentMountOrUpdate;
    componentDidMount = this.onComponentMountOrUpdate;

    componentWillUnmount = () => {
        this.props.resetFeaturedProducts();
    };

    render = () => {
        return (
            <div className="featured-products">
                <div className="featured-header">
                    <h2>Click 'n' Buy</h2>
                </div>
                {!this.props.featuredProductsLoaded ? (
                    <Loader />
                ) : (
                    <ul>
                        {this.props.featuredProducts.map((p) => (
                            <FeaturedProductItem key={p.productId} product={p} />
                        ))}
                    </ul>
                )}
            </div>
        );
    };
}

const mapStateToProps = (state) => {
    return {
        products: state.products.products,
        fetchingProducts: state.products.gettingProducts,
        purchaseHistory: state.history.purchaseHistory,
        fetchingPurchases: state.history.fetchingPurchases,
        featuredProducts: state.products.featuredProducts,
        featuredProductsLoaded: state.products.featuredProductsLoaded,
        showOnlyPositiveStock: state.products.showOnlyPositiveStock
    };
};

const mapDispatchToProps = {
    setFeaturedProducts,
    resetFeaturedProducts
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FeaturedProducts);
