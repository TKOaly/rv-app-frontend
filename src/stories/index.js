import '../reset.scss';
import '../storybook.scss';
import { CancelButton, ConfirmButton, Deposit } from '../components/modals/Deposit';
import { Header } from '../components/sections/Header';
import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import BasicBtn from '../components/buttons/BasicBtn';
import DangerBtn from '../components/buttons/DangerBtn';
import PurchaseNotification from '../components/notifications/PurchaseNotification';
import React from 'react';
import SuccessBtn from '../components/buttons/SuccessBtn';

storiesOf('Button.Danger button', module)
    .add('With fill', () => (
        <DangerBtn fill hover onClick={action('clicked danger button with fill')}>
      Danger button
        </DangerBtn>
    ))
    .add('With fill, with loader', () => (
        <DangerBtn
            fill
            loader
            onClick={action('clicked danger button with fill, with loader')}
        />
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
        <SuccessBtn
            fill
            loader
            onClick={action('clicked success button with fill, with loader')}
        />
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
        <BasicBtn
            fill
            loader
            onClick={action('clicked basic button with fill, with loader')}
        />
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
    .add('Cancel button', () => (
        <CancelButton handleCancel={action('Cancel button clicked')} />
    ))
    .add('Confirm button', () => (
        <ConfirmButton handleSubmit={action('Confirm button clicked')} />
    ));

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

storiesOf('Purchase notification.With shadow', module).add(
    'Coca-Cola Zero, 1.85 eur',
    () => <PurchaseNotification shadow purchases={purchases} />
);

storiesOf('Purchase notification.Without shadow', module).add(
    'Coca-Cola Zero, 1.85 eur',
    () => <PurchaseNotification purchases={purchases} />
);

storiesOf('Header', module).add('Initial', () => <Header />);
