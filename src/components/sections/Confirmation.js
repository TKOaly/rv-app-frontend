import './styles/Confirmation.css';
import React from 'react';
import moneyFormatter from '../../services/moneyFormatter';

class Confirmation extends React.Component {
    handleConfirm = (event) => {
        this.props.increaseBalance(this.props.token, this.props.depositAmount);
        this.props.resetAmount();
        this.props.toggleConfirmationVisibility(false);
        this.props.closeModal();
    };

    handleCancel = (event) => {
        this.props.toggleConfirmationVisibility(false);
    };

    render = () => {
        return (
            <div className="confirm-overlay">
                <div className="confirm">
                    Confirm <b>{moneyFormatter.centsToString(this.props.depositAmount)} €</b> deposit
                    <br />
                    <br />
                    <button className="btn number cancel cancelBtn" onClick={this.handleCancel}>
                        Cancel
                    </button>
                    <button className="btn number success confirmBtn" onClick={this.handleConfirm}>
                        OK
                    </button>
                </div>
            </div>
        );
    };
}

export default Confirmation;
