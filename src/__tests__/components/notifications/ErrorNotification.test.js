import ErrorNotification from '../../../components/notifications/ErrorNotification';
import React from 'react';
import renderer from 'react-test-renderer';

describe.only('<ErrorNotification />', () => {
    it('should match snapshot', () => {
        const cmpnt = renderer.create(<ErrorNotification message="Test notification" />).toJSON();
        expect(cmpnt).toMatchSnapshot();
    });
});
