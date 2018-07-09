import './styles/LoginPage.css';
import { Col, Grid, Row } from 'react-flexbox-grid';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { toggleRegisterVisibility } from '../../reducers/registerReducer';
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
                            <LoginForm shadow={true} />
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    };
}

const mapStateToProps = (state) => {
    return {
        registerVisible: state.register.registerVisible,
        loggedIn: state.authentication.loggedIn
    };
};

const mapDispatchToProps = {
    toggleRegisterVisibility
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
