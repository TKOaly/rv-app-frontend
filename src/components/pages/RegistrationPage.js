import './styles/RegistrationPage.css';
import { Col, Row } from 'react-flexbox-grid';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { registerUser } from '../../reducers/registerReducer';
import Header from '../sections/Header';
import React from 'react';
import RegisterForm from '../forms/RegisterForm';

class RegistrationPage extends React.Component {
    submit = (values) => {
        console.log(values);
        this.props.registerUser(values);
    };

    render = () => {
        if (this.props.loggedIn) {
            return <Redirect to="/" />;
        }

        return (
            <div className="registrationPage">
                <Header />
                <Row className="centered">
                    <Col xs={5}>
                        <RegisterForm shadow={true} onSubmit={this.submit} />
                    </Col>
                </Row>
            </div>
        );
    };
}

const mapDispatchToProps = {
    registerUser
};

const mapStateToProps = (state) => {
    return {
        loggedIn: state.authentication.loggedIn
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationPage);
