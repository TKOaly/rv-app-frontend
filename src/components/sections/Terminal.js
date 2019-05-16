import './styles/Terminal.scss';
import { closeModal, showModal } from '../../reducers/modalReducer';
import { connect } from 'react-redux';
import { doLogout } from '../../reducers/authenticationReducer';
import { handleTerminalSubmit, resetTerminal, setTerminalText } from '../../reducers/terminalReducer';
import Deposit from './Deposit';
import React from 'react';

class Terminal extends React.Component {
    handleSubmit = (event) => {
        event.preventDefault();

        // Submitting empty string = pressing enter without content in barcode field. This should log out the user.
        if (this.props.terminalInput === '') {
            this.props.doLogout();
        } else {
            this.props.handleTerminalSubmit(this.props.terminalInput, this.props.token);
        }
    };

    componentDidMount = () => {
        this.terminalFocus.focus();
    };

    componentWillUnmount = () => {
        this.props.resetTerminal();
    };

    terminalInputRef = (input) => {
        this.terminalFocus = input;
        this.props.setTerminalRef(input);
    };

    handleKeyDown = (event) => {
        if (event.key === 'd') {
            event.preventDefault();
            this.props.showModal(Deposit, {
                closeModal: this.props.closeModal
            });
        }

        if (event.key === 'f') {
            event.preventDefault();
            this.props.getFilterRef().focus();
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

const mapStateToProps = (state) => {
    return {
        terminalInput: state.terminal.terminalInput,
        inputValid: state.terminal.inputValid,
        token: state.authentication.access_token
    };
};

const mapDispatchToProps = {
    setTerminalText,
    handleTerminalSubmit,
    showModal,
    closeModal,
    doLogout,
    resetTerminal
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Terminal);
