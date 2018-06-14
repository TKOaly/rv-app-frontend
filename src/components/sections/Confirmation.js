import React, { Component } from 'react';
import './styles/Confirmation.css';

export class Confirmation extends Component {
    render() {
        return (
            <div className="confirm-overlay">
                <div className="confirm">
                    Confirm{' '}
                    <b>
                        {parseFloat(this.props.depositAmount / 100).toFixed(2)}{' '}
                        &euro;
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
                            this.props.toggleVisibility(true);
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
