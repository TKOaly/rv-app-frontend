import './styles/RegistrationPage.scss';
import { Col, Row } from 'react-flexbox-grid';
import { connect } from 'react-redux';
import { doLogoutWithoutRedirect } from '../../reducers/authenticationReducer';
import LoginHeader from '../sections/LoginHeader';
import React from 'react';
import RegisterForm from '../forms/RegisterForm';

class RegistrationPage extends React.Component {
    componentDidMount = () => {
        if (this.props.loggedIn) {
            this.props.doLogoutWithoutRedirect();
        }
    };

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

const mapDispatchToProps = {
    doLogoutWithoutRedirect
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RegistrationPage);
