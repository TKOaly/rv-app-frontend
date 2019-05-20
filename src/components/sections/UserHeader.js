import './styles/Header.scss';
import { connect } from 'react-redux';
import { doLogout } from '../../reducers/authenticationReducer';
import { push } from 'connected-react-router';
import FontAwesome from 'react-fontawesome';
import HeaderBtn from '../buttons/HeaderBtn';
import Logo from '../../images/tkoaly2.svg';
import Margin from '../helpers/Margin';
import React from 'react';
import moneyFormatter from '../../services/moneyFormatter';

class Header extends React.Component {
    handleBackClick = () => {
        this.props.push('/');
    };

    render = () => {
        return (
            <header>
                <div className="header-title">
                    <img src={Logo} alt="logo" />
                    <h1>Ruokavälitys</h1>
                </div>
                <div className="header-right">
                    <Margin margin={5} inlineBlock>
                        <HeaderBtn onClick={this.handleBackClick} hover>
                            <FontAwesome name="arrow-left" /> Back to product page
                        </HeaderBtn>
                    </Margin>
                    <Margin margin={5} inlineBlock>
                        <HeaderBtn fill>
                            <FontAwesome name="user-circle" />{' '}
                            <span>
                                <b>{this.props.username}</b> {moneyFormatter.centsToString(this.props.moneyBalance)} €
                            </span>
                        </HeaderBtn>
                    </Margin>
                    <Margin margin={5} inlineBlock>
                        <HeaderBtn onClick={this.props.doLogout} hover>
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
    doLogout,
    push
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Header);
