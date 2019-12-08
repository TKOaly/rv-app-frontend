import './styles/ProductBrowser.scss';
import { connect } from 'react-redux';
import { isAvailableProduct } from '../../services/filterUtils';
import { setCategorySelected, setFilter } from '../../reducers/productReducer';
import Loader from '../loaders/Loader';
import ProductBrowserItem from './ProductBrowserItem';
import React from 'react';

const productSorter = (a, b) => {
    const aName = a.name.toLowerCase();
    const bName = b.name.toLowerCase();

    return aName.localeCompare(bName);
};

const sortProducts = (products) => [...products.sort(productSorter)];

const filterProducts = (products, selectedCategory, filter, showOnlyAvailableProducts) => {
    return products.filter((p) => {
        const {
            name,
            category: { categoryId },
            barcode
        } = p;
        return (
            (selectedCategory === -1 || categoryId === selectedCategory) &&
            (name
                .toLowerCase()
                .trim()
                .includes(filter.toLowerCase().trim()) ||
                barcode === filter.trim()) &&
            (!showOnlyAvailableProducts || isAvailableProduct(p))
        );
    });
};

class ProductBrowser extends React.Component {
    componentWillUnmount = () => {
        this.props.setFilter('');
        this.props.setCategorySelected(-1);
    };

    getVisibleProducts = () =>
        sortProducts(
            filterProducts(
                this.props.products,
                this.props.selectedCategory,
                this.props.filter,
                this.props.showOnlyAvailableProducts
            )
        );

    getVisibleCategories = () => {
        return this.props.categories.filter((categ) => categ.categoryId !== 65535);
    };

    handleChangeFilter = (e) => {
        this.props.setFilter(e.target.value);
    };

    handleChangeCategory = (e) => {
        this.props.setCategorySelected(parseInt(e.target.value, 10));
    };

    filterInputRef = (input) => {
        this.filterFocus = input;
        this.props.setFilterRef(input);
    };

    handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            this.props.getTerminalRef().focus();
        }
    };

    render = () => {
        return (
            <div className="product-browser-container">
                <div className="product-filter">
                    <select value={this.props.selectedCategory} onChange={this.handleChangeCategory}>
                        <option value={-1}>All products</option>
                        {this.getVisibleCategories().map((category) => (
                            <option value={category.categoryId} key={category.categoryId}>
                                {category.description}
                            </option>
                        ))}
                    </select>
                    <input
                        type="text"
                        placeholder="Find product..."
                        value={this.props.filter}
                        onChange={this.handleChangeFilter}
                        onKeyDown={this.handleKeyDown}
                        ref={this.filterInputRef}
                    />
                </div>
                <div className="product-browser-list">
                    {this.props.loading ? (
                        <Loader />
                    ) : (
                        <ul>
                            {this.getVisibleProducts().map((p) => (
                                <ProductBrowserItem key={p.productId} product={p} />
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        );
    };
}

const mapStateToProps = (state) => {
    return {
        products: state.products.products,
        loading: state.products.gettingProducts,
        filter: state.products.filter,
        selectedCategory: state.products.selectedCategory,
        categories: state.products.categories,
        showOnlyAvailableProducts: state.products.showOnlyAvailableProducts,
        token: state.user.token
    };
};

const mapDispatchToProps = {
    setFilter,
    setCategorySelected
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProductBrowser);
