import './styles/Header.scss';
import { debounce } from 'lodash';
import { doLogout } from '../../reducers/authenticationReducer';
import { push } from 'connected-react-router';
import { showModal } from '../../reducers/modalReducer';
import { useDispatch, useSelector } from 'react-redux';
import Deposit from '../modals/Deposit';
import FontAwesome from 'react-fontawesome';
import HeaderBtn from '../buttons/HeaderBtn';
import Logo from '../../images/tkoaly2.svg';
import Margin from '../helpers/Margin';
import React from 'react';
import moneyFormatter from '../../services/moneyFormatter';

const Header = (props) => {

    const dispatch = useDispatch();
    const username = useSelector((state) => state.user.username);
    const moneyBalance = useSelector((state) => state.user.moneyBalance);

    const handleDepositClick = debounce((event) => {
        event.persist();
        dispatch(showModal(Deposit));
    }, 75, {leading:false, trailing:true});

    const handleUserClick = debounce(() => {
        dispatch(push('/user'));
    }, 50, {leading:false, trailing:true});

    const logout = debounce(() => {
        dispatch(doLogout());
    }, 50, {leading:false, trailing:true});

    return (
        <header>
            <div className="header-title">
                <img src={Logo} alt="logo" />
                <h1>Ruokavälitys</h1>
            </div>
            <div className="header-right">
                <Margin margin={5} inlineBlock>
                    <HeaderBtn onClick={handleDepositClick} hover className="depositBtn">
                            Deposit (D)
                    </HeaderBtn>
                </Margin>
                <Margin margin={5} inlineBlock>
                    <HeaderBtn onClick={handleUserClick} fill hover>
                        <FontAwesome name="user-circle" />{' '}
                        <span>
                            <b className="user-username">{username || 'N/A'}</b>{' '}
                            <span className="user-money">
                                <span className="user-money-value">
                                    {moneyFormatter.centsToString(moneyBalance || 0)}
                                </span>{' '}
                                    €
                            </span>
                        </span>
                    </HeaderBtn>
                </Margin>
                <Margin margin={5} inlineBlock>
                    <HeaderBtn onClick={logout} hover className="logoutBtn">
                        <FontAwesome name="sign-out" /> Log out (ENTER)
                    </HeaderBtn>
                </Margin>
            </div>
        </header>
    );
};

export default Header;
