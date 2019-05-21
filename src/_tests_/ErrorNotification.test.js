import { shallow } from 'enzyme';
import ErrorNotification from '../components/notifications/ErrorNotification';
import React from 'react';
import renderer from 'react-test-renderer';

describe.only('<ErrorNotification />', () => {
    it('renders correctly', () => {
        const cmpnt = renderer.create(<ErrorNotification message="Test notification" />).toJSON();
        expect(cmpnt).toMatchSnapshot();
    });
});
