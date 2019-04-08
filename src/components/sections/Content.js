import './styles/Content.scss';
import { connect } from 'react-redux';
import { errorMessage, successMessage } from '../../reducers/notificationReducer';
import FeaturedProducts from './FeaturedProducts';
import ProductBrowser from './ProductBrowser';
import React from 'react';
import Terminal from './Terminal';

class Content extends React.Component {
    render = () => {
        return (
            <main>
                <div className="products-container">
                    <FeaturedProducts />
                    <ProductBrowser />
                </div>
                <div className="terminal-container">
                    <Terminal />
                </div>
            </main>
        );
    };
}

const mapStateToProps = (state) => {
    return {
        success: state.notification.success,
        error: state.notification.error
    };
};

const mapDispatchToProps = {
    successMessage,
    errorMessage
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Content);
