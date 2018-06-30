import React from 'react';
import HeaderBtn from '../buttons/HeaderBtn';
import Margin from '../helpers/Margin';
import Logo from '../../images/tkoaly2.svg';
import { connect } from 'react-redux';
import { showModal, closeModal } from '../../reducers/modalReducer';
import Deposit from '../sections/Deposit';
import './styles/Header.css';
import FontAwesome from 'react-fontawesome';
import moneyFormatter from './../../services/moneyFormatter';

export class Header extends React.Component {
    handleDepositClick = (event) => {
        event.preventDefault();
        this.props.showModal(Deposit, {
            closeModal: this.props.closeModal
        });
    };

    render = () => {
        return (
            <header>
                <div className="header-title">
                    <img src={Logo} alt="logo" />
                    <h1>Ruokavälitys</h1>
                </div>
                {this.props.loggedIn && (
                    <div className="header-right">
                        <Margin margin={5} inlineBlock>
                            <HeaderBtn onClick={this.handleDepositClick} fill>
                                Deposit
                            </HeaderBtn>
                        </Margin>
                        <Margin margin={5} inlineBlock>
                            <HeaderBtn fill>
                                <FontAwesome name="user-circle" />{' '}
                                <span>
                                    <b>{this.props.user.full_name}</b>{' '}
                                    {moneyFormatter.centsToString(this.props.user.account_balance)} €
                                </span>
                            </HeaderBtn>
                        </Margin>
                        <Margin margin={5} inlineBlock>
                            <HeaderBtn onClick={this.props.logout} hover>
                                <FontAwesome name="sign-out" /> Log out (ENTER)
                            </HeaderBtn>
                        </Margin>
                    </div>
                )}
            </header>
        );
    };
}

const mapDispatchToProps = {
    showModal,
    closeModal
};

const mapStateToProps = (state) => ({
    loggedIn: state.authentication.loggedIn
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
