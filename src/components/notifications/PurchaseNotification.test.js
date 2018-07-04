import { shallow } from 'enzyme';
import PurchaseNotification from './PurchaseNotification';
import React from 'react';
import renderer from 'react-test-renderer';

describe.only('<PurchaseNotification />', () => {
    it('renders correctly', () => {
        const cmpnt = renderer.create(<PurchaseNotification />).toJSON();
        expect(cmpnt).toMatchSnapshot();
    });
});
