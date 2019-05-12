import './styles/ProductBrowser.scss';
import { connect } from 'react-redux';
import { setCategorySelected, setFilter } from '../../reducers/productReducer';
import Loader from '../loaders/Loader';
import ProductBrowserItem from './ProductBrowserItem';
import React from 'react';

const sortProducts = (products) => {
    return products.sort((a, b) => {
        const aname = a.name.toLowerCase();
        const bname = b.name.toLowerCase();

        return aname < bname ? -1 : aname === bname ? 0 : 1;
    });
};

const filterProducts = (products, selectedCategory, filter) => {
    return products.filter((p) => {
        return (
            (selectedCategory === -1 || p.category.categoryId === selectedCategory) &&
            (p.name
                .toLowerCase()
                .trim()
                .includes(filter.toLowerCase().trim()) ||
                p.barcode === filter.trim())
        );
    });
};

class ProductBrowser extends React.Component {
    getVisibleProducts = () => {
        return sortProducts(filterProducts(this.props.products, this.props.selectedCategory, this.props.filter));
    };

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
        categories: state.products.categories
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
