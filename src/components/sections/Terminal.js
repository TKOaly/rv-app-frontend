import React from 'react';

import { connect } from 'react-redux';

import './styles/Terminal.css';

import { setTerminalText, handleTerminalSubmit } from './../../reducers/terminalReducer';

class Terminal extends React.Component {
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.handleTerminalSubmit(this.props.terminalInput, this.props.token);
    };

    componentDidMount = () => {
        this.terminalFocus.focus();
    };

    render = () => {
        const className = this.props.inputValid ? 'input fullWidth valid' : 'input fullWidth invalid';
        return (
            <div className="terminal">
                <form onSubmit={this.handleSubmit}>
                    <input
                        className={className}
                        value={this.props.terminalInput}
                        ref={(input) => {
                            this.terminalFocus = input;
                        }}
                        onChange={(event) => this.props.setTerminalText(event.target.value)}
                        placeholder="Scan a barcode here to buy a product."
                    />
                </form>
            </div>
        );
    };
}

const mapDispatchToProps = {
    setTerminalText,
    handleTerminalSubmit
};

const mapStateToProps = (state) => {
    return {
        terminalInput: state.terminal.terminalInput,
        inputValid: state.terminal.inputValid,
        token: state.authentication.access_token
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Terminal);
