import './styles/LoginPage.scss';
import { Col, Grid, Row } from 'react-flexbox-grid';
import { Redirect } from 'react-router-dom';
import Header from '../sections/Header';
import LoginForm from '../forms/LoginForm';
import React from 'react';

const LoginPage = ({ authenticated }) => {
    if (authenticated) {
        return <Redirect to="/" />;
    }
    return (
        <div className="loginPage">
            <Header />
            <Grid fluid>
                <Row center="xs">
                    <Col xs={5}>
                        <LoginForm />
                    </Col>
                </Row>
            </Grid>
        </div>
    );
};

export default LoginPage;
