import React from 'react';

import { connect } from 'react-redux';

import './styles/Terminal.css';

import {
    handleInputEvent,
    handleTerminalSubmit
} from './../../reducers/terminalReducer';

class Terminal extends React.Component {
    handleSubmit = e => {
        e.preventDefault();
        this.props.handleTerminalSubmit(
            this.props.terminalInput,
            this.props.deposit
        );
    };

    componentDidMount() {
        this.terminalFocus.focus();
    }

    render() {
        const className = this.props.inputValid
            ? 'input fullWidth valid'
            : 'input fullWidth invalid';
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input
                        className={className}
                        value={this.props.terminalInput}
                        ref={input => {
                            this.terminalFocus = input;
                        }}
                        onChange={this.props.handleInputEvent}
                    />
                </form>
            </div>
        );
    }
}

const mapDispatchToProps = {
    handleInputEvent,
    handleTerminalSubmit
};

const mapStateToProps = state => {
    return {
        terminalInput: state.terminal.terminalInput,
        inputValid: state.terminal.inputValid
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Terminal);