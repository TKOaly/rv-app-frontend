import './styles/LoginPage.css';
import { Col, Grid, Row } from 'react-flexbox-grid';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Header from '../sections/Header';
import LoginForm from '../forms/LoginForm';
import React from 'react';

class LoginPage extends React.Component {
    render = () => {
        if (this.props.loggedIn) {
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
}

const mapStateToProps = (state) => {
    return {
        loggedIn: state.authentication.loggedIn
    };
};

export default connect(mapStateToProps)(LoginPage);
