import React from 'react';
import './styles/Content.css';
import { Col, Row } from 'react-flexbox-grid';
import FeaturedProducts from './FeaturedProducts';
import Terminal from './Terminal';
import ProductBrowser from './ProductBrowser';

import { connect } from 'react-redux';

import { successMessage, errorMessage } from './../../reducers/notificationReducer';

export class Content extends React.Component {
    render = () => {
        return (
            <main>
                <Row className="products-container">
                    <Col xs={3}>
                        <FeaturedProducts />
                    </Col>
                    <Col xs={9}>
                        <ProductBrowser />
                    </Col>
                </Row>
                <Row className="terminal-container">
                    <Col xs={2} />
                    <Col xs={8}>
                        <Terminal />
                    </Col>
                    <Col xs={2} />
                </Row>
            </main>
        );
    };
}

const mapDispatchToProps = {
    successMessage,
    errorMessage
};

const mapStateToProps = (state) => {
    return {
        success: state.notification.success,
        error: state.notification.error
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Content);
