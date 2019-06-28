import './styles/Header.scss';
import { connect } from 'react-redux';
import { doLogout } from '../../reducers/authenticationReducer';
import { push } from 'connected-react-router';
import { showModal } from '../../reducers/modalReducer';
import Deposit from '../modals/Deposit';
import FontAwesome from 'react-fontawesome';
import HeaderBtn from '../buttons/HeaderBtn';
import Logo from '../../images/tkoaly2.svg';
import Margin from '../helpers/Margin';
import React from 'react';
import moneyFormatter from '../../services/moneyFormatter';

export class Header extends React.Component {
    handleDepositClick = (event) => {
        event.preventDefault();
        this.props.showModal(Deposit);
    };

    handleUserClick = () => {
        this.props.push('/user');
    };

    render = () => {
        const { username, moneyBalance, doLogout } = this.props;
        return (
            <header>
                <div className="header-title">
                    <img src={Logo} alt="logo" />
                    <h1>Ruokavälitys</h1>
                </div>
                <div className="header-right">
                    <Margin margin={5} inlineBlock>
                        <HeaderBtn onClick={this.handleDepositClick} hover>
                            Deposit (D)
                        </HeaderBtn>
                    </Margin>
                    <Margin margin={5} inlineBlock>
                        <HeaderBtn onClick={this.handleUserClick} fill hover>
                            <FontAwesome name="user-circle" />{' '}
                            <span>
                                <b>{username || 'N/A'}</b> {moneyFormatter.centsToString(moneyBalance || 0)} €
                            </span>
                        </HeaderBtn>
                    </Margin>
                    <Margin margin={5} inlineBlock>
                        <HeaderBtn onClick={doLogout} hover>
                            <FontAwesome name="sign-out" /> Log out (ENTER)
                        </HeaderBtn>
                    </Margin>
                </div>
            </header>
        );
    };
}

const mapStateToProps = (state) => {
    return {
        username: state.user.username,
        moneyBalance: state.user.moneyBalance
    };
};

const mapDispatchToProps = {
    showModal,
    doLogout,
    push
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Header);
