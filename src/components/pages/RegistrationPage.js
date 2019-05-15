import './styles/RegistrationPage.scss';
import { Col, Row } from 'react-flexbox-grid';
import { connect } from 'react-redux';
import LoginHeader from '../sections/LoginHeader';
import React from 'react';
import RegisterForm from '../forms/RegisterForm';

class RegistrationPage extends React.Component {
    render = () => {
        return (
            <div className="registrationPage">
                <LoginHeader />
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
