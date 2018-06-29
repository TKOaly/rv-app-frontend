import React from 'react';
import '../reset.css';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import DangerBtn from './../components/buttons/DangerBtn';
import SuccessBtn from './../components/buttons/SuccessBtn';
import PurchaseNotification from '../components/notifications/PurchaseNotification';
import Loader from '../components/loaders/Loader';
import { Header } from './../components/sections/Header';
import Content from './../components/sections/Content';
import LoginPage from './../components/pages/LoginPage';
import MainPage from './../components/pages/MainPage';
import LoginForm from './../components/forms/LoginForm';
import TopBalanceUsers from './../components/sections/TopBalanceUsers';

import '../index.css';

storiesOf('Danger button', module)
    .add('With fill', () => (
        <DangerBtn fill hover onClick={action('clicked danger button with fill')}>
            Danger button
        </DangerBtn>
    ))
    .add('With fill, with loader', () => (
        <DangerBtn fill loader onClick={action('clicked danber button with fill, with loader')} />
    ))
    .add('Without fill', () => (
        <DangerBtn hover onClick={action('clicked danger button without fill')}>
            Danger button
        </DangerBtn>
    ));

storiesOf('Success button', module)
    .add('With fill', () => (
        <SuccessBtn fill hover onClick={action('clicked success button with fill')}>
            Success button
        </SuccessBtn>
    ))
    .add('With fill, with loader', () => (
        <SuccessBtn fill loader onClick={action('clicked success button with fill, with loader')} />
    ))
    .add('Without fill', () => (
        <SuccessBtn hover onClick={action('clicked success button without fill')}>
            Success button
        </SuccessBtn>
    ));

const products = [
    {
        barcode: '0001',
        quantity: 1,
        price: 180,
        product_name: 'Coca-cola Zero'
    }
];

storiesOf('Purchase notification (with shadow)', module).add('Coca-Cola Zero, 1.85 eur', () => (
    <PurchaseNotification shadow products={products} />
));

storiesOf('Purchase notification (without shadow)', module).add('Coca-Cola Zero, 1.85 eur', () => (
    <PurchaseNotification products={products} />
));

storiesOf('Header', module).add('Initial', () => <Header />);

storiesOf('Content', module).add('Initial', () => <Content />);

storiesOf('LoginPage', module).add('Initial', () => <LoginPage />);

storiesOf('MainPage', module).add('Initial', () => <MainPage />);

storiesOf('TopBalanceUsers', module)
    .add('Initial', () => <TopBalanceUsers />)
    .add('With data', () => {
        const users = [
            {
                name: 'Testaaja 1',
                balance: 150
            },
            {
                name: 'Testaaja 2',
                balance: 250
            },
            {
                name: 'Testaaja 3',
                balance: 0
            },
            {
                name: 'Testaaja 4',
                balance: 10
            },
            {
                name: 'Testaaja 5',
                balance: 550
            }
        ];
        return <TopBalanceUsers users={users} />;
    });

/**
 * Authentication mock
 * @param {*} user
 */
const authenticate = (user) => {};

storiesOf('LoginForm', module)
    .add('Without loader', () => <LoginForm authenticate={authenticate} />)
    .add('With loader', () => <LoginForm loader authenticate={authenticate} />)
    .add('Without loader, shadow', () => <LoginForm shadow authenticate={authenticate} />)
    .add('With loader, shadow', () => <LoginForm loader shadow authenticate={authenticate} />);
