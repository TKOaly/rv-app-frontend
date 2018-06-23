import React, { Component } from 'react';
import './styles/Confirmation.css';
import moneyFormatter from './../../services/moneyFormatter';

export class Confirmation extends Component {
    render() {
        return (
            <div className="confirm-overlay">
                <div className="confirm">
                    Confirm{' '}
                    <b>
                        {moneyFormatter.centsToString(this.props.depositAmount)}{' '}
                        €
                    </b>{' '}
                    deposit
                    <br />
                    <br />
                    <button
                        className="btn number cancel cancelBtn"
                        onClick={() => {
                            this.props.toggleConfirmationVisibility(false);
                        }}
                    >
                        Cancel
                    </button>
                    <button
                        className="btn number success confirmBtn"
                        onClick={() => {
                            this.props.increaseBalance(
                                this.props.token,
                                this.props.depositAmount
                            );
                            this.props.resetAmount();
                            this.props.toggleConfirmationVisibility(false);
                            this.props.closeModal();
                        }}
                    >
                        OK
                    </button>
                </div>
            </div>
        );
    }
}

export default Confirmation;
