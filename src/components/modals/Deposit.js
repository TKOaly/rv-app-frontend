import './styles/Deposit.scss';
import { Fade } from '../animations/Animations';
import { TransitionGroup } from 'react-transition-group';
import { closeModal } from '../../reducers/modalReducer';
import { connect } from 'react-redux';
import { errorMessage } from '../../reducers/notificationReducer';
import {
    resetAmount,
    resetDeposit,
    setAmountText,
    toggleConfirmationVisibility
} from '../../reducers/depositReducer';
import Confirmation from './Confirmation';
import React from 'react';
import moneyFormatter from '../../services/moneyFormatter';

// TODO: Add own styles
export const OkButton = ({ handleSubmit }) => (
    <button className="btn number success" onClick={handleSubmit}>
    OK (ENTER)
    </button>
);

// TODO: Add own styles
export const CancelButton = ({ handleCancel }) => (
    <button className="btn number cancel" onClick={handleCancel}>
    Cancel (ESC)
    </button>
);

export class Deposit extends React.Component {
  static depositAmountTextToCents = (text) => {
      if (text === '') {
          return 0;
      } else {
          return moneyFormatter.stringToCents(text);
      }
  };

  componentDidMount = () => {
      this.oldFocusedElement = document.activeElement;
      this.textField.focus();
  };

  componentWillUnmount = () => {
      this.props.resetDeposit();
      if (this.oldFocusedElement) {
          this.oldFocusedElement.focus();
      }
  };

  createIncrementHandler = (increment) => {
      return (event) => {
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
                  moneyFormatter.centsToString(cents + increment)
              );
          }
      };
  };

  handleSubmit = () => {
      const cents = Deposit.depositAmountTextToCents(
          this.props.depositAmountText
      );
      if (Number.isNaN(cents)) {
          this.props.errorMessage(
              'Invalid deposit amount in text field. Use format 10.00'
          );
      } else if (cents <= 0) {
          this.props.errorMessage('You cannot deposit 0 € or less.');
      } else {
          this.props.toggleConfirmationVisibility(true);
      }
  };

  handleCancel = () => {
      this.props.closeModal();
  };

  handleKeyDown = (event) => {
      if (event.key === 'Enter') {
          event.preventDefault();
          this.handleSubmit();
      } else if (event.key === 'Escape') {
          event.preventDefault();
          this.handleCancel();
      }
  };

  handleValueChange = (event) => {
      this.props.setAmountText(event.target.value);
  };

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
                          onKeyDown={this.handleKeyDown}
                          onChange={this.handleValueChange}
                          ref={this.depositRef}
                      />
                      <div className="euro-sign">€</div>
                  </div>
                  <button className="btn number erase" onClick={this.props.resetAmount}>
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
                  <CancelButton handleCancel={this.handleCancel} />
                  <button
                      className="btn number increment"
                      onClick={this.createIncrementHandler(5000)}
                  >
            + 50.00 €
                  </button>
                  <OkButton handleSubmit={this.handleSubmit} />
              </div>
              <TransitionGroup>
                  {this.props.confirmationVisibility && (
                      <Fade>
                          <Confirmation
                              depositAmount={Deposit.depositAmountTextToCents(
                                  this.props.depositAmountText
                              )}
                          />
                      </Fade>
                  )}
              </TransitionGroup>
          </div>
      );
  };
}

const mapStateToProps = (state) => {
    return {
        depositAmountText: state.deposit.depositAmountText,
        confirmationVisibility: state.deposit.confirmationVisibility
    };
};

const mapDispatchToProps = {
    setAmountText,
    resetAmount,
    resetDeposit,
    toggleConfirmationVisibility,
    errorMessage,
    closeModal
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Deposit);
