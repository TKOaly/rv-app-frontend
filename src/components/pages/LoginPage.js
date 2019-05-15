import './styles/LoginPage.scss';
import { Col, Grid, Row } from 'react-flexbox-grid';
import { connect } from 'react-redux';
import LoginForm from '../forms/LoginForm';
import LoginHeader from '../sections/LoginHeader';
import React from 'react';

class LoginPage extends React.Component {
    render = () => {
        return (
            <div className="loginPage">
                <LoginHeader />
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
