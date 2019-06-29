import '../reset.scss';
import { action } from '@storybook/addon-actions';
import { addStub, resetStubs } from './stub';
import { storiesOf } from '@storybook/react';
import BasicBtn from '../components/buttons/BasicBtn';
import Content from '../components/sections/Content';
import DangerBtn from '../components/buttons/DangerBtn';
import Header from '../components/sections/Header';
import LoginForm from '../components/forms/LoginForm';
import LoginHeader from '../components/sections/LoginHeader';
import LoginPage from '../components/pages/LoginPage';
import MainPage from '../components/pages/MainPage';
import PurchaseNotification from '../components/notifications/PurchaseNotification';
import React from 'react';
import SuccessBtn from '../components/buttons/SuccessBtn';
import productService from '../services/productService';
import sinon from 'sinon';

storiesOf('Danger button', module)
    .add('With fill', () => (
        <DangerBtn fill hover onClick={action('clicked danger button with fill')}>
            Danger button
        </DangerBtn>
    ))
    .add('With fill, with loader', () => (
        <DangerBtn fill loader onClick={action('clicked danger button with fill, with loader')} />
    ))
    .add('Without fill', () => (
        <DangerBtn hover onClick={action('clicked danger button without fill')}>
            Danger button
        </DangerBtn>
    ));

storiesOf('Button.Success button', module)
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

storiesOf('Button.Basic button', module)
    .add('With fill', () => (
        <BasicBtn fill hover onClick={action('clicked basic button with fill')}>
            Basic button
        </BasicBtn>
    ))
    .add('With fill, with loader', () => (
        <BasicBtn fill loader onClick={action('clicked basic button with fill, with loader')} />
    ))
    .add('Without fill', () => (
        <BasicBtn hover onClick={action('clicked basic button without fill')}>
            Basic button
        </BasicBtn>
    ));

const depositProps = {
    setAmountText: action('Set amount text action'),
    resetAmount: action('Reset amount action'),
    resetDeposit: action('Reset deposit action'),
    toggleConfirmationVisibility: action('Toggle confirmation visibility action'),
    errorMessage: action('Error message action'),
    closeModal: action('Close modal action'),
    depositAmountText: '0.00',
    confirmationVisibility: false
};

storiesOf('Deposit.Deposit component', module)
    .add('Deposit view', () => <Deposit {...depositProps} />)
    .add('Cancel button', () => <CancelButton handleCancel={action('Cancel button clicked')} />)
    .add('Confirm button', () => <ConfirmButton handleSubmit={action('Confirm button clicked')} />);

const purchases = [
    {
        product: {
            barcode: '0001',
            sellPrice: 180,
            name: 'Coca-cola Zero'
        },
        count: 1
    }
];

storiesOf('Purchase notification.With shadow', module).add('Coca-Cola Zero, 1.85 eur', () => (
    <PurchaseNotification shadow purchases={purchases} />
));

storiesOf('Purchase notification.Without shadow', module).add('Coca-Cola Zero, 1.85 eur', () => (
    <PurchaseNotification purchases={purchases} />
));

storiesOf('Header', module).add('Initial', () => <Header />);
storiesOf('LoginHeader', module).add('Initial', () => <LoginHeader />);

storiesOf('Content', module).add('Initial', () => {
    resetStubs();
    // Stubs
    const getAllProductsStub = sinon.stub(productService, 'getAllProducts').returns([...mockedProducts]);
    const getAllCategoriesStub = sinon.stub(productService, 'getAllCategories').returns([...mockedProducts]);
    addStub(getAllCategoriesStub, getAllProductsStub);
    return <Content />;
});

storiesOf('LoginPage', module).add('Initial', () => <LoginPage />);

storiesOf('MainPage', module).add('Initial', () => <MainPage />);

/**
 * Authentication mock
 * @param {*} user
 */
const authenticate = (user) => {
    console.log(user);
};

storiesOf('LoginForm', module)
    .add('Without loader', () => <LoginForm authenticate={authenticate} />)
    .add('With loader', () => <LoginForm loader authenticate={authenticate} />)
    .add('Without loader, shadow', () => <LoginForm shadow authenticate={authenticate} />)
    .add('With loader, shadow', () => <LoginForm loader shadow authenticate={authenticate} />);
