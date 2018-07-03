import React from 'react';

import { connect } from 'react-redux';

import './styles/Terminal.css';

import { setTerminalText, handleTerminalSubmit } from './../../reducers/terminalReducer';
import Deposit from './Deposit';
import { closeModal, showModal } from '../../reducers/modalReducer';
import { logout } from './../../reducers/authenticationReducer';
import { resetUserData } from './../../reducers/userReducer';

class Terminal extends React.Component {
    handleSubmit = (event) => {
        event.preventDefault();

        // Submitting empty string = pressing enter without content in barcode field. This should log out the user.
        if (this.props.terminalInput === '') {
            this.props.resetUserData();
            this.props.logout();
        } else {
            this.props.handleTerminalSubmit(this.props.terminalInput, this.props.token);
        }
    };

    componentDidMount = () => {
        this.terminalFocus.focus();
    };

    terminalInputRef = (input) => {
        this.terminalFocus = input;
    };

    handleKeyDown = (event) => {
        if (event.key === 'd') {
            event.preventDefault();
            this.props.showModal(Deposit, {
                closeModal: this.props.closeModal
            });
        }
    };

    handleTerminalInputChange = (event) => {
        this.props.setTerminalText(event.target.value);
    };

    render = () => {
        const className = this.props.inputValid ? 'input fullWidth valid' : 'input fullWidth invalid';
        return (
            <div className="terminal">
                <form onSubmit={this.handleSubmit}>
                    <input
                        className={className}
                        value={this.props.terminalInput}
                        ref={this.terminalInputRef}
                        onKeyDown={this.handleKeyDown}
                        onChange={this.handleTerminalInputChange}
                        placeholder="Scan a barcode here to buy a product."
                    />
                </form>
            </div>
        );
    };
}

const mapDispatchToProps = {
    setTerminalText,
    handleTerminalSubmit,
    showModal,
    closeModal,
    logout,
    resetUserData
};

const mapStateToProps = (state) => {
    return {
        terminalInput: state.terminal.terminalInput,
        inputValid: state.terminal.inputValid,
        token: state.authentication.access_token
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Terminal);
