import './styles/FeaturedProducts.scss';
import { connect } from 'react-redux';
import { isAvailableProduct } from '../../services/filterUtils';
import { resetFeaturedProducts, setFeaturedProducts } from '../../reducers/productReducer';
import FeaturedProductItem from './FeaturedProductItem';
import Loader from '../loaders/Loader';
import React from 'react';

class FeaturedProducts extends React.Component {
    calculateFeaturedProducts = () => {
        const productBuyCounts = new Map();

        /* Stores barcodes and purchase counts into the map for the last 100 purchases. */
        for (let i = 0; i < this.props.purchaseHistory.length && i < 100; i++) {
            const barcode = this.props.purchaseHistory[i].product.barcode;

            /* Increment or create new entry. */
            if (productBuyCounts.has(barcode)) {
                productBuyCounts.set(barcode, productBuyCounts.get(barcode) + 1);
            } else {
                productBuyCounts.set(barcode, 1);
            }
        }

        /* 10 most purchased barcodes within the last 100 purchases. */
        const mostBought = [...productBuyCounts.entries()]
            .sort((a, b) => b[1] - a[1])
            .slice(0, 10)
            .map((mapEntry) => mapEntry[0]);

        return mostBought
            .map((barcode) => this.props.products.find((product) => product.barcode === barcode))
            .filter((product) => product !== undefined && isAvailableProduct(product));
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
                            <FeaturedProductItem key={p.barcode} product={p} />
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
        featuredProductsLoaded: state.products.featuredProductsLoaded
    };
};

const mapDispatchToProps = {
    setFeaturedProducts,
    resetFeaturedProducts
};

export default connect(mapStateToProps, mapDispatchToProps)(FeaturedProducts);
