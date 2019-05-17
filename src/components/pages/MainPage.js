import { closeModal } from '../../reducers/modalReducer';
import { connect } from 'react-redux';
import { replace } from 'connected-react-router';
import Content from '../sections/Content';
import Header from '../sections/Header';
import React from 'react';

class MainPage extends React.Component {
    componentDidMount = () => {
        if (!this.props.loggedIn) {
            /* If not logged in, go to login page instead. */
            this.props.replace('/login');
        }
    };

    componentWillUnmount = () => {
        this.props.closeModal();
    };

    render = () => {
        return (
            <div className="mainpage">
                <Header />
                <Content />
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
    replace,
    closeModal
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MainPage);
