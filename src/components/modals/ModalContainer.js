import './styles/ModalContainer.css';
import { CSSTransition } from 'react-transition-group';
import { closeModal } from '../../reducers/modalReducer';
import { connect } from 'react-redux';
import React from 'react';

export class ModalContainer extends React.Component {
    handleClose = (e) => {
        this.props.closeModal();
    };

    handleModalClick = (e) => e.stopPropagation();

    render = () => {
        const ModalContent = this.props.contentComponent;
        if (!ModalContent) {
            return null;
        }

        return (
            <CSSTransition in={this.props.modalVisible} timeout={200} classNames="overlay" mountOnEnter unmountOnExit>
                {(state) => {
                    return (
                        <div className="modal-overlay" onClick={this.handleClose}>
                            <div className="modal-container" onClick={this.handleModalClick}>
                                <ModalContent {...this.props.modalProps} />
                            </div>
                        </div>
                    );
                }}
            </CSSTransition>
        );
    };
}

const mapDispatchToProps = {
    closeModal
};

const mapStateToProps = (state) => ({
    contentComponent: state.modal.modalContent,
    modalProps: state.modal.props,
    modalVisible: state.modal.modalVisible
});

export default connect(mapStateToProps, mapDispatchToProps)(ModalContainer);
