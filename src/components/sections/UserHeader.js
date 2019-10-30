import './styles/Header.scss';
import { doLogout } from '../../reducers/authenticationReducer';
import { push } from 'connected-react-router';
import { useDispatch, useSelector } from 'react-redux';
import FontAwesome from 'react-fontawesome';
import HeaderBtn from '../buttons/HeaderBtn';
import Logo from '../../images/tkoaly2.svg';
import Margin from '../helpers/Margin';
import React from 'react';
import moneyFormatter from '../../services/moneyFormatter';

const Header = () => {

    const dispatch = useDispatch();
    const username = useSelector((state) => state.user.username);
    const moneyBalance = useSelector((state) => state.user.moneyBalance);

    const handleBackClick = () => dispatch(push('/'));
    const logout = () => dispatch(doLogout());

    return (
        <header>
            <div className="header-title">
                <img src={Logo} alt="logo" />
                <h1>Ruokavälitys</h1>
            </div>
            <div className="header-right">
                <Margin margin={5} inlineBlock>
                    <HeaderBtn onClick={handleBackClick} hover>
                        <FontAwesome name="arrow-left" /> Back to product page
                    </HeaderBtn>
                </Margin>
                <Margin margin={5} inlineBlock>
                    <HeaderBtn fill>
                        <FontAwesome name="user-circle" />{' '}
                        <span>
                            <b>{username}</b> {moneyFormatter.centsToString(moneyBalance)} €
                        </span>
                    </HeaderBtn>
                </Margin>
                <Margin margin={5} inlineBlock>
                    <HeaderBtn onClick={logout} hover>
                        <FontAwesome name="sign-out" /> Log out (ENTER)
                    </HeaderBtn>
                </Margin>
            </div>
        </header>
    );
};

export default Header;
