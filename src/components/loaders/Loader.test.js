import { shallow } from 'enzyme';
import Loader from './Loader';
import React from 'react';
import renderer from 'react-test-renderer';

describe.only('<Loader />', () => {
    it('renders correctly', () => {
        const cmpnt = renderer.create(<Loader />).toJSON();
        expect(cmpnt).toMatchSnapshot();
    });
});
