import './styles/RegistrationPage.scss';
import { Col, Row } from 'react-flexbox-grid';
import { Redirect } from 'react-router-dom';
import Header from '../sections/Header';
import React from 'react';
import RegisterForm from '../forms/RegisterForm';

const RegistrationPage = ({ authenticated }) => {
    if (authenticated) {
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

export default RegistrationPage;
