import '../index.scss';
import '../reset.scss';
import { Header } from '../components/sections/Header';
import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import Content from '../components/sections/Content';
import DangerBtn from '../components/buttons/DangerBtn';
import LoginForm from '../components/forms/LoginForm';
import LoginPage from '../components/pages/LoginPage';
import MainPage from '../components/pages/MainPage';
import PurchaseNotification from '../components/notifications/PurchaseNotification';
import React from 'react';
import SuccessBtn from '../components/buttons/SuccessBtn';

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

/**
 * Authentication mock
 * @param {*} user
 */
// eslint-disable-next-line no-unused-vars
const authenticate = (user) => {
    // console.log(user);
};

storiesOf('LoginForm', module)
    .add('Without loader', () => <LoginForm authenticate={authenticate} />)
    .add('With loader', () => <LoginForm loader authenticate={authenticate} />)
    .add('Without loader, shadow', () => <LoginForm shadow authenticate={authenticate} />)
    .add('With loader, shadow', () => <LoginForm loader shadow authenticate={authenticate} />);