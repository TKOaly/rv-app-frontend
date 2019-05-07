import './styles/ProductBrowser.scss';
import { connect } from 'react-redux';
import { setCategorySelected, setFilter } from '../../reducers/productReducer';
import Loader from '../loaders/Loader';
import ProductBrowserItem from './ProductBrowserItem';
import React from 'react';

const sortProducts = (products) => {
    return products.sort((a, b) => {
        const aname = a.product_name.toLowerCase();
        const bname = b.product_name.toLowerCase();

        return aname < bname ? -1 : aname === bname ? 0 : 1;
    });
};

const filterProducts = (products, selectedCategory, filter) => {
    return products.filter((p) => {
        return (
            (selectedCategory === -1 || p.product_group === selectedCategory) &&
            p.product_name
                .toLowerCase()
                .trim()
                .includes(filter.toLowerCase().trim())
        );
    });
};

class ProductBrowser extends React.Component {
    getVisibleProducts = () => {
        return sortProducts(filterProducts(this.props.products, this.props.selectedCategory, this.props.filter));
    };

    getVisibleCategories = () => {
        return this.props.categories.filter((categ) => categ.category_id !== 65535);
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
        if (event.keyCode === 13) {
            event.preventDefault();
            this.props.terminalInputRef().focus();
        }
    };

    render = () => {
        return (
            <div className="product-browser-container">
                <div className="product-filter">
                    <select value={this.props.selectedCategory} onChange={this.handleChangeCategory}>
                        <option value={-1}>All products</option>
                        {this.getVisibleCategories().map((category) => (
                            <option value={category.category_id} key={category.category_id}>
                                {category.category_description}
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
                                <ProductBrowserItem key={p.product_id} product={p} />
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
