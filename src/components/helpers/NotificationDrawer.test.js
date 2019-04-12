import NotificationDrawer from './NotificationDrawer';
import React from 'react';
import renderer from 'react-test-renderer';

describe.only('<NotificationDrawer />', () => {
    it('renders correctly', () => {
        const cmpnt = renderer.create(<NotificationDrawer />).toJSON();
        expect(cmpnt).toMatchSnapshot();
    });
});
