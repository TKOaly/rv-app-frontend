import './styles/Confirmation.scss';
import React from 'react';
import moneyFormatter from '../../services/moneyFormatter';

class Confirmation extends React.Component {
    componentDidMount = () => {
        this.oldFocusedElement = document.activeElement;
        this.dialog.focus();
    };

    handleConfirm = (event) => {
        if(event !== undefined) {
            event.preventDefault();
        }
        this.props.increaseBalance(this.props.token, this.props.depositAmount);
        this.props.resetAmount();
        this.props.toggleConfirmationVisibility(false);
        this.props.closeModal();
    };

    handleCancel = (event) => {
        if(event !== undefined) {
            event.preventDefault();
        }
        this.props.toggleConfirmationVisibility(false);
        if (this.oldFocusedElement) {
            this.oldFocusedElement.focus();
        }
    };

    handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            this.handleConfirm();
        } else if (event.key === 'Escape') {
            event.preventDefault();
            this.handleCancel();
        }
    };

    dialogRef = (dialog) => {
        this.dialog = dialog;
    };

    render = () => {
        return (
            <div className="confirm-overlay">
                <div className="confirm" tabIndex="0" ref={this.dialogRef} onKeyDown={this.handleKeyDown}>
                    Confirm <b>{moneyFormatter.centsToString(this.props.depositAmount)} €</b> deposit
                    <br />
                    <br />
                    <button className="btn number cancel cancelBtn" onClick={this.handleCancel}>
                        Cancel (ESC)
                    </button>
                    <button className="btn number success confirmBtn" onClick={this.handleConfirm}>
                        OK (ENTER)
                    </button>
                </div>
            </div>
        );
    };
}

export default Confirmation;
