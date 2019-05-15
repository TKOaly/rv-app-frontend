import './styles/LoginHeader.scss';
import Logo from '../../images/tkoaly2.svg';
import React from 'react';

const LoginHeader = () => (
    <header>
        <div className="header-title">
            <img src={Logo} alt="logo" />
            <h1>Ruokavälitys</h1>
        </div>
    </header>
);

export default LoginHeader;
