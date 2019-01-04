import './styles/RegistrationPage.scss';
import { Col, Row } from 'react-flexbox-grid';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Header from '../sections/Header';
import React from 'react';
import RegisterForm from '../forms/RegisterForm';

class RegistrationPage extends React.Component {
    render = () => {
        if (this.props.loggedIn) {
            return <Redirect to="/" />;
        }

        return (
            <div className="registrationPage">
                <Header />
                <Row className="centered">
                    <Col xs={5}>
                        <RegisterForm />
                    </Col>
                </Row>
            </div>
        );
    };
}

const mapStateToProps = (state) => {
    return {
        loggedIn: state.authentication.loggedIn
    };
};

export default connect(mapStateToProps)(RegistrationPage);
