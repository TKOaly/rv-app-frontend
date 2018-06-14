import React, { Component } from 'react';
import { connect } from 'react-redux';
import './styles/Deposit.css';
import {
    setAmountText,
    resetAmount,
    toggleConfirmationVisibility
} from './../../reducers/depositReducer';
import { increaseBalance } from './../../reducers/userReducer';
import { errorMessage } from './../../reducers/notificationReducer';
import { TransitionGroup } from 'react-transition-group';
import { Fade } from './../animations/Animations';
import Confirmation from './Confirmation';

export class Deposit extends Component {
    constructor(props) {
        super(props);
        this.createIncrementHandler = this.createIncrementHandler.bind(this);
        this.handleOK = this.handleOK.bind(this);
    }

    static depositAmountTextToCents(text) {
        if (text === '') {
            return 0;
        } else {
            const matchResult = text.match(/^(\d+)[.,](\d{2})$/);

            if (matchResult) {
                return (
                    parseInt(matchResult[1], 10) * 100 +
                    parseInt(matchResult[2], 10)
                );
            } else {
                return NaN;
            }
        }
    }

    static centsToDepositAmountText(cents) {
        const paddedCentString = cents.toString().padStart(3, '0');
        return paddedCentString.slice(0, -2) + '.' + paddedCentString.slice(-2);
    }

    componentDidMount() {
        this.textField.focus();
    }

    componentWillUnmount() {}

    createIncrementHandler(increment) {
        return event => {
            event.preventDefault();
            const cents = Deposit.depositAmountTextToCents(
                this.props.depositAmountText
            );
            if (Number.isNaN(cents)) {
                this.props.errorMessage(
                    'Invalid deposit amount in text field. Use format 10.00'
                );
            } else {
                this.props.setAmountText(
                    Deposit.centsToDepositAmountText(cents + increment)
                );
            }
        };
    }

    handleOK() {
        const cents = Deposit.depositAmountTextToCents(
            this.props.depositAmountText
        );
        if (Number.isNaN(cents)) {
            this.props.errorMessage(
                'Invalid deposit amount in text field. Use format 10.00'
            );
        } else if (cents === 0) {
            this.props.errorMessage('You cannot deposit 0 €.');
        } else {
            this.props.toggleConfirmationVisibility(
                this.props.confirmationVisibility
            );
        }
    }

    render() {
        return (
            <div className="deposit-wrapper">
                <div className="deposit">
                    <div className="input-wrapper">
                        <input
                            className="input"
                            type="text"
                            placeholder="0.00"
                            value={this.props.depositAmountText}
                            onChange={event =>
                                this.props.setAmountText(event.target.value)
                            }
                            ref={input => {
                                this.textField = input;
                            }}
                        />
                        <div className="euro-sign">€</div>
                    </div>
                    <button
                        className="btn number erase"
                        onClick={this.props.resetAmount}
                    >
                        Reset
                    </button>
                    <button
                        className="btn number increment"
                        onClick={this.createIncrementHandler(5)}
                    >
                        + 0.05 €
                    </button>
                    <button
                        className="btn number increment"
                        onClick={this.createIncrementHandler(10)}
                    >
                        + 0.10 €
                    </button>
                    <button
                        className="btn number increment"
                        onClick={this.createIncrementHandler(20)}
                    >
                        + 0.20 €
                    </button>
                    <button
                        className="btn number increment"
                        onClick={this.createIncrementHandler(50)}
                    >
                        + 0.50 €
                    </button>
                    <button
                        className="btn number increment"
                        onClick={this.createIncrementHandler(100)}
                    >
                        + 1.00 €
                    </button>
                    <button
                        className="btn number increment"
                        onClick={this.createIncrementHandler(200)}
                    >
                        + 2.00 €
                    </button>
                    <button
                        className="btn number increment"
                        onClick={this.createIncrementHandler(500)}
                    >
                        + 5.00 €
                    </button>
                    <button
                        className="btn number increment"
                        onClick={this.createIncrementHandler(1000)}
                    >
                        + 10.00 €
                    </button>
                    <button
                        className="btn number increment"
                        onClick={this.createIncrementHandler(2000)}
                    >
                        + 20.00 €
                    </button>
                    <button
                        className="btn number cancel"
                        onClick={() => {
                            this.props.resetAmount();
                            this.props.toggleVisibility(true);
                        }}
                    >
                        Cancel
                    </button>
                    <button
                        className="btn number increment"
                        onClick={this.createIncrementHandler(5000)}
                    >
                        + 50.00 €
                    </button>
                    <button
                        className="btn number success"
                        onClick={this.handleOK}
                    >
                        OK
                    </button>
                </div>
                <TransitionGroup>
                    {this.props.confirmationVisibility && (
                        <Fade>
                            <Confirmation
                                depositAmount={Deposit.depositAmountTextToCents(
                                    this.props.depositAmountText
                                )}
                                token={this.props.token}
                                increaseBalance={this.props.increaseBalance}
                                resetAmount={this.props.resetAmount}
                                toggleVisibility={this.props.toggleVisibility}
                                toggleConfirmationVisibility={
                                    this.props.toggleConfirmationVisibility
                                }
                            />
                        </Fade>
                    )}
                </TransitionGroup>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    depositAmountText: state.deposit.depositAmountText,
    token: state.authentication.access_token,
    confirmationVisibility: state.deposit.confirmationVisibility
});

const mapDispatchToProps = {
    setAmountText,
    resetAmount,
    increaseBalance,
    toggleConfirmationVisibility,
    errorMessage
};

export default connect(mapStateToProps, mapDispatchToProps)(Deposit);
