import PurchaseNotification from '../../../components/notifications/PurchaseNotification';
import React from 'react';
import renderer from 'react-test-renderer';

describe.only('<PurchaseNotification />', () => {
    it('should match snapshot', () => {
        const cmpnt = renderer.create(<PurchaseNotification />).toJSON();
        expect(cmpnt).toMatchSnapshot();
    });
});
