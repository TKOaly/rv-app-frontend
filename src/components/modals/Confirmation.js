import './styles/Confirmation.scss';
import { closeModal } from '../../reducers/modalReducer';
import { connect } from 'react-redux';
import { increaseBalance } from '../../reducers/userReducer';
import { resetAmount, toggleConfirmationVisibility } from '../../reducers/depositReducer';
import React from 'react';
import moneyFormatter from '../../services/moneyFormatter';

export class Confirmation extends React.Component {
    componentDidMount = () => {
        this.oldFocusedElement = document.activeElement;
        this.dialog.focus();
    };

    handleConfirm = (event) => {
        event.preventDefault();
        this.props.increaseBalance(this.props.token, this.props.depositAmount);
        this.props.closeModal();
    };

    handleCancel = (event) => {
        event.preventDefault();
        this.props.toggleConfirmationVisibility(false);
        if (this.oldFocusedElement) {
            this.oldFocusedElement.focus();
        }
    };

    handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            this.handleConfirm(event);
        } else if (event.key === 'Escape') {
            event.preventDefault();
            this.handleCancel(event);
        }
    };

    dialogRef = (dialog) => {
        this.dialog = dialog;
    };

    render = () => {
        const { depositAmount } = this.props;
        return (
            <div className="confirm-overlay">
                <div className="confirm" tabIndex="0" ref={this.dialogRef} onKeyDown={this.handleKeyDown}>
                    <span className="confirm-title-text">Confirm <b>{moneyFormatter.centsToString(depositAmount)} €</b> deposit</span>
                    <br />
                    <br />
                    <button className="btn number cancel cancelBtn confirmation-cancel-btn" onClick={this.handleCancel}>
                        Cancel (ESC)
                    </button>
                    <button className="btn number success confirmBtn confirmation-ok-btn" onClick={this.handleConfirm}>
                        OK (ENTER)
                    </button>
                </div>
            </div>
        );
    };
}

const mapStateToProps = (state) => {
    return {
        token: state.authentication.access_token
    };
};

const mapDispatchToProps = {
    increaseBalance,
    resetAmount,
    closeModal,
    toggleConfirmationVisibility
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Confirmation);
