import { shallow } from 'enzyme';
import Padding from './Padding';
import React from 'react';
import renderer from 'react-test-renderer';

describe.only('<Padding />', () => {
    it('renders correctly', () => {
        const cmpnt = renderer.create(<Padding />).toJSON();
        expect(cmpnt).toMatchSnapshot();
    });
});
