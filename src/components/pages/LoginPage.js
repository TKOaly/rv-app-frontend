import React from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import LoginForm from '../forms/LoginForm';
import Header from '../sections/Header';
import './styles/LoginPage.css';
import { connect } from 'react-redux';
import { toggleRegisterVisibility } from './../../reducers/registerReducer';
import { Redirect } from 'react-router-dom';

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

const mapDispatchToProps = {
    toggleRegisterVisibility
};

const mapStateToProps = (state) => {
    return {
        registerVisible: state.register.registerVisible,
        loggedIn: state.authentication.loggedIn
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
