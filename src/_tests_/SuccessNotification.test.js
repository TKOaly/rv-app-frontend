import { shallow } from 'enzyme';
import React from 'react';
import SuccessNotification from '../components/notifications/SuccessNotification';
import renderer from 'react-test-renderer';

describe.only('<SuccessNotification />', () => {
    it('renders correctly', () => {
        const cmpnt = renderer.create(<SuccessNotification message="Test notification" />).toJSON();
        expect(cmpnt).toMatchSnapshot();
    });
});
