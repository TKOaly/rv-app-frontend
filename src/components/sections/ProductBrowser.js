import React from 'react';
import { connect } from 'react-redux';
import { showModal } from '../../reducers/modalReducer';
import { setFilter, setCategorySelected } from '../../reducers/productReducer';
import ProductPopup from '../modals/ProductPopup';
import Loader from '../loaders/Loader';
import './styles/ProductBrowser.css';
import moneyFormatter from './../../services/moneyFormatter';

export class ProductBrowser extends React.Component {
    constructor(props) {
        super(props);
        this.sortProducts = this.sortProducts.bind(this);
        this.filterProducts = this.filterProducts.bind(this);
        this.createElements = this.createElements.bind(this);
        this.handleChangeFilter = this.handleChangeFilter.bind(this);
        this.handleChangeCategory = this.handleChangeCategory.bind(this);
    }

    sortProducts(products) {
        return products.sort((a, b) => {
            const [aname, bname] = [
                a.product_name.toLowerCase(),
                b.product_name.toLowerCase()
            ];

            return aname < bname ? -1 : aname === bname ? 0 : 1;
        });
    }

    filterProducts(products) {
        return products.filter(p => {
            return (
                (this.props.selectedCategory === -1 ||
                    p.product_group === this.props.selectedCategory) &&
                p.product_name
                    .toLowerCase()
                    .trim()
                    .includes(this.props.filter.toLowerCase().trim())
            );
        });
    }

    createElements(products) {
        return products.map(p => (
            <li key={p.product_id} className="product-list-item">
                <a
                    role="button"
                    href="/"
                    onClick={e => {
                        e.preventDefault();
                        this.props.showModal(ProductPopup, {
                            product: p
                        });
                    }}
                >
                    <span className="product-list-item-name">
                        {p.product_name}
                    </span>
                    <span className="product-list-item-price">
                        {moneyFormatter.centsToString(p.sellprice)} €
                    </span>
                </a>
            </li>
        ));
    }

    handleChangeFilter(e) {
        this.props.setFilter(e.target.value);
    }

    handleChangeCategory(e) {
        this.props.setCategorySelected(parseInt(e.target.value, 10));
    }

    createProductList() {
        const prods = this.props.products.slice();
        const sortedProds = this.sortProducts(prods);
        const sortedFilteredProds = this.filterProducts(sortedProds);
        return this.createElements(sortedFilteredProds);
    }

    render() {
        return (
            <div className="product-browser-container">
                <div className="product-filter">
                    <select
                        value={this.props.selectedCategory}
                        onChange={this.handleChangeCategory}
                    >
                        <option value={-1}>All products</option>
                        {this.props.categories.map(category => (
                            <option
                                value={category.category_id}
                                key={category.category_id}
                            >
                                {category.category_description}
                            </option>
                        ))}
                    </select>
                    <input
                        type="text"
                        placeholder="Find product..."
                        value={this.props.filter}
                        onChange={this.handleChangeFilter}
                    />
                </div>
                <div className="product-browser-list">
                    {this.props.loading ? (
                        <Loader />
                    ) : (
                        <ul>{this.createProductList()}</ul>
                    )}
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = {
    showModal,
    setFilter,
    setCategorySelected
};

const mapStateToProps = state => ({
    products: state.products.products,
    loading: state.products.gettingProducts,
    filter: state.products.filter,
    selectedCategory: state.products.selectedCategory,
    categories: state.products.categories.filter(
        categ => categ.category_id !== 65535
    )
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductBrowser);
