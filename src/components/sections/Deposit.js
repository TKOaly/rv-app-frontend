import './styles/Deposit.css';
import { Fade } from '../animations/Animations';
import { TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import { errorMessage } from '../../reducers/notificationReducer';
import { increaseBalance } from '../../reducers/userReducer';
import { resetAmount, setAmountText, toggleConfirmationVisibility } from '../../reducers/depositReducer';
import Confirmation from './Confirmation';
import React from 'react';
import moneyFormatter from '../../services/moneyFormatter';

class Deposit extends React.Component {
    static depositAmountTextToCents = (text) => {
        if (text === '') {
            return 0;
        } else {
            return moneyFormatter.stringToCents(text);
        }
    };

    componentDidMount = () => {
        this.textField.focus();
    };

    componentWillUnmount = () => {};

    createIncrementHandler = (increment) => {
        return (event) => {
            event.preventDefault();
            const cents = Deposit.depositAmountTextToCents(this.props.depositAmountText);
            if (Number.isNaN(cents)) {
                this.props.errorMessage('Invalid deposit amount in text field. Use format 10.00');
            } else {
                this.props.setAmountText(moneyFormatter.centsToString(cents + increment));
            }
        };
    };

    handleOK = () => {
        const cents = Deposit.depositAmountTextToCents(this.props.depositAmountText);
        if (Number.isNaN(cents)) {
            this.props.errorMessage('Invalid deposit amount in text field. Use format 10.00');
        } else if (cents <= 0) {
            this.props.errorMessage('You cannot deposit 0 € or less.');
        } else {
            this.props.toggleConfirmationVisibility(true);
        }
    };

    handleCancel = () => {
        this.props.resetAmount();
        this.props.closeModal();
    };

    handleValueChange = (event) => this.props.setAmountText(event.target.value);

    depositRef = (input) => {
        this.textField = input;
    };

    render = () => {
        return (
            <div className="deposit-wrapper">
                <div className="deposit">
                    <div className="input-wrapper">
                        <input
                            className="input"
                            type="text"
                            placeholder="0.00"
                            value={this.props.depositAmountText}
                            onChange={this.handleValueChange}
                            ref={this.depositRef}
                        />
                        <div className="euro-sign">€</div>
                    </div>
                    <button className="btn number erase" onClick={this.props.resetAmount}>
                        Reset
                    </button>
                    <button className="btn number increment" onClick={this.createIncrementHandler(5)}>
                        + 0.05 €
                    </button>
                    <button className="btn number increment" onClick={this.createIncrementHandler(10)}>
                        + 0.10 €
                    </button>
                    <button className="btn number increment" onClick={this.createIncrementHandler(20)}>
                        + 0.20 €
                    </button>
                    <button className="btn number increment" onClick={this.createIncrementHandler(50)}>
                        + 0.50 €
                    </button>
                    <button className="btn number increment" onClick={this.createIncrementHandler(100)}>
                        + 1.00 €
                    </button>
                    <button className="btn number increment" onClick={this.createIncrementHandler(200)}>
                        + 2.00 €
                    </button>
                    <button className="btn number increment" onClick={this.createIncrementHandler(500)}>
                        + 5.00 €
                    </button>
                    <button className="btn number increment" onClick={this.createIncrementHandler(1000)}>
                        + 10.00 €
                    </button>
                    <button className="btn number increment" onClick={this.createIncrementHandler(2000)}>
                        + 20.00 €
                    </button>
                    <button className="btn number cancel" onClick={this.handleCancel}>
                        Cancel
                    </button>
                    <button className="btn number increment" onClick={this.createIncrementHandler(5000)}>
                        + 50.00 €
                    </button>
                    <button className="btn number success" onClick={this.handleOK}>
                        OK
                    </button>
                </div>
                <TransitionGroup>
                    {this.props.confirmationVisibility && (
                        <Fade>
                            <Confirmation
                                depositAmount={Deposit.depositAmountTextToCents(this.props.depositAmountText)}
                                token={this.props.token}
                                increaseBalance={this.props.increaseBalance}
                                resetAmount={this.props.resetAmount}
                                closeModal={this.props.closeModal}
                                toggleConfirmationVisibility={this.props.toggleConfirmationVisibility}
                            />
                        </Fade>
                    )}
                </TransitionGroup>
            </div>
        );
    };
}

const mapStateToProps = (state) => ({
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
