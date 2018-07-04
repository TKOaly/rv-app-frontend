import './styles/Content.css';
import { Col, Row } from 'react-flexbox-grid';
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
