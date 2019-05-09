import './styles/Content.scss';
import { connect } from 'react-redux';
import { errorMessage, successMessage } from '../../reducers/notificationReducer';
import FeaturedProducts from './FeaturedProducts';
import ProductBrowser from './ProductBrowser';
import React from 'react';
import Terminal from './Terminal';

class Content extends React.Component {
    /* Hack to give terminal and filter fields a reference to each other so they can switch focus. */
    setFilterRef = (element) => {
        this.filterInputRef = element;
    };

    getFilterRef = () => {
        return this.filterInputRef;
    };

    setTerminalRef = (element) => {
        this.terminalInputRef = element;
    };

    getTerminalRef = () => {
        return this.terminalInputRef;
    };

    render = () => {
        return (
            <main>
                <div className="products-container">
                    <FeaturedProducts />
                    <ProductBrowser setFilterRef={this.setFilterRef} getTerminalRef={this.getTerminalRef} />
                </div>
                <div className="terminal-container">
                    <Terminal setTerminalRef={this.setTerminalRef} getFilterRef={this.getFilterRef} />
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
