import { NotificationDrawer } from '../components/helpers/NotificationDrawer';
import React from 'react';
import renderer from 'react-test-renderer';

// TODO: Move to mock file
const mockNotifications = [
    {
        messageType: 'SUCCESS',
        id: 1,
        message: 'Hello World'
    }
];

describe.only('<NotificationDrawer />', () => {
    it('renders correctly', () => {
        const cmpnt = renderer.create(<NotificationDrawer notifications={mockNotifications}/>).toJSON();
        expect(cmpnt).toMatchSnapshot();
    });
});
